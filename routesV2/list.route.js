import express from "express";

import { createList, getAllList , getListByID , updateListByID , deleteListByID } from "../controllersV2/list.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createList);
router.get("/", isAuthenticated, getAllList);
router.get("/:id", isAuthenticated, getListByID);
router.put("/:id", isAuthenticated, updateListByID);
router.delete("/:id", isAuthenticated, deleteListByID);

export default router;
