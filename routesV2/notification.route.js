import express from "express";

import { getNotifications , readNotification , deleteNotification , createNotification } 
from "../controllersV2/notificationV2.controller.js ";

import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getNotifications);
router.put("/:id", isAuthenticated, readNotification);
router.delete("/:id", isAuthenticated, deleteNotification);
router.post("/", isAuthenticated, createNotification);

export default router;
