import fs from "node:fs/promises";
import express from "express";
import path from "node:path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/userModel.js";
import { createServer as createViteServer } from "vite";
import config from "./config.js";
import cors from "cors";
const { MONGODB_URL } = config;

mongoose
  .connect(MONGODB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.error("error connecting:", error.message);
  });

async function createServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(cors());
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);

  app.post("/api/register", async (req, res) => {
    const { fullName, userName, email, password: hashedPassword } = req.body;

    const password = await bcrypt.hash(hashedPassword, 10);

    if (
      hashedPassword.length < 6 ||
      !/[A-Z]/.test(hashedPassword) ||
      !/\d/.test(hashedPassword) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(hashedPassword)
    ) {
      return res.status(400).json({
        status: "error",
        error:
          "Password must be at least 6, contain uppercase letter, number, special character.",
      });
    }
    try {
      const response = await User.create({
        fullName,
        userName,
        email,
        password,
      });
      console.log("Account created successfully: ", response);

      res.status(201).json({
        status: "ok",
        success: "Account created successfully",
      });
    } catch (error) {
      const existingUser = await User.find({
        email,
        userName,
      }).lean();
      if (existingUser) {
        return res.status(400).json({
          status: "error",
          error: "Email/Username already exist",
        });
      }
      console.error("Error creating user:", error);

      res.status(500).json({
        status: "error",
        error: "Internal Server Error",
      });
    }
  });
  app.post("/api/login", async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName }).lean();
    if (!user) {
      return res.status(400).json({
        status: "error",
        error: "User does not exist",
      });
    }
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          config.JWT_SECRET
        );
        return res.json({
          status: "ok",
          data: token,
          success: 'Login Successful'
        });
      } else {
        return res.status(400).json({
          status: "error",
          error: "Incorrect Password",
        });
      }
    }
    res.status(500).json({
      status: "error",
      error: "Internal Server Error",
    });
  });
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      status: "error",
      error: "Internal Server Error",
    });
  });
  app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
  });
}

createServer();
