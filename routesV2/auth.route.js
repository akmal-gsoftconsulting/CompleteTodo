import express from "express";
import { login, logout, signup,forgotpassword , resetPassword } from "../controllersV2/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.delete("/logout", logout);
router.post("/forgot-password", forgotpassword);
router.post("/reset-password", resetPassword);

export default router;

