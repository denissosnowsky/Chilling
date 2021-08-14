import { Router } from "express";
import { users } from "../controllers/users.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// api/users
router.post("/", authMiddleware, users);

export default router;
