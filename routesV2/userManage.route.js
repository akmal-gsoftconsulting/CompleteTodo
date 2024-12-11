import express from "express";
import {getUser, updateUser  } from "../controllersV2/userManage.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", isAuthenticated ,getUser);
router.put("/profile", isAuthenticated ,updateUser);


export default router;