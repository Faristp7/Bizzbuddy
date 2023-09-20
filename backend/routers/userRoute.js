import express from "express";
import { googleSignin, signUp } from "../controllers/userController.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post('/googleSignin' , googleSignin)

export default router;
