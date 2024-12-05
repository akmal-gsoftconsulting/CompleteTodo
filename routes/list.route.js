import express from "express";

import { createList, getAllList , getListByID , updateListByID , deleteListByID } from "../controllers/list.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/createList", isAuthenticated, createList);
router.get("/getAllList", isAuthenticated, getAllList);
router.get("/getListByID/:id", isAuthenticated, getListByID);
router.put("/updateListByID/:id", isAuthenticated, updateListByID);
router.delete("/deleteListByID/:id", isAuthenticated, deleteListByID);

export default router;
