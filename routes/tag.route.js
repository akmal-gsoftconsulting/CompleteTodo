import express from "express";

import { createTag , getTags , updateTag , deleteTag } 
from "../controllers/tag.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/createTag", isAuthenticated ,createTag);
router.get("/getTags", isAuthenticated ,getTags);
router.put("/updateTag/:id", isAuthenticated ,updateTag);
router.delete("/deleteTag/:id", isAuthenticated ,deleteTag);


export default router;