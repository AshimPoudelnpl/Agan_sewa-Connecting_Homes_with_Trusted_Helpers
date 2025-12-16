import db from "../config/db.js";

export const addInquiry = async (req, res) => {
  try {
    const { name, phone, email, address, description, branch_id } = req.body;
    if (!name || !phone || !address || !branch_id) {
      return res.status(401).json({ message: "please fill all credentials" });
    }
    await db.query(
      "insert into inquiry( name,phone,email,address ,description ,branch_id) values (?,?,?,?,?,?) ",
      [name, phone, email, address, description, branch_id]
    );
    res.status(201).json({ message: "Inquiry Added Successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const getInquiry = async (req, res) => {
  try {
    const [row] = await db.query(`SELECT 
  i.inquiry_id,
  i.name,
  i.phone,
  i.email,
  i.address,
  i.description,
  b.branch_id,
  b.branch_name
FROM inquiry i
LEFT JOIN branch b
  ON i.branch_id = b.branch_id
`);

    res.status(201).json({ message: "Inquiry retrive Sucessfully", data: row });
  } catch (error) {
    console.log(error);
  }
};
//Review
export const addReview = async (req, res) => {
  try {
    const { name, star, description, branch_id } = req.body;
    if (!name || !star || !description || !branch_id) {
      return res.status(401).json({ message: "please fill all credentials" });
    }
    await db.query(
      "insert into review( name,star ,description ,branch_id) values (?,?,?,?) ",
      [name, star, description, branch_id]
    );
    res.status(201).json({ message: "Review Added Successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const getReview = async (req, res) => {
  try {
    const [row] = await db.query(`select
      r.name,
      r.star,
      r.description,
      b.branch_id,
      b.branch_name
      from review r
      left join branch b
      on r.branch_id=b.branch_id
      
      `);
    res
      .status(201)
      .json({ message: "Review retrived successfully", data: row });
  } catch (error) {
    console.log(error);
  }
};
export const addTrustedCustomers = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.file);
    if (!name) {
      if (req.file) {
        removeImage(req.file.imagePath);
      }
      return res.status(400).json({ message: "Name, Description required" });
    }
    const imagePath = req.file
      ? `uploads/customers/${req.file.filename}`
      : null;

    const [customers] = await db.query(
      "insert into TrustedCustomers (name,img) values (?,?)",
      [name, imagePath]
    );
    res
      .status(200)
      .json({ message: "Customers Added Successfully", image: imagePath });
  } catch (error) {}
};
export const getTrustedCustomers = async (req, res) => {
  try {
    const [row] = await db.query("select * from TrustedCustomers ");
    res
      .status(201)
      .json({ message: "customer retrived sucessfully", data: row });
  } catch (error) {
    console.log(error);
  }
};
