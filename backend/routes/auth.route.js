import express from "express";
import { loginUser, logoutUser } from "../controller/auth.controller.js";
import Islogin from "../middleware/Islogin.js";


const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/logout",Islogin, logoutUser);
export default authRouter;
