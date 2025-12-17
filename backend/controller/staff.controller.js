import db from "../config/db.js";

export const addStaff = async (req, res, next) => {
  try {
    console.log(req.file);
    const { branch_id, name, email, phone, address, password, role } = req.body;

    if (!branch_id || !name || !phone || !req.file) {
      return res.status(400).json({ message: "Required fields missing" });
    }
    const [existingUser] = await db.query(
      "SELECT staff_id FROM staff WHERE email = ?",
      [email]
    );
    const imagePath = `uploads/staff/${req.file.filename}`;

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const [result] = await db.query(
      `INSERT INTO staff    
      (branch_id, name, email, phone, address, password, role,staff_image)
      VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
      [
        branch_id,
        name,
        email,
        phone,
        address,
        password,
        role || "staff",
        imagePath,
      ]
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

    const [result] = await db.query("DELETE FROM staff WHERE id = ?", [id]);

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
    const { name, email, address, role } = req.body;

    const [result] = await db.query(
      `UPDATE staff SET 
        name = ?,
        email = ?,
    
        address = ?,
        role = ?
       WHERE id = ?`,
      [name, email, address, role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};
