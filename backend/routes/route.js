import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";

export const register = async (req, res) => {
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

    // console.log("Account created successfully: ", response);

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
};

export const login = async (req, res) => {
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
        success: "Login Successful",
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
};
