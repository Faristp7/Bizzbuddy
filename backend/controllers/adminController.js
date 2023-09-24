import userModel from "../models/userModel.js";

export async function getUser(req, res) {
  try {
    const userData = await userModel.find();
    return res.json({ userData });
  } catch (error) {
    console.log(error);
  }
}

export async function blockAndUnBlockUser(req, res) {
  try {
    const { id, activeStatus } = req.body;
    if (activeStatus) {
      const status = await userModel.updateOne(
        { _id: id },
        { $set: { activeStatus: false } }
      );
      if (status) return res.status(200).json({ success: true });
    } else {
      const status = await userModel.updateOne(
        { _id: id },
        { $set: { activeStatus: true } }
      );
      if (status) return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log(error);
  }
}
