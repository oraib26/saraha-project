import userModel from "../../../models/User.model.js";

export const deleteUser = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.deleteOne({ _id: req.userId });
  if (user.deletedCount > 0) {
    return res.json({ message: "success", user });
  }
  return res.json({ message: "invalid data" });
};

export const profile =async (req, res, next) => {
  const user = await userModel.findById(req.user._id)
  return res.json ({message:"profile",user})
};
