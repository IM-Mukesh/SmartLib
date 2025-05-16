import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Founder from "../models/Founder";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Signup Founder
export const registerFounder = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existing = await Founder.findOne({ email });
    if (existing) {
      res.status(400).json({ message: "Founder already exists" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const founder = await Founder.create({ email, password: hashed });

    res.status(201).json({ message: "Founder registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Login Founder
export const loginFounder = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const founder = await Founder.findOne({ email });

    if (!founder) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, founder.password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    console.log("founder is", founder, JWT_SECRET);

    const token = jwt.sign({ id: founder._id, role: "founder" }, JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("token is", token);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
