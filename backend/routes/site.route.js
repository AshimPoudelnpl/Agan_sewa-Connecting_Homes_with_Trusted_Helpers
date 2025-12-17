import express from "express";
import {
  addGallery,
  addInquiry,
  addReview,
  addTrustedCustomers,
  getGallery,
  getInquiry,
  getReview,
  getTrustedCustomers,
} from "../controller/site.controller.js";
import { uploadCustomer, uploadGallery } from "../utils/multerHandler.js";

export const siteRouter = express.Router();
siteRouter.post("/add-inquiry", addInquiry);
siteRouter.get("/get-inquiry", getInquiry);
siteRouter.post("/add-review", addReview);
siteRouter.get("/get-review", getReview);
siteRouter.post(
  "/add-trustedcustomers",
  uploadCustomer.single("image"),
  addTrustedCustomers
);
siteRouter.get("/get-trustedCustomers", getTrustedCustomers);
siteRouter.post("/add-gallery", uploadGallery.array("image", 30), addGallery);
siteRouter.get("/get-gallery", getGallery);
