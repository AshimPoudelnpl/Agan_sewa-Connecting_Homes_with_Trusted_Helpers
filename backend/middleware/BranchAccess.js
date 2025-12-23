export const authorizeBranchAccess = (req, res, next) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized: User not authenticated",
    });
  }

  // Admin can access any branch
  if (req.user.role === "admin") {
    return next();
  }

  // Manager can access only their own branch
  if (req.user.role === "manager") {
    const requestBranchId = req.body.branch_id || req.params.branch_id;

    if (!requestBranchId) {
      return res.status(400).json({
        message: "Branch ID is required",
      });
    }

    if (Number(requestBranchId) !== Number(req.user.branch_id)) {
      return res.status(403).json({
        message: "You can access only your own branch",
      });
    }
  }

  next();
};
