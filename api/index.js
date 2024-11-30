import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT;

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
