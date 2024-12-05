import express from "express";
import { createCollaborator , deleteCollaborator, getCollaborators }
 from "../controllers/collaborator.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/createCollaborator", isAuthenticated, createCollaborator);
router.delete("/deleteCollaborator/:id", isAuthenticated, deleteCollaborator);
router.get("/getCollaborators/:listid", isAuthenticated, getCollaborators);

export default router;