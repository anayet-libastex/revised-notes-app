import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getAllNotes, createNote, getById, updateNote, deleteNote } from "../controllers/noteController.js"

const router = express.Router();

// Get Notes
router.get("/", protect, getAllNotes);

// Create note
router.post("/", protect, createNote);

// Get a note
router.get("/:id", protect, getById);

// Update note
router.put("/:id", protect, updateNote);

// Delete note
router.delete("/:id", protect, deleteNote);

export default router;