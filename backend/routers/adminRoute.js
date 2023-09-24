import express from "express";
import { roleLogIn } from "../controllers/userController.js";
import {
  blockAndUnBlockUser,
  getUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/roleLogIn", roleLogIn);
router.post("/blockAndBlock", blockAndUnBlockUser);

router.get("/getUserData", getUser);

export default router;
