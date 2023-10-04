import express from "express";
import {
  BussinessForm,
  googleSignin,
  saveUser,
  signUp,
  updateUserData,
  userProfile,
} from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/googleSignin", googleSignin);
router.post("/saveUser", saveUser);
router.post("/saveBussinessForm", BussinessForm);

router.patch("/updateUserData", updateUserData);   //update user Data

router.get("/getUserProfile", verifyToken, userProfile);

export default router;
