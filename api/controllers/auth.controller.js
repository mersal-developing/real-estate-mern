import User from "../models/user.model.js";
import bycryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return next(errorHandler(404, "User not found!"));

    const validPassword = bycryptjs.compareSync(
      password,
      existingUser.password
    );

    if (!validPassword) return next(errorHandler(401, "wrong credentials!"));
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...resUserData } = existingUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(resUserData);
  } catch (error) {
    next(error);
  }
};
