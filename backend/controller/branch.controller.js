import db from "../config/db.js";
//Province
export const addProvince = async (req, res, next) => {
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
  } catch (error) {
    next(error);
  }
};
export const getProvince = async (req, res, next) => {
  try {
    const [result] = await db.query(
      `SELECT 
  p.province_id,
  p.province_name,
  GROUP_concat(d.district_name) as district_name
FROM province p
LEFT JOIN district d 
  ON p.province_id = d.province_id
GROUP BY 
  p.province_id,
  p.province_name;
`
    );
    res.status(201).json({
      message: "Province Added Successfully",
      data: result,
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteProvince = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const [inputtedId] = await db.query(
      "select province_id from province where province_id =?",
      [id]
    );
    console.log();
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
    next(error);
  }
};

//District
export const addDistrict = async (req, res, next) => {
  try {
    const { district_name, province_id } = req.body;
    if (!district_name) {
      return res.status(400).json({ message: "District  name are required" });
    }
    const [existingDistrict] = await db.query(
      "SELECT  district_name FROM district WHERE  district_name=?",
      [district_name]
    );
    if (existingDistrict.length > 0) {
      return res.status(409).json({ message: "District already exists" });
    }
    const [existingProvinceId] = await db.query(
      "select province_id from province where province_id=?",
      [province_id]
    );
    if (existingProvinceId.length === 0) {
      res.status(404).json({ message: "Province doesnot exists" });
    }
    const user = existingDistrict[0];

    const [result] = await db.query(
      "INSERT INTO district (district_name,province_id) VALUES (?,?)",
      [district_name, province_id]
    );
    res.status(200).json({
      message: "District Added sucessfully",
      district_name: user.district_name,
    });
  } catch (error) {
    next(error);
  }
};
export const getDistrictByProvince = async (req, res, next) => {
  try {
    const { provinceId } = req.params;

    if (!provinceId) {
      return res.status(400).json({
        message: "Province ID is required",
      });
    }

    const [result] = await db.query(
      `SELECT 
        district_id,
        district_name,
        province_id
       FROM district
       WHERE province_id = ?
       ORDER BY district_name ASC`,
      [provinceId]
    );

    res.status(200).json({
      message: "Districts retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getDistrict = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [countResult] = await db.query(
      `SELECT COUNT(*) as total FROM district`
    );
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    const [result] = await db.query(
      `SELECT 
    d.district_id,
    d.district_name,
    d.province_id,
    GROUP_CONCAT(b.branch_name) AS branches
FROM district d
LEFT JOIN branch b ON d.district_id = b.district_id
GROUP BY 
    d.district_id,
    d.district_name,
    d.province_id
ORDER BY d.district_name ASC
LIMIT ? OFFSET ?;
`,
      [limit, offset]
    );

    res.status(200).json({
      message: "All districts retrieved successfully",
      data: result,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDistricts = async (req, res, next) => {
  try {
    const [result] = await db.query(
      "SELECT district_id, district_name FROM district ORDER BY district_name ASC"
    );
    res.status(200).json({
      message: "All districts retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const getBranchesByDistrictID = async (req, res, next) => {
  try {
    const { districtId } = req.params;
    const [result] = await db.query(
      `SELECT 
      branch_id, 
      branch_name,
      LOWER(REPLACE(branch_name, ' ', '-')) AS branch_slug FROM branch WHERE district_id = ?`,
      [districtId]
    );
    res.status(200).json({
      message: "Branches retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteDistrict = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const [inputtedId] = await db.query(
      "select district_id from district where district_id =?",
      [id]
    );
    if (inputtedId == 0) {
      res.status(404).json({ message: "District doesnot exists" });
    }
    const [result] = await db.query(
      "DELETE FROM district WHERE district_id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "District not found" });
    }
    res
      .status(200)
      .json({ message: `District deleted Sucessfully with id  ${id}` });
  } catch (error) {
    next(error);
  }
};
// Branch
export const addBranch = async (req, res, next) => {
  try {
    const { branch_name, district_id, remarks } = req.body;
    if (!branch_name) {
      return res.status(400).json({ message: "Branch_name are required" });
    }
    const [existingBraanch] = await db.query(
      "SELECT  branch_name FROM branch WHERE  branch_name=?",
      [branch_name]
    );
    if (existingBraanch.length > 0) {
      return res.status(409).json({ message: "Branch already exists" });
    }
    const [existingDistrictId] = await db.query(
      "select district_id from district where district_id=?",
      [district_id]
    );
    if (existingDistrictId.length === 0) {
      return res.status(404).json({ message: " District doesnot exists" });
    }

    const [result] = await db.query(
      "INSERT INTO branch (branch_name,district_id,remarks) VALUES (?,?,?)",
      [branch_name, district_id, remarks]
    );
    res.status(200).json({
      message: " Branch Added sucessfully",
      branch_name: branch_name,
    });
  } catch (error) {
    next(error);
  }
};
export const getBranch = async (req, res, next) => {
  const { role, branch_id } = req.user;
  try {
    let query = `SELECT 
  b.branch_id,
  b.branch_name,
  b.remarks,
  b.district_id,
  d.district_name
  from branch b
  left join district d
  on b.district_id=d.district_id`;

    const queryParams = [];
    if (role === "manager") {
      query += ` WHERE b.branch_id = ?`;
      queryParams.push(branch_id);
    }

    const [result] = await db.execute(query, queryParams);
    res.status(200).json({ message: "Branches Retrived Sucessfully", result });
  } catch (error) {
    next(error);
  }
};
export const deleteBranch = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const [inputtedId] = await db.query(
      "select branch_id from branch where branch_id =?",
      [id]
    );

    if (inputtedId == 0) {
      res.status(404).json({ message: "branch doesnot exists" });
    }
    const [result] = await db.query("DELETE FROM branch WHERE branch_id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Branch not found" });
    }
    res
      .status(200)
      .json({ message: `Branches deleted Sucessfully with id  ${id}` });
  } catch (error) {
    next(error);
  }
};
export const updateBranch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { branch_name, district_id, remarks } = req.body;

    const [existing] = await db.execute(
      "SELECT * FROM branch WHERE branch_id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        message: `Branch not found with id ${id}`,
      });
    }

    const oldbranch = existing[0];
    const updatedBranchName = branch_name || oldbranch.branch_name;
    const updatedDistrictId = district_id || oldbranch.district_id;
    const updatedRemarks = remarks || oldbranch.remarks;

    if (district_id && district_id !== oldbranch.district_id) {
      const [districtExists] = await db.execute(
        "SELECT district_id FROM district WHERE district_id = ?",
        [district_id]
      );
      if (districtExists.length === 0) {
        return res.status(404).json({ message: "District does not exist" });
      }
    }

    if (branch_name && branch_name !== oldbranch.branch_name) {
      const [nameCheck] = await db.execute(
        "SELECT branch_id FROM branch WHERE branch_name = ? AND branch_id != ?",
        [branch_name, id]
      );
      if (nameCheck.length > 0) {
        return res.status(409).json({
          message: "Branch name already exists",
        });
      }
    }

    await db.execute(
      `UPDATE branch 
       SET branch_name = ?, district_id = ?, remarks = ?
       WHERE branch_id = ?`,
      [updatedBranchName, updatedDistrictId, updatedRemarks, id]
    );

    return res.status(200).json({
      message: "Branch updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getAllPDB = async (req, res, next) => {
  const { province_id, district_id } = req.query;

  try {
    let query = "";
    let params = [];

    if (province_id && !district_id) {
      // Get districts based on province_id
      query = "SELECT * FROM district WHERE province_id = ?";
      params = [province_id];
    } else if (district_id) {
      // Get branches based on district_id
      query = "SELECT * FROM branch WHERE district_id = ?";
      params = [district_id];
    } else {
      return res
        .status(400)
        .json({ message: "Please provide province_id or district_id" });
    }
    const [results] = await db.query(query, params);

    res.status(200).json({
      message: "Data fetched successfully",
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
