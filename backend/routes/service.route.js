import express from "express";
import {
  addServices,
  deleteService,
  getAllServices,
  getServices,
  updateService,
} from "../controller/service.controller.js";
import { uploadService } from "../utils/multerHandler.js";
import islogin from "../middleware/auth/Islogin.js";
import { authorizeRoles } from "../middleware/auth/AuthorizeRoles.js";

export const serviceRouter = express.Router();

serviceRouter.post(
  "/add-service",
  islogin,
  authorizeRoles("admin", "manager"),
  uploadService.single("image"),
  addServices
);

serviceRouter.get(
  "/get-service",
  islogin,
  authorizeRoles("admin", "manager"),
  getServices
);
serviceRouter.get("/get-services/:branch_id", getAllServices);

serviceRouter.delete(
  "/delete-service/:id",
  islogin,
  authorizeRoles("admin", "manager"),
  deleteService
);

serviceRouter.patch(
  "/update-service/:id",
  islogin,
  authorizeRoles("admin", "manager"),
  uploadService.single("image"),
  updateService
);
