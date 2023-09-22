import express from "express";
import { adminLogin } from "../controllers/userController.js";

const router = express.Router();

router.post("/adminLogin", adminLogin);

export default router;
