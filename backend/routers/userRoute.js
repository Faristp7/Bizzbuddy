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
  getHomePagePost,
  searchAccount,
  searchTags,
  searchBusiness,
  getProfilePost,
  editUserPost,
  deletePost,
  getAnotherUserProfile,
  reportPost,
  manageLike,
  addComment,
  getComment,
  mangeFollow,
  getFollowersData,
  getFollowingData,
  sendMessage,
  getMessage,
  getChatUsers,
} from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/getMessage/:id", verifyToken, getMessage);
router.get("/getComment/:id/:currentPage", getComment);
router.get("/getUserProfile", verifyToken, userProfile);
router.get("/getChatUsers", verifyToken, getChatUsers);
router.get("/getFollowersData/:id/:page", verifyToken, getFollowersData);
router.get("/getFollowingData/:id/:page", verifyToken, getFollowingData);
router.get("/getHomePagePost", verifyToken, getHomePagePost);
router.get("/getProfilePost/:userId/:page", verifyToken, getProfilePost);
router.get("/getAnotherUserProfile/:id", verifyToken, getAnotherUserProfile);
router.get("/searchAccount", verifyToken, searchAccount); //search user accounts
router.get("/searchTags", verifyToken, searchTags); //search tags
router.get("/searchBusiness", verifyToken, searchBusiness); //search tags

router.post("/signUp", signUp);
router.post("/saveUser", saveUser);
// router.post("/sendMessage", sendMessage);
router.post("/googleSignin", googleSignin);
router.post("/saveBussinessForm", BussinessForm);
router.post("/addComment", verifyToken, addComment);
router.post("/manageLike", verifyToken, manageLike);
router.post("/createPost", verifyToken, createPost);
router.post("/reportPost", verifyToken, reportPost);
router.post("/manageFollow", verifyToken, mangeFollow);
router.post("/editUserPost", verifyToken, editUserPost);

router.patch("/updateUserData", verifyToken, updateUserData); //update user Data
router.patch("/updateBusinessData", verifyToken, updateBusinessData); //update business Data

router.delete("/deletePost/:id", deletePost);

export default router;
