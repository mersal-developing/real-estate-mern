import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

app.use("/api/auth/", authRoute);
app.use("/api/user/", userRoute);

//middle ware for handling errors
app.use((err, req, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
