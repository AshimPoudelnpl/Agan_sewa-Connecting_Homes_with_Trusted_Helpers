import db from "../config/db.js";
import bcrypt from "bcryptjs";

//password addd
export const addStaff = async (req, res, next) => {
  try {
    const { branch_id, name, email, phone, address, password, role } = req.body;
    console.log(req.body);
    console.log(req.file);

    if (!branch_id || !name || !phone || !req.file) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const [branchExists] = await db.query(
      "SELECT branch_id FROM branch WHERE branch_id = ?",
      [branch_id]
    );
    if (branchExists.length === 0) {
      return res.status(404).json({ message: "Branch does not exist" });
    }

    const [existingUser] = await db.query(
      "SELECT staff_id FROM staff WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const imagePath = `uploads/staff/${req.file.filename}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO staff    
      (branch_id, name, email, phone, address, password, role,staff_image)
      VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
      [branch_id, name, email, phone, address, hashedPassword, role, imagePath]
    );

    res.status(201).json({
      message: "User added successfully",
      staff_id: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

export const getStaff = async (req, res, next) => {
  try {
    const [users] = await db.query(`
      SELECT 
       s.staff_id,
        s.name,
        s.email,
        s.phone,
        s.role,
       s.staff_image,
        sv.branch_id, 
        sv.branch_name
      FROM staff s
      LEFT JOIN branch sv
       ON s.branch_id = sv.branch_id
    `);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
export const deleteStaff = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM staff WHERE staff_id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const editStaff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, address, role, branch_id } = req.body;

    const [existing] = await db.query(
      "SELECT * FROM staff WHERE staff_id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const oldStaff = existing[0];
    const updatedName = name || oldStaff.name;
    const updatedEmail = email || oldStaff.email;
    const updatedAddress = address || oldStaff.address;
    const updatedRole = role || oldStaff.role;
    const updatedBranchId = branch_id || oldStaff.branch_id;

    if (email && email !== oldStaff.email) {
      const [emailCheck] = await db.query(
        "SELECT staff_id FROM staff WHERE email = ? AND staff_id != ?",
        [email, id]
      );
      if (emailCheck.length > 0) {
        return res.status(409).json({ message: "Email already exists" });
      }
    }

    const [result] = await db.query(
      `UPDATE staff SET 
        name = ?,
        email = ?,
        address = ?,
        role = ?,
        branch_id = ?
       WHERE staff_id = ?`,
      [
        updatedName,
        updatedEmail,
        updatedAddress,
        updatedRole,
        updatedBranchId,
        id,
      ]
    );

    res.status(200).json({ message: "Staff updated successfully" });
  } catch (error) {
    next(error);
  }
};
