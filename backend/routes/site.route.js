import express from 'express'
import { addInquiry, addReview, addTrustedCustomers, getInquiry, getReview, getTrustedCustomers } from '../controller/site.controller.js';
import { uploadCustomer } from '../utils/multerHandler.js';
  export const siteRouter=express.Router();
 siteRouter.post("/add-inquiry",addInquiry)
 siteRouter.get("/get-inquiry",getInquiry)
 siteRouter.post("/add-review",addReview)
 siteRouter.get("/get-review",getReview)
 siteRouter.post("/add-trustedcustomers", uploadCustomer.single("image"),addTrustedCustomers)
 siteRouter.get("/get-trustedCustomers",getTrustedCustomers)