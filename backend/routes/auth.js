import express from "express";
import {Register, Login, Profile} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

// register
router.post("/register", Register);

// login
router.post("/login", Login);

// Me
router.get("/me", protect, Profile);

export default router;
