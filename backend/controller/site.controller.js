import db from "../config/db.js";

export const addInquiry = async (req, res, next) => {
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
    next(error);
  }
};
export const getInquiry = async (req, res, next) => {
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
    next(error);
  }
};
//Review
export const addReview = async (req, res, next) => {
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
    next(error);
  }
};
export const getReview = async (req, res, next) => {
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
    next(error);
  }
};
//trustedcustomers
export const addTrustedCustomers = async (req, res, next) => {
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

    if (req.file) {
      const [customers] = await db.query(
        "insert into TrustedCustomers (name,img) values (?,?)",
        [name, imagePath]
      );
    }
    res
      .status(200)
      .json({ message: "Customers Added Successfully", image: imagePath });
  } catch (error) {
    next(error);
  }
};
export const getTrustedCustomers = async (req, res, next) => {
  try {
    const [row] = await db.query("select * from TrustedCustomers ");
    res
      .status(201)
      .json({ message: "customer retrived sucessfully", data: row });
  } catch (error) {
    next(error);
  }
};
//gallery
export const addGallery = async (req, res, next) => {
  try {
    const { title, location, date, branch_id, staff_id } = req.body;

    if (!title || !location || !req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "title, location and image required" });
    }

    const imagePath = `uploads/gallery/${req.files[0].filename}`;

    await db.query(
      "insert into gallery (title,location ,branch_id,date,staff_id,gallery_img ) values (?,?,?,?,?,?)",
      [title, location, branch_id, date, staff_id, imagePath]
    );
    res
      .status(200)
      .json({ message: "gallery Added Successfully", image: imagePath });
  } catch (error) {
    next(error);
  }
};
export const getGallery = async (req, res, next) => {
  try {
    const [row] = await db.query("SELECT * FROM gallery");
    res
      .status(200)
      .json({ message: "Gallery retrieved successfully", data: row });
  } catch (error) {
    next(error);
  }
};
