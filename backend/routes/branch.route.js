import express from "express";
import { addProvince, deleteProvince, getProvince } from "../controller/branch.controller.js";
export const branchRouter = express.Router();
branchRouter.post("/add-province", addProvince);
branchRouter.get("/get-province", getProvince);
branchRouter.delete("/delete-province/:id", deleteProvince);

branchRouter.post("/add-district", addProvince);
branchRouter.get("/get-district", getProvince);
branchRouter.delete("/delete-district/:id", deleteProvince);
