import express from "express";
import {
  BussinessForm,
  updateBusinessData,
  googleSignin,
  saveUser,
  signUp,
  updateUserData,
  userProfile,
  createPost,
} from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/googleSignin", googleSignin);
router.post("/saveUser", saveUser);
router.post("/saveBussinessForm", BussinessForm);
router.post("/createPost", verifyToken, createPost);

router.get("/getUserProfile", verifyToken, userProfile);

router.patch("/updateUserData", verifyToken, updateUserData); //update user Data
router.patch("/updateBusinessData", verifyToken, updateBusinessData); //update business Data

export default router;
