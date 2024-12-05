import express from "express";


import { setReminder, getReminders, deleteReminder} from "../controllers/reminder.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/setReminder", isAuthenticated ,setReminder);
router.get("/getReminders", isAuthenticated ,getReminders); 
router.delete("/deleteReminder/:id", isAuthenticated ,deleteReminder);


export default router;