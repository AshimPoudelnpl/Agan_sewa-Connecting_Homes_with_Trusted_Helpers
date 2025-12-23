import express from "express";
import {
  addBranch,
  addDistrict,
  addProvince,
  deleteBranch,
  deleteDistrict,
  deleteProvince,
  getBranch,
  getDistrictByProvince,
  getProvince,
  updateBranch,
} from "../controller/branch.controller.js";
import islogin from "../middleware/Islogin.js";
import { authorizeRoles } from "../middleware/AuthorizeRoles.js";
export const branchRouter = express.Router();
branchRouter.post(
  "/add-province",
  islogin,
  authorizeRoles("admin"),
  addProvince
);
branchRouter.get("/get-province", getProvince);
branchRouter.delete(
  "/delete-province/:id",
  islogin,
  authorizeRoles("admin"),
  deleteProvince
);

branchRouter.post(
  "/add-district/",
  islogin,
  authorizeRoles("admin"),
  addDistrict
);
branchRouter.get("/get-district", getDistrictByProvince);
branchRouter.delete(
  "/delete-district/:id",
  islogin,
  authorizeRoles("admin"),
  deleteDistrict
);

branchRouter.post("/add-branch", islogin, authorizeRoles("admin"), addBranch);
branchRouter.get("/get-branch", getBranch);
branchRouter.delete(
  "/delete-branch/:id",
  islogin,
  authorizeRoles("admin"),
  deleteBranch
);
branchRouter.patch(
  "/edit-branch/:id",
  islogin,
  authorizeRoles("admin"),
  updateBranch
);
