import express from "express";
import { filterByKey , filterbyProperty}
    from "../controllers/filter.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/filterByKey", isAuthenticated, filterByKey);
router.get("/filterbyProperty", isAuthenticated, filterbyProperty);

export default router;