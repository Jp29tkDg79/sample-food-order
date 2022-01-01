import mongoose from "mongoose";

import app from "./app";

const PORT = process.env.PORT || 5000;

const start = async () => {
  if (
    !process.env.MONGO_URI ||
    !process.env.MONGO_CLIENT ||
    !process.env.MONGO_CLIENT_PASSWORD
  ) {
    throw new Error("MongoDB env config setting must be defined!");
  }

  if (!process.env.JWT_KEY || !process.env.JWT_KEY_NAME) {
    throw new Error("JWT config setting must be defined!");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      user: process.env.MONGO_CLIENT,
      pass: process.env.MONGO_CLIENT_PASSWORD,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }

  app.listen(PORT, () => {
    console.log("Listening on port no " + PORT);
  });
};

start();
