import express from "express";
import {
  addStaff,
  deleteStaff,
  editStaff,
  getStaff,
} from "../controller/staff.controller.js";
import { uploadstaff } from "../utils/multerHandler.js";
import islogin from "./../middleware/Islogin.js";
import { authorizeRoles } from "../middleware/AuthorizeRoles.js";
import { authorizeBranchAccess } from "../middleware/BranchAccess.js";
export const staffRouter = express.Router();
staffRouter.post(
  "/add-staff",
  islogin,
  authorizeRoles("admin", "manager"),
  uploadstaff.single("image"),
  authorizeBranchAccess,
  addStaff
);
staffRouter.get(
  "/get-staff",
  islogin,
  authorizeRoles("admin", "manager"),
  getStaff
);
staffRouter.delete(
  "/delete-staff/:id",
  islogin,
  authorizeRoles("admin"),
  deleteStaff
);
staffRouter.patch(
  "/edit-staff/:id",
  islogin,
  authorizeRoles("admin", "manager"),
  authorizeBranchAccess,
  editStaff
);
