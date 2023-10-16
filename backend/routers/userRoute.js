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
  searchAccount,
  searchTags,
  searchBusiness,
  getProfilePost,
  editUserPost,
} from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/googleSignin", googleSignin);
router.post("/saveUser", saveUser);
router.post("/saveBussinessForm", BussinessForm);
router.post("/createPost", verifyToken, createPost);
router.post("/editUserPost", verifyToken, editUserPost);

router.get("/getUserProfile", verifyToken, userProfile);
router.get("/getUserPost", verifyToken, getUserPost);
router.get("/getProfilePost/:page", verifyToken, getProfilePost);
router.get("/searchAccount", verifyToken, searchAccount); //search user accounts
router.get("/searchTags", verifyToken, searchTags); //search tags
router.get("/searchBusiness", verifyToken, searchBusiness); //search tags

router.patch("/updateUserData", verifyToken, updateUserData); //update user Data
router.patch("/updateBusinessData", verifyToken, updateBusinessData); //update business Data

export default router;
