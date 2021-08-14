import { Router } from "express";
import { addFriend, friends, removeFriend } from "../controllers/friends.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

//api/friends/add
router.post("/add", authMiddleware, addFriend);

//api/friends/remove
router.delete("/remove", authMiddleware, removeFriend);

// api/friends
router.post("/", authMiddleware, friends);

export default router;
