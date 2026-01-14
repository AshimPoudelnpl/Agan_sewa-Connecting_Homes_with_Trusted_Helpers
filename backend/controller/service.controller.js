import db from "../config/db.js";
import { removeImage } from "./../utils/removeImg.js";
export const addServices = async (req, res, next) => {
  try {
    if (req.user.role === "manager") {
      req.body.branch_id = req.user.branch_id;
    }
    const { name, description, branch_id } = req.body;
    console.log(req.body);

    if (!name || !description) {
      if (req.file) {
        removeImage(req.file.path);
      }
      return res.status(400).json({ message: "Name, Description required" });
    }

    if (branch_id) {
      const [existingBranchId] = await db.query(
        "select branch_id from branch where branch_id=?",
        [branch_id]
      );
      if (existingBranchId.length === 0) {
        if (req.file) {
          removeImage(req.file.path);
        }
        return res.status(404).json({ message: "Branch does not exist" });
      }
    }

    const imagePath = req.file ? `uploads/service/${req.file.filename}` : null;

    const [services] = await db.query(
      "insert into services (service_name,description,service_image,branch_id,status) values (?,?,?,?,?)",
      [name, description, imagePath, branch_id, "pending"]
    );
    res.status(200).json({ message: "Service Added Successfully" });
  } catch (error) {
    if (req.file) {
      removeImage(req.file.path);
    }
    next(error);
  }
};
//get Services
export const getServices = async (req, res, next) => {
  console.log(req.user);
  const { role, branch_id } = req.user;
  try {
    let query = `SELECT 
        s.service_id,
        s.service_name,
        s.description,
        s.service_image,
        s.status,
        s.branch_id,
        b.branch_name
      FROM services s
      LEFT JOIN branch b ON s.branch_id = b.branch_id`;

    const queryParams = [];
    if (role === "manager") {
      query += ` where s.branch_id =?`;
      queryParams.push(branch_id);
    }

    const [result] = await db.execute(query, queryParams);

    return res.status(200).json({
      message: "all services are retrieved",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
//public Services
export const getAllServices = async (req, res, next) => {
  try {
    const { branch_id } = req.params;
    let query = `SELECT s.*
                 FROM services s 
                 LEFT JOIN branch b ON s.branch_id = b.branch_id
                 where s.branch_id=? 
                 `;

    const [results] = await db.query(query, [branch_id]);
    res.status(200).json({
      message: "Services fetched successfully",
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
//delete service controller
export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      "DELETE FROM services WHERE service_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
};
//update service controller
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, branch_id } = req.body;

    const [existing] = await db.query(
      "SELECT * FROM service WHERE service_id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    const oldService = existing[0];
    const updatedName = name || oldService.service_name;
    const updatedDescription = description || oldService.description;
    const updatedBranchId = branch_id || oldService.branch_id;

    if (branch_id && branch_id !== oldService.branch_id) {
      const [branchExists] = await db.query(
        "SELECT branch_id FROM branch WHERE branch_id = ?",
        [branch_id]
      );
      if (branchExists.length === 0) {
        return res.status(404).json({ message: "Branch does not exist" });
      }
    }

    const [result] = await db.query(
      "UPDATE service SET service_name = ?, description = ?, branch_id = ? WHERE service_id = ?",
      [updatedName, updatedDescription, updatedBranchId, id]
    );

    res.status(200).json({ message: "Service updated successfully" });
  } catch (error) {
    next(error);
  }
};
