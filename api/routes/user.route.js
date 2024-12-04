import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser } from "../controllers/user.controller.js";

const router = express.Router();

// Route to update a user by ID
router.put("/:id", verifyToken, updateUser);

export default router;
