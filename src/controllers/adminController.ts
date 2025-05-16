import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Admin from "../models/Admin";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) {
      res.status(400).json({ message: "Admin already exists" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      name,
      email,
      password: hashed,
      createdBy: req.user?.id,
    });

    res
      .status(201)
      .json({ message: "Admin created successfully", adminId: admin._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Admin Login
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ id: admin._id, role: "admin" }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Protected test route for admins
export const adminDashboard = (req: Request, res: Response) => {
  res.json({ message: "Welcome Admin!", userId: req.user?.id });
};
