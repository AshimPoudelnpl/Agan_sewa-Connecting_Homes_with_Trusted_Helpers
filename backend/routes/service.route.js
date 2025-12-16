import express from 'express';
import { addServices, deleteService, getServices, updateService } from '../controller/service.controller.js';
import {  uploadService } from '../utils/multerHandler.js';


const serviceRouter = express.Router();
serviceRouter.post('/add-service', uploadService.single("image"), addServices);
serviceRouter.get('/get-service', uploadService.single("image"), getServices);
serviceRouter.delete('/delete-service/:id',deleteService);
serviceRouter.patch('/update-service/:id', updateService);
export default serviceRouter;