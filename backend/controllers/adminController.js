import userModel from "../models/userModel.js";

export async function getUser (req,res){
    try {
        const userData = await userModel.find()
        return res.json({userData})
    } catch (error) {
        console.log(error);
    }
}