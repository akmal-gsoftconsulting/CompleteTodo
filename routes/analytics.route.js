import express from "express";

import { getTodoStats } 
from "../controllers/analytics.controller.js" ;
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/getTodoStats", isAuthenticated ,  getTodoStats);


export default router;