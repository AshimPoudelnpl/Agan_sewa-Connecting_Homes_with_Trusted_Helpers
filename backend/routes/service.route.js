import express from "express";
import {
  addServices,
  deleteService,
  getServices,
  updateService,
} from "../controller/service.controller.js";
import { uploadService } from "../utils/multerHandler.js";
import islogin from "../middleware/Islogin.js";
import { authorizeRoles } from "../middleware/AuthorizeRoles.js";
import { authorizeBranchAccess } from "../middleware/BranchAccess.js";

export const serviceRouter = express.Router();

serviceRouter.post(
  "/add-service",
  islogin,
  authorizeRoles("admin", "manager"),
  uploadService.single("image"),
  authorizeBranchAccess,
  addServices
);

serviceRouter.get("/get-service", getServices);

serviceRouter.delete(
  "/delete-service/:branch_id/:id",
  islogin,
  authorizeRoles("admin", "manager"),
  authorizeBranchAccess,
  deleteService
);

serviceRouter.patch(
  "/update-service/:branch_id/:id",
  islogin,
  authorizeRoles("admin", "manager"),
  authorizeBranchAccess,
  uploadService.single("image"),
  updateService
);
