import express from "express";

import { createTag , getTags , updateTag , deleteTag } 
from "../controllersV2/tag.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated ,createTag);
router.get("/", isAuthenticated ,getTags);
router.put("/:id", isAuthenticated ,updateTag);
router.delete("/:id", isAuthenticated ,deleteTag);


export default router;