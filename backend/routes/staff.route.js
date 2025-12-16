import express from 'express'
import { addStaff,  deleteStaff, editStaff,getStaff } from '../controller/staff.controller.js';
export  const staffRouter=express.Router();
staffRouter.post("/add-staff",addStaff)
staffRouter.get("/get-staff",getStaff)
staffRouter.delete("/delete-staff/:id",deleteStaff)
staffRouter.patch("/edit-staff/:id",editStaff)