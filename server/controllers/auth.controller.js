const User = require("../models/auth.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json("Please fill all the fields.");
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).json("User is already registered.");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const access_token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200).json({
      success: true,
      access_token,
      user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json("Please fill all the fields");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("User is not registered");
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json("Invalid Credentials");
    }

    if (user && comparePassword) {
      const access_token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE }
      );

      res.status(200).json({
        success: true,
        access_token,
        user,
      });
    } else {
      return res.status(401).json("User is not exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { register, login };
