import express from "express";
import { filterTodoItems}
    from "../controllersV2/filter.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();



router.get("/", isAuthenticated, filterTodoItems);

export default router;