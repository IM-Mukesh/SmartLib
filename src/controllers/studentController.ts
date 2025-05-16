import { Request, Response } from "express";
import Student from "../models/Student";

// Create student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, joinDate, status } = req.body;

    const student = await Student.create({
      name,
      email,
      phone,
      joinDate,
      status,
      admin: req.user?.id,
    });

    res.status(201).json({ message: "Student created", student });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get all students for logged-in admin
export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find({ admin: req.user?.id });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get a single student by ID (only if owned by admin)
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findOne({
      _id: req.params.id,
      admin: req.user?.id,
    });
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Update student (only by owner admin)
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const updated = await Student.findOneAndUpdate(
      { _id: req.params.id, admin: req.user?.id },
      req.body,
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ message: "Student not found or unauthorized" });
      return;
    }
    res.json({ message: "Student updated", student: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Delete student (only by owner admin)
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const deleted = await Student.findOneAndDelete({
      _id: req.params.id,
      admin: req.user?.id,
    });
    if (!deleted) {
      res.status(404).json({ message: "Student not found or unauthorized" });
      return;
    }
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
