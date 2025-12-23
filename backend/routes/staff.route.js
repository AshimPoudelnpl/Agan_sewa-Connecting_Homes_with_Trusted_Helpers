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
export const staffRouter = express.Router();
staffRouter.post(
  "/add-staff",
  islogin,
  authorizeRoles("manager"),
  uploadstaff.single("image"),
  addStaff
);
staffRouter.get("/get-staff", islogin, authorizeRoles("manager"), getStaff);
staffRouter.delete(
  "/delete-staff/:id",
  islogin,
  authorizeRoles("manager"),
  deleteStaff
);
staffRouter.patch(
  "/edit-staff/:id",
  islogin,
  authorizeRoles("manager"),
  editStaff
);
