import express from "express";

import { createTodo, getTodo, getTodoByID, updateTodo, deleteTodo } 
from "../controllersV2/todoItem.controller.js";


import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/", isAuthenticated, createTodo);
router.get("/", isAuthenticated, getTodo);
router.get("/:id", isAuthenticated, getTodoByID);
router.put("/:id", isAuthenticated, updateTodo);
router.delete("/:id", isAuthenticated, deleteTodo);

export default router;