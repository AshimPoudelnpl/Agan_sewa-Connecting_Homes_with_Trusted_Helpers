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
    const [result] = await db.query(
      `SELECT 
    u.id,
    u.name,
    u.email,
    u.phone,
    u.password,
    u.role,
    b.branch_id,
    b.branch_name
FROM users u
LEFT JOIN branch b
    ON u.branch_id = b.branch_id where u.email=?`,
      [email]
    );

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
      {
        id: user.id,
        email: user.email,
        role: user.role,
        branch_id: user.branch_id,
      },
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
        email: user.email,
        role: user.role,
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
    const { manager_name, manager_email, manager_phone, password, branch_id } =
      req.body;

    if (!manager_name || !manager_email || !manager_phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (branch_id) {
      const [branchExists] = await db.query(
        "SELECT branch_id FROM branch WHERE branch_id = ?",
        [branch_id]
      );
      if (branchExists.length === 0) {
        return res.status(404).json({ message: "Branch does not exist" });
      }
    }

    const [result] = await db.query(
      "SELECT * FROM users WHERE role = ? AND email = ?",
      ["manager", manager_email]
    );
    console.log(result);
    if (result.length > 0) {
      return res.status(401).json({ message: "manager already exists" });
    }
    const imagePath = req.file ? `uploads/manager/${req.file.filename}` : null;

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      `INSERT INTO users 
       (name, email, phone, password,branch_id,img)
       VALUES (?, ?, ?,  ?,?,?)`,
      [
        manager_name,
        manager_email,
        manager_phone,
        hashedPassword,

        branch_id,
        imagePath,
      ]
    );

    res.status(201).json({
      message: "Manager added successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getmanagerByAdmin = async (req, res, next) => {
  try {
    const [rows] = await db.query(`
    SELECT 
      u.id,
      u.name AS manager_name,
      u.email AS manager_email,
      u.phone AS manager_phone,
      u.role,
      u.branch_id,
      u.img,

      b.branch_name,
      d.district_id,
      d.district_name,
      p.province_id,
      p.province_name

    FROM users u
    LEFT JOIN branch b 
      ON u.branch_id = b.branch_id
    LEFT JOIN district d 
      ON b.district_id = d.district_id
    LEFT JOIN province p 
      ON d.province_id = p.province_id

    WHERE u.role = 'manager';
  `);

    res.status(200).json({
      message: "Managers retrieved successfully",
      data: rows,
    });
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
