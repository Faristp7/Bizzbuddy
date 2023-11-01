import express from "express";
import { roleLogIn } from "../controllers/userController.js";
import {
  blockAndUnBlockUser,
  blockPost,
  getUser,
  reportMangment,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/roleLogIn", roleLogIn);
router.post("/blockAndBlock", blockAndUnBlockUser);
router.post("/blockPost", blockPost);

router.get("/getUserData", getUser);
router.get("/reportMangment", reportMangment);

export default router;
