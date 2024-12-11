import express from "express";

import { getTodoStats } 
from "../controllersV2/analytics.controller.js" ;
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated ,  getTodoStats);


export default router;