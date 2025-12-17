import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "user already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch {
    res.status(500).json({ message: "server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) res.status(400).json({ message: "invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) res.status(400).json({ message: "invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, //this will be changed later to true
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successfull",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch {
    res.status(500).json({ message: "server error" });
  }
};

export const getMe = async (req, res) => {};
