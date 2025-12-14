import db from "../config/db.js";

export const addProvince = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);

    if (!name) {
      return res.status(400).json({ message: "Province name is required" });
    }

    const [existingProvince] = await db.query(
      "SELECT province_name from province WHERE province_name = ?",
      [name]
    );

    if (existingProvince.length > 0) {
      return res.status(409).json({ message: "Province already exists" });
    }

    const [result] = await db.query(
      "INSERT INTO province (province_name) VALUES (?)",
      [name]
    );

    return res.status(201).json({
      message: "Province added successfully",
    });
  } catch (error) {}
};
export const getProvince = async (req, res) => {
  try {
    const [result] = await db.query(
      "select province_name,province_id from province"
    );
    res.status(201).json({
      message: "Province Added Successfully",
      data: result,
      id: result.insertId,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteProvince = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const [inputtedId] = await db.query(
      "select province_id from province where province_id =?",
      [id]
    );
    console.log()
    if (inputtedId == 0) {
      res.status(404).json({ message: "Province doesnot exists" });
    }
    const [result] = await db.query(
      "DELETE FROM province WHERE province_id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "provinces not found" });
    }
    res
      .status(200)
      .json({ message: `Province deleted Sucessfully with id  ${id}` });
  } catch (error) {
    console.log(error);
  }
};
