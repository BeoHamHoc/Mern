require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post")
// Tìm lỗi env
// const test = require('dotenv').config()
// console.log(test)

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-lern.dvcuwmd.mongodb.net/?retryWrites=true&w=majority&appName=Mern-lern`
    );
    console.log(process.env.DB_USERNAME);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();
const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
