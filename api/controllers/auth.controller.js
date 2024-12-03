import User from "../models/user.model.js";
import bycryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(email)) {
    return next(errorHandler(res, 400, "Invalid email format"));
  }

  if (!username || username.length < 4) {
    return next(
      errorHandler(res, 400, "Username must be at least 4 characters long")
    );
  }

  if (!password || password.length < 6) {
    return next(
      errorHandler(res, 400, "Password must be at least 6 characters long")
    );
  }

  const hashedPassWord = bycryptjs.hashSync(password, 10);

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser)
      return next(errorHandler(res, 400, "Username or email already exists"));

    const newUser = new User({ username, email, password: hashedPassWord });
    await newUser.save();

    handleSignInSuccess(res, newUser, true);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return next(errorHandler(res, 401, "User not found"));

    const validPassword = bycryptjs.compareSync(
      password,
      existingUser.password
    );

    if (!validPassword)
      return next(errorHandler(res, 401, "wrong credentials"));

    handleSignInSuccess(res, existingUser);
  } catch (error) {
    next(error);
  }
};

export const oauth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      handleSignInSuccess(res, user);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bycryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();
      handleSignInSuccess(res, newUser, true);
    }
  } catch (error) {
    next(error);
  }
};

const handleSignInSuccess = (res, user, isSignUp = false) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const { password: pass, ...resUserData } = user._doc;
  if (isSignUp) {
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ message: "User created successfully", user: resUserData });
  } else {
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(resUserData);
  }
};
