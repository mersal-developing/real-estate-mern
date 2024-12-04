import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bycryptjs from "bcryptjs";

// UPDATE a user by ID
export const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  if (req.user.id !== userId)
    return next(errorHandler(res, 401, "Unauthorized"));

  const { username, email, avatar } = req.body;

  if (req.body.password) {
    req.body.password = bycryptjs.hashSync(req.body.password, 10);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username,
          email,
          password: req.body.password,
          avatar,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return next(errorHandler(res, 404, "User not found"));
    }

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({ message: "User updated successfully", rest });
  } catch (error) {
    console.log(error);
    next(errorHandler(res, 500, "Error updating user"));
  }
};
