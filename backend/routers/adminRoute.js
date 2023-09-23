import express from "express";
import { roleLogIn } from "../controllers/userController.js";

const router = express.Router();

router.post("/roleLogIn", roleLogIn);

export default router;
