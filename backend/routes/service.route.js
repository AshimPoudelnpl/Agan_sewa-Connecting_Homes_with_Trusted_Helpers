import express from 'express';
import { addServices, deleteService, getServices, updateService } from '../controller/service.controller.js';
import {  uploadService } from '../utils/multerHandler.js';
import islogin from '../middleware/Islogin.js';
import { authorizeRoles } from '../middleware/AuthorizeRoles.js';


const serviceRouter = express.Router();
serviceRouter.post('/add-service', islogin, authorizeRoles("manager"), uploadService.single("image"), addServices);
serviceRouter.get('/get-service', getServices);
serviceRouter.delete('/delete-service/:id', islogin, authorizeRoles("manager"), deleteService);
serviceRouter.patch('/update-service/:id', islogin, authorizeRoles("manager"), updateService);
export default serviceRouter;