import express from "express";
import { signIn, signUp, oauth } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/oauth", oauth);

export default router;
