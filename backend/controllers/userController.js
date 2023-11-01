import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
import businessModel from "../models/bussinessModel.js";
import FollowModel from "../models/followModel.js";
import commentModel from "../models/commentModel.js";
import messageModel from "../models/messageModel.js";
import postModel from "../models/postModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import mongoose from "mongoose";

function getUserId(Bearer) {
  const token = Bearer.replace("Bearer", "").trim();
  const decodedToken = jwt.verify(token, process.env.SECRECTKEY); //extracting token
  return decodedToken;
}

export async function signUp(req, res) {
  try {
    const { username, email, phone, password } = req.body;
    if (username === "" || email === "" || password === "") {
      return res.status(400).json({ message: "fill all the fields" });
    } else if (!/^\d{10}$/.test(phone)) {
      return res.json({ message: "phone number must be 10 digits" });
    } else {
      const alreadyExistUser = await userModel.findOne({ email });
      if (alreadyExistUser || email === "admin@gmail.com") {
        return res.json({ message: "username already taken", error: true });
      } else {
        return res.json({ message: "sendOtp" });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function googleSignin(req, res) {
  const secrectKey = process.env.SECRECTKEY;
  try {
    const { email, given_name, picture } = req.body;
    const alreadyExistUser = await userModel.findOne({ email });

    if (alreadyExistUser) {
      if (alreadyExistUser.activeStatus) {
        const Token = alreadyExistUser.id;
        const token = jwt.sign({ Token }, secrectKey, {
          expiresIn: "6h",
        });
        res.json({ token, alreadyExistUser });
      } else {
        res.json({ message: "Account blocked", err: true });
      }
    } else {
      // if user not found Create new user
      const userSchema = new userModel({
        username: given_name,
        email: email,
        profileImage: picture,
      });
      await userSchema.save();

      const Token = userSchema.id;
      const token = jwt.sign({ Token }, secrectKey, {
        expiresIn: "6h",
      });
      res.json({ token, alreadyExistUser });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function saveUser(req, res) {
  try {
    const { username, email, password, phone } = req.body;

    const userSchema = new userModel({
      username,
      email,
      phone,
      password,
    });
    await userSchema.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function roleLogIn(req, res) {
  try {
    const secrectKey = process.env.SECRECTKEY;
    let role;
    const { email, password } = req.body;
    let userId;
    if (email === "admin@gmail.com") {
      userId = await adminLogIn(email, password);
      role = "admin";
    } else {
      userId = await userLogin(email, password);
      if (!userId.activeStatus) return res.json({ message: "Account Blocked" });
      if (!userId) return res.json({ message: "credential not matching" });
      role = "user";
    }
    if (userId) {
      const Token = userId._id;
      const token = jwt.sign({ Token }, secrectKey, {
        expiresIn: "6h",
      });
      res.json({ token, role, userId });
    } else {
      res.json({ message: "Account Blocked" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function adminLogIn(email, password) {
  try {
    const isAdminValid = await adminModel.findOne({ email });
    if (isAdminValid) {
      const verifed = bcrypt.compareSync(password, isAdminValid.password);
      if (verifed) return isAdminValid.id;
      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

async function userLogin(email, password) {
  try {
    const isUserValid = await userModel.findOne({ email });

    if (!isUserValid.activeStatus) {
      return false;
    } else {
      if (isUserValid) {
        const verifed = bcrypt.compareSync(password, isUserValid.password);
        const userInfo = { ...isUserValid.toObject() };
        delete userInfo.password;
        if (verifed) return userInfo;
        return false;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function BussinessForm(req, res) {
  try {
    const { values, tags, url } = req.body;
    const { businessName, description, phone, email, location } = values;
    const id = getUserId(req.headers.authorization);

    const bussinesSchema = new businessModel({
      bussinessName: businessName,
      Description: description,
      userId: id.Token,
      bannerImage: url,
      phone,
      email,
      location,
      tags,
    });
    const businessCollection = await bussinesSchema.save();
    if (businessCollection) {
      await userModel.findOneAndUpdate(
        { _id: id.Token },
        { $set: { bussinessId: businessCollection._id } }
      );
      res.status(200).json({ message: "Data saved succefully", success: true });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function userProfile(req, res) {
  try {
    const decodedToken = getUserId(req.headers.authorization);

    const { followerCount, followingCount } = await countFollow(
      decodedToken.Token
    );

    const userDetails = await userModel
      .findOne({ _id: decodedToken.Token })
      .populate("bussinessId");
    res.json({ userDetails, followerCount, followingCount });
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserData(req, res) {
  try {
    const { values, url } = req.body;
    const id = getUserId(req.headers.authorization);
    const updatedData = await userModel.findOneAndUpdate(
      { _id: id.Token },
      {
        $set: {
          email: values.email,
          phone: values.phone,
          username: values.username,
          ...(url ? { profileImage: url } : {}),
        },
      },
      { new: true }
    );
    const userData = { ...updatedData.toObject() };
    delete userData.password;
    res.json({ success: true, updatedData });
  } catch (error) {
    console.log(error);
  }
}

export async function getAnotherUserProfile(req, res) {
  try {
    const id = req.params.id;
    const userId = getUserId(req.headers.authorization);

    const userDetails = await userModel
      .findOne({ _id: id })
      .populate("bussinessId");

    const follwingStatus = await FollowModel.findOne({
      followerId: userId.Token,
      followingId: id,
    });

    const { followerCount, followingCount } = await countFollow(id);

    res.json({
      userDetails,
      isFollowing: follwingStatus !== null,
      followerCount,
      followingCount,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(req, res) {
  try {
    const userId = getUserId(req.headers.authorization);
    const { values, url } = req.body;

    const postSchema = new postModel({
      title: values.title,
      image: url,
      description: values.description,
      userId: userId.Token,
    });
    await postSchema.save();
    res.status(200).json({ message: "posted successful", status: true });
  } catch (error) {
    console.log(error);
  }
}

export async function updateBusinessData(req, res) {
  try {
    const { values, tags, url, businessId } = req.body;

    await businessModel.updateOne(
      { _id: businessId },
      {
        $set: {
          bussinessName: values.businessName,
          ...(url ? { bannerImage: url } : {}),
          Description: values.description,
          phone: values.phone,
          email: values.email,
          tags: tags,
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function editUserPost(req, res) {
  try {
    const { values, id } = req.body;

    await postModel.updateOne(
      { _id: id },
      { $set: { title: values.title, description: values.description } }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(req, res) {
  try {
    const id = req.params.id;

    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ success: true });
    console.log(id);
  } catch (error) {
    console.log(error);
  }
}

export async function getHomePagePost(req, res) {
  try {
    const { page, filter } = req.query;

    const sortOption = {};
    if (filter === "Oldest") {
      sortOption.createdAt = 1;
    } else if (filter === "Newest") {
      sortOption.createdAt = -1;
    } else {
      sortOption.createdAt = -1;
    }

    const pageSize = 2;
    const skip = (page - 1) * pageSize;
    const post = await postModel
      .find({view : false})
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize)
      .populate("userId")
      .exec();
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
  }
}

export async function getProfilePost(req, res) {
  try {
    const { page, userId } = req.params;
    const pageSize = 2;
    const skip = (page - 1) * pageSize;
    const post = await postModel
      .find({ userId , view : false })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .exec();
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
  }
}

// search for accounts
export async function searchAccount(req, res) {
  try {
    const { data } = req.query;
    if (!data) return res.json({ userInfo: "No matching userName found" });

    const regexPattern = new RegExp(`^${data}`, "i");
    const AccountData = await userModel.find({
      username: { $regex: regexPattern },
    });

    res.status(200).json({ userInfo: AccountData });
  } catch (error) {
    console.log(error);
  }
}

//search for tags
export async function searchTags(req, res) {
  try {
    const { data } = req.query;
    if (!data) return res.json({ userInfo: "No matching userName found" });

    const regexPattern = new RegExp(`^${data}`, "i");
    const AccountData = await businessModel
      .find({
        tags: { $regex: regexPattern },
      })
      .populate("userId");

    res.status(200).json({ userInfo: AccountData });
  } catch (error) {
    console.log(error);
  }
}

//search for business
export async function searchBusiness(req, res) {
  try {
    const { data } = req.query;
    if (!data) return res.json({ userInfo: "No matching userName found" });

    const regexPattern = new RegExp(`^${data}`, "i");
    const AccountData = await businessModel
      .find({
        bussinessName: { $regex: regexPattern },
      })
      .populate("userId");

    res.status(200).json({ userInfo: AccountData });
  } catch (error) {
    console.log(error);
  }
}

export async function reportPost(req, res) {
  try {
    const userId = getUserId(req.headers.authorization);
    const { reportMsg, _id } = req.body;

    const post = await postModel.findById(_id);

    const newReport = {
      userId: userId.Token,
      message: reportMsg,
    };

    post.reports.push(newReport);
    const updatedPost = await post.save();
    if (updatedPost) res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function manageLike(req, res) {
  try {
    const { postId } = req.body;

    const userId = getUserId(req.headers.authorization);

    const post = await postModel.findById(postId);

    const userLiked = post.likes.includes(userId.Token);

    if (userLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId.Token);
    } else {
      post.likes.push(userId.Token);
    }
    await post.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function addComment(req, res) {
  try {
    const userId = getUserId(req.headers.authorization);
    const { message, itemId } = req.body;

    const newComment = new commentModel({
      postId: itemId,
      userId: userId.Token,
      message,
    });
    await newComment.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function getComment(req, res) {
  try {
    const { id, currentPage } = req.params;
    const pageSize = 3;

    const comment = await commentModel
      .find({ postId: id })
      .populate("userId")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    res.json({ comment });
  } catch (error) {
    console.log(error);
  }
}

export async function mangeFollow(req, res) {
  try {
    const { followingId } = req.body;
    const userId = getUserId(req.headers.authorization);
    const followerId = userId.Token;

    const existingUser = await FollowModel.findOne({ followerId, followingId });

    if (existingUser) {
      await FollowModel.findByIdAndDelete(existingUser._id);
      res.json({ success: false, message: "Follow" });
    } else {
      const newFollow = new FollowModel({ followerId, followingId });
      await newFollow.save();
      res.json({ success: true, message: "Unfollow" });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function countFollow(id) {
  try {
    const followerCount = await FollowModel.countDocuments({ followingId: id });
    const followingCount = await FollowModel.countDocuments({ followerId: id });
    return { followerCount, followingCount };
  } catch (error) {
    console.log(error);
  }
}

export async function getFollowersData(req, res) {
  try {
    const { id, currentPage } = req.params;
    const page = 5;
    const followers = await FollowModel.find({ followerId: id })
      .populate("followingId")
      .skip((currentPage - 1) * page)
      .limit(page)
      .exec();

    res.status(200).json(followers);
  } catch (error) {
    console.log(error);
  }
}

export async function getFollowingData(req, res) {
  try {
    const { id, currentPage } = req.params;
    const page = 5;

    const following = await FollowModel.find({ followingId: id })
      .populate("followerId")
      .skip((currentPage - 1) * page)
      .limit(page)
      .exec();
    res.status(200).json(following);
  } catch (error) {
    console.log(error);
  }
}

function generateUniqueRoomId(senderId, receiverId) {
  const sortedIds = [senderId, receiverId].sort();
  const combinedIds = sortedIds.join("");
  const roomId = crypto.createHash("sha1").update(combinedIds).digest("hex");
  return roomId;
}

export async function sendMessage(data) {
  try {
    const { message, userId, conversationId, Token } = data;
    // const token = getUserId(Token);

    const newMessage = {
      senderId: userId,
      message,
    };

    let existingRoom = await messageModel.findOne({ conversationId });

    if (!existingRoom) {
      existingRoom = new messageModel({
        conversationId,
        participants: [userId],
        messages: [newMessage],
      });
    } else {
      existingRoom.messages.push(newMessage);
    }

    await existingRoom.save();
  } catch (error) {
    console.log(error);
  }
}

export async function getMessage(req, res) {
  try {
    const recipientId = req.params.id;

    const userId = getUserId(req.headers.authorization);
    let conversationId = generateUniqueRoomId(userId.Token, recipientId);

    const existingRoom = await messageModel.findOne({ conversationId });

    if (existingRoom) {           
      conversationId = existingRoom.conversationId;
      return res.status(200).json({ existingRoom, conversationId });
    } else {
      return res.status(200).json({ existingRoom, conversationId });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getChatUsers(req, res) {
  try {
    const header = getUserId(req.headers.authorization);
    const userId = header.Token;

    const yourUserId = new mongoose.Types.ObjectId(userId); // Replace with your actual user ID

    const formattedChats = await messageModel.aggregate([
      {
        $match: {
          participants: { $in: [yourUserId] }, // Filter documents that include your user ID in participants array
        },
      },
      {
        $project: {
          participants: 1, // Include the participants field
          updatedAt: 1, // Include the updatedAt field
        },
      },
      {
        $unwind: "$participants", // Unwind the participants array
      },
      {
        $match: {
          participants: { $ne: yourUserId }, // Exclude your user ID
        },
      },
      {
        $lookup: {
          from: "users", // Assuming 'users' is the name of the User collection
          localField: "participants",
          foreignField: "_id",
          as: "participantDetails",
        },
      },
      {
        $project: {
          "participantDetails.password": 0,
          "participantDetails.phone": 0,
          "participantDetails.email": 0,
          "participantDetails.activeStatus": 0,
          "participantDetails.createdAt": 0,
          "participantDetails.updatedAt": 0,
          "participantDetails.__v": 0,
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
    ]);

    res.status(200).json({ formattedChats });
  } catch (error) {
    console.log(error);
  }
}
