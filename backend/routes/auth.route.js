import express from "express";
import {
  addmanagerByAdmin,
  addStaffByManager,
  loginUser,
  logoutUser,
} from "../controller/auth.controller.js";
import Islogin from "../middleware/Islogin.js";
import { addStaff } from "../controller/staff.controller.js";
import { uploadmanager, uploadstaff } from "../utils/multerHandler.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/logout", Islogin, logoutUser);
authRouter.post("/add-staff", uploadstaff.single("image"), addStaffByManager);
authRouter.post(
  "/add-manager",
  uploadmanager.single("image"),
  addmanagerByAdmin
);
export default authRouter;
