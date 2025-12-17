export const isAdmin = (req, res, next) => {
  if (req.user.role != "admin") {
    return res.status(401).json({ message: "unauthorized!Admin only" });
  }
  next();
};
