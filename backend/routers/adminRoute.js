import express from "express";
import { roleLogIn } from "../controllers/userController.js";
import { getUser } from "../controllers/adminController.js";

const router = express.Router();

router.post("/roleLogIn", roleLogIn);

router.get('/getUserData', getUser)

export default router;
