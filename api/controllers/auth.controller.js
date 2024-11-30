import User from "../models/user.model.js";
import bycryptjs from "bcryptjs";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  const hashedPassWord = bycryptjs.hashSync(password, 10);

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const newUser = new User({ username, email, password: hashedPassWord });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};
