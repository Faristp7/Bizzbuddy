import express from "express";
import { BussinessForm, googleSignin, saveUser, signUp } from "../controllers/userController.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post('/googleSignin' , googleSignin)
router.post('/saveUser' , saveUser)
router.post('/saveBussinessForm' , BussinessForm)

export default router;
