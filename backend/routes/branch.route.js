import express from "express";
import {
  addBranch,
  addDistrict,
  addProvince,
  deleteBranch,
  deleteDistrict,
  deleteProvince,
  getAllDistricts,
  getAllPDB,
  getBranch,
  getBranchesByDistrictID,
  getDistrict,
  getDistrictByProvince,
  getProvince,
  updateBranch,
} from "../controller/branch.controller.js";
import islogin from "../middleware/auth/Islogin.js";
import { authorizeRoles } from "../middleware/auth/AuthorizeRoles.js";
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
branchRouter.get("/get-district", getDistrict);
branchRouter.get("/get-district/:provinceId", getDistrictByProvince);
branchRouter.get("/get-all-districts", getAllDistricts);
branchRouter.get("/get-branches-by-district/:districtId", getBranchesByDistrictID);

branchRouter.delete(
  "/delete-district/:id",
  islogin,
  authorizeRoles("admin"),
  deleteDistrict
);

branchRouter.post("/add-branch", islogin, authorizeRoles("admin"), addBranch);
branchRouter.get(
  "/get-branch",
  islogin,
  authorizeRoles("admin", "manager"),
  getBranch
);
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
branchRouter.get(
  "/getprovincedistrictbranch",
  islogin,
  authorizeRoles("admin"),
  getAllPDB
);
