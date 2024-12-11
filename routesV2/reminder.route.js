import express from "express";


import { setReminder, getReminders, deleteReminder} from "../controllersV2/reminder.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated ,setReminder);
router.get("/", isAuthenticated ,getReminders); 
router.delete("/:id", isAuthenticated ,deleteReminder);


export default router;