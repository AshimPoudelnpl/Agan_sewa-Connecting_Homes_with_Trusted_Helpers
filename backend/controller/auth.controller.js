import express from "express";
import dotenv from "dotenv";
import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();

//login
//Admin
//addManager=auth table(branch_id)
//addStaff(isLigin,is Admin)=staff table{branch_id}

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 1. Find user by email only
    const [result] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const user = result[0];

    // 2. Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRY }
    );

    // 4. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production (HTTPS)
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user.id,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // set true in production (HTTPS)
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    next(error);
  }
};

export const addmanagerByAdmin = async (req, res, next) => {
  try {
    const {
      manager_name,
      manager_email,
      manager_phone,
      password,
      role,
      branch_id,
    } = req.body;
    console.log(req.body);

    if (!manager_name || !manager_email || !manager_phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log(req.file);
    const [result] = await db.query(
      "SELECT * FROM users WHERE role = ? AND email = ?",
      ["manager", manager_email]
    );
    if (result.length > 0) {
      return res.status(401).json({ message: "manager already exists" });
    }
    const imagePath = req.file ? `uploads/manager/${req.file.filename}` : null;

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      `INSERT INTO users 
       (name, email, phone, password, role,branch_id,img)
       VALUES (?, ?, ?, ?, ?,?,?)`,
      [
        manager_name,
        manager_email,
        manager_phone,
        hashedPassword,
        role || "manager",
        branch_id,
        imagePath,
      ]
    );

    res.status(201).json({
      message: "Manager added successfully",
      user: manager_name,
      password: hashedPassword,
    });
  } catch (error) {
    next(error);
  }
};
export const getmanagerByAdmin = async (req, res, next) => {
  try {
    const [row] = await db.query("select * from users ");
    res
      .status(201)
      .json({ message: "manager retrived sucessfully", data: row });
  } catch (error) {
    next(error);
  }
};
export const deletemangerByAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const [inputtedId] = await db.query("select id from users where id =?", [
      id,
    ]);

    if (inputtedId == 0) {
      res.status(404).json({ message: "manaager doesnot exists" });
    }
    const [result] = await db.query(
      "DELETE FROM users WHERE id = ? and role=?",
      [id, ["manager"]]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "manager not found" });
    }
    res
      .status(200)
      .json({ message: `manager deleted Sucessfully with id  ${id}` });
  } catch (error) {
    next(error);
  }
};
export const editmanaagerByAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { manager_name, manager_email, password } = req.body;

    const [existing] = await db.execute(
      "SELECT * FROM users WHERE id = ? AND role = ?",
      [id, "manager"]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        message: `Manager not found with id ${id}`,
      });
    }

    const olddata = existing[0];
    const updatedName = manager_name || olddata.name;
    const updatedEmail = manager_email || olddata.email;
    const updatedPassword = password
      ? await bcrypt.hash(password, 10)
      : olddata.password;

    if (manager_email && manager_email !== olddata.email) {
      const [emailCheck] = await db.execute(
        "SELECT id FROM users WHERE email = ? AND id != ?",
        [manager_email, id]
      );

      if (emailCheck.length > 0) {
        return res.status(409).json({
          message: "Email already exists",
        });
      }
    }

    await db.execute(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [updatedName, updatedEmail, updatedPassword, id]
    );

    return res.status(200).json({
      message: "Manager updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const addStaffByManager = async (req, res, next) => {
  try {
    const {
      staff_name,
      staff_email,
      staff_phone,
      staff_address,
      staff_password,
      role,
      branch_id,
    } = req.body;
    console.log(req.file);
    const [existing] = await db.query(
      "SELECT * FROM staff WHERE name = ? AND email = ?",
      [staff_name, staff_email]
    );
    if (existing.length > 0) {
      return res.status(401).json({ message: "staff already exists" });
    }
    const imagePath = req.file ? `uploads/staff/${req.file.filename}` : null;

    const hashedPassword = await bcrypt.hash(staff_password, 10);
    const [result] = await db.query(
      "insert into staff(name,email,phone,address,password,role,branch_id,staff_image) values(?,?,?,?,?,?,?,?) ",
      [
        staff_name,
        staff_email,
        staff_phone,
        staff_address,
        hashedPassword,
        role || "staff",
        branch_id,
        imagePath,
      ]
    );
    res
      .status(201)
      .json({ message: "Staff created successfully", data: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
