import express from "express";

import { createTodo, getTodo, getTodoByStatus, getTodoByID, updateTodo, deleteTodo } 
from "../controllers/todoItem.controller.js";


import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, createTodo);
router.get("/get", isAuthenticated, getTodo);
router.get("/getByStatus", isAuthenticated, getTodoByStatus);
router.get("/getByID/:id", isAuthenticated, getTodoByID);
router.put("/updateTodo/:id", isAuthenticated, updateTodo);
router.delete("/deleteTodo/:id", isAuthenticated, deleteTodo);

export default router;