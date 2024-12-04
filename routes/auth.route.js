import express from "express";
import { login, logout, signup,forgotpassword , resetPassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgotpassword", forgotpassword);
router.post("/resetpassword", resetPassword);

export default router;