import jwt from "jsonwebtoken";

const islogin = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: You have to login first" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default islogin;
