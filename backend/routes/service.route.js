import express from 'express';
import { addServices, deleteService, updateService } from '../controller/service.controller.js';
import { upload } from '../utils/multerHandler.js';
import { authorizeRole } from '../middleware/Role.js';

const serviceRouter = express.Router();
serviceRouter.post('/add-service', authorizeRole("admin"),upload.single("image"), addServices);
serviceRouter.delete('/delete-service/:id', authorizeRole("admin"),deleteService);
serviceRouter.patch('/update-service/:id', authorizeRole("admin"), updateService);
export default serviceRouter;