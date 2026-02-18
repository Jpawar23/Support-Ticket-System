const users = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createuser = async (req, res) => {
  try {
    const { email, password, role, name } = req.body;

    // check if user exists
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await users.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      status: true,
      message: "User created succesfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createuser, getuser };
