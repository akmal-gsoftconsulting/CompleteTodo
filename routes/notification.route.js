import express from "express";

import { getNotifications , readNotification , deleteNotification , createNotification } 
from "../controllers/notification.controller.js ";

import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/getNotifications", isAuthenticated, getNotifications);
router.put("/readNotification/:id", isAuthenticated, readNotification);
router.delete("/deleteNotification/:id", isAuthenticated, deleteNotification);
router.post("/createNotification", isAuthenticated, createNotification);

export default router;
