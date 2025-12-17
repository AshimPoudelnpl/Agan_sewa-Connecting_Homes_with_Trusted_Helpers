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

    res.status(201).json({ message: "Manager added successfully" });
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
    console.log(error)
    next(error);
  }
};
