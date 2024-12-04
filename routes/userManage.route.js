import express from "express";
import {getUser, updateUser  } from "../controllers/userManage.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/getUser", isAuthenticated ,getUser);
router.put("/updateUser", isAuthenticated ,updateUser);


export default router;