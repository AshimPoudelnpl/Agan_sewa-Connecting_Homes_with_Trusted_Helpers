import db from "../config/db.js";
export const addServices = async (req, res, next) => {
  try {
    const { name, description, branch_id } = req.body;
    console.log(req.body);
    console.log(req.file);
    if (!name || !description) {
      if (req.file) {
        removeImage(req.file.imagePath);
      }
      return res.status(400).json({ message: "Name, Description required" });
    }
    const imagePath = req.file ? `uploads/service/${req.file.filename}` : null;

    const [existingBranchId] = await db.query(
      "select branch_id from branch where branch_id=?",
      [branch_id]
    );
    if (existingBranchId.length === 0) {
      return res.status(404).json({ message: " Branch doesnot exists" });
    }

    const [services] = await db.query(
      "insert into services (service_name,description,service_image,branch_id ) values (?,?,?,?)",
      [name, description, imagePath, branch_id]
    );
    res
      .status(200)
      .json({ message: "Service Added Successfully", image: imagePath });
  } catch (error) {
    next(error);
  }
};
//get Services
export const getServices = async (req, res, next) => {
  try {
    const [row] = await db.query(`SELECT 
  s.service_id,
  s.service_name,
  s.description,
  s.service_image,
  b.branch_name
  from services s
  left join branch b
  ON s.branch_id=b.branch_id`);
    res.status(200).json({
      message: "Service Added Successfully",
      result: row,
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
export const updateService = async (req, res,next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const [result] = await db.query(
      "UPDATE services SET service_name = ?, description = ? WHERE service_id = ?",
      [name, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service updated successfully" });
  } catch (error) {
    next( error);
  }
};
