import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
import businessModel from "../models/bussinessModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
        const userId = alreadyExistUser.id;
        jwt.sign({ userId }, secrectKey, { expiresIn: "6h" }, (err, token) => {
          if (err) {
            return res.json({ message: "Failed to generate token" });
          }
          res.json({ token });
        });
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
      const userId = userSchema.id;
      jwt.sign({ userId }, secrectKey, { expiresIn: "6h" }, (err, token) => {
        if (err) {
          return res.json({ message: "failed to generate token", err: true });
        }
        res.json({token})
      });
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
      if (!userId) return res.json({ message: "credential not matching" });
      role = "user";
    }
    if (userId) {
      const token = jwt.sign({ userId }, secrectKey, {
        expiresIn: "6h",
      });
      res.json({ token, role });
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
        if (verifed) return isUserValid.id;
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
    const token = req.headers.authorization.replace("Bearer", "").trim();
    const decodedToken = jwt.verify(token, process.env.SECRECTKEY); //extracting token

    const bussinesSchema = new businessModel({
      bussinessName: businessName,
      Description: description,
      userId: decodedToken.userId,
      bannerImage: url,
      phone,
      email,
      location,
      tags,
    });
    const businessCollection = await bussinesSchema.save();
    if (businessCollection) {
      await userModel.findOneAndUpdate(
        { _id: decodedToken.userId },
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

    const userDetails = await userModel
      .findOne({ _id: decodedToken.userId })
      .populate("bussinessId");

    res.json(userDetails);
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserData(req, res) {
  try {
    const { values, url } = req.body;

    const id = getUserId(req.headers.authorization);
    await userModel.updateOne(
      { _id: id.userId },
      {
        $set: {
          email: values.email,
          phone: values.phone,
          username: values.username,
          ...(url ? { profileImage: url } : {}),
        },
      }
    );
    res.json({ success: true });
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
