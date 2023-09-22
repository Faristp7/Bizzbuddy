import userModel from "../models/userModel.js";
import adminModel from '../models/adminModel.js'
import jwt from 'jsonwebtoken'

export async function signUp(req, res) {
  try {
    const { username, email, phone, password } = req.body;
    if (username === "" || email === "" || password === "") {
      return res.status(400).json({ message: "fill all the fields" });
    } else if (!/^\d{10}$/.test(phone)) {
      return res.json({ message: "phone number must be 10 digits" });
    } else {
      const alreadyExistUser = await userModel.findOne({ email });
      if (alreadyExistUser) {
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
  const secrectKey = 'bizzbuddy'
  try {
    const {email , given_name ,picture} = req.body
    const alreadyExistUser = await userModel.findOne({email})
    if(alreadyExistUser){
      const user = {
        id: alreadyExistUser.id,
      }

      jwt.sign({user} , secrectKey , {expiresIn: '1h'} , (err, token) => {
        if(err){
          return res.json({message : "Failed to generate token"})
        }
        res.json({token})
      })
    }
    else{
      const userSchema = new userModel({
        username : given_name,
        email : email,
        profileImage : picture
      })
      await userSchema.save()
    }
  } catch (error) {
    console.log(error);
  }
}

export async function saveUser(req,res){
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
}


export async function adminLogin(req,res){
  try {
    const {username , password} = req.body
    console.log(req.body, "espanval");
  } catch (error) {
    console.log(error);
  }
}