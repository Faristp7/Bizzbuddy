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
  getUserPost,
  searchTag,
} from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/googleSignin", googleSignin);
router.post("/saveUser", saveUser);
router.post("/saveBussinessForm", BussinessForm);
router.post("/createPost", verifyToken, createPost);

router.get("/search", verifyToken, searchTag);
router.get("/getUserProfile", verifyToken, userProfile);
router.get("/getUserPost", verifyToken, getUserPost);

router.patch("/updateUserData", verifyToken, updateUserData); //update user Data
router.patch("/updateBusinessData", verifyToken, updateBusinessData); //update business Data

export default router;
