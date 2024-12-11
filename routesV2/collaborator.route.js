import express from "express";
import { createCollaborator , deleteCollaborator, getCollaborators }
 from "../controllersV2/collaborator.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();



router.post("/", isAuthenticated, createCollaborator);
router.delete("/:id", isAuthenticated, deleteCollaborator);
router.get("/:listid", isAuthenticated, getCollaborators);

export default router;