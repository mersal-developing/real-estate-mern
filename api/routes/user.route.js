import express from "express";
import {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// Route to get all users
router.get("/", getUsers);

// Route to get a single user by ID
router.get("/:id", getUserById);

// Route to delete a user by ID
router.delete("/:id", deleteUser);

// Route to update a user by ID
router.put("/:id", updateUser);

export default router;
