import express from "express";
import { googleSignin, saveUser, signUp } from "../controllers/userController.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post('/googleSignin' , googleSignin)
router.post('/saveUser' , saveUser)

export default router;
