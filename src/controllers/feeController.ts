import { Request, Response } from "express";
import FeeRecord from "../models/FeeRecord";
import Student from "../models/Student";

// Create or update fee record for a student for a specific month and year
export const createOrUpdateFeeRecord = async (req: Request, res: Response) => {
  try {
    const { studentId, month, year, amount, isPaid, paidAt } = req.body;

    // Verify student belongs to logged-in admin
    const student = await Student.findOne({
      _id: studentId,
      admin: req.user?.id,
    });
    if (!student) {
      res.status(404).json({ message: "Student not found or unauthorized" });
      return;
    }

    let feeRecord = await FeeRecord.findOne({
      student: studentId,
      month,
      year,
    });

    if (feeRecord) {
      // Update existing record
      feeRecord.amount = amount;
      feeRecord.isPaid = isPaid;
      feeRecord.paidAt = isPaid ? paidAt || new Date() : undefined;
    } else {
      // Create new record
      feeRecord = new FeeRecord({
        student: studentId,
        month,
        year,
        amount,
        isPaid,
        paidAt: isPaid ? paidAt || new Date() : undefined,
      });
    }

    await feeRecord.save();
    res.status(200).json({ message: "Fee record saved", feeRecord });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get all fee records for a student
export const getFeeRecordsByStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;

    // Verify student belongs to logged-in admin
    const student = await Student.findOne({
      _id: studentId,
      admin: req.user?.id,
    });
    if (!student) {
      res.status(404).json({ message: "Student not found or unauthorized" });
      return;
    }

    const feeRecords = await FeeRecord.find({ student: studentId }).sort({
      year: -1,
      month: -1,
    });
    res.json(feeRecords);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Delete fee record by id (optional)
export const deleteFeeRecord = async (req: Request, res: Response) => {
  try {
    const feeRecordId = req.params.id;

    const feeRecord = await FeeRecord.findById(feeRecordId);
    if (!feeRecord) {
      res.status(404).json({ message: "Fee record not found" });
      return;
    }

    // Verify student belongs to logged-in admin
    const student = await Student.findOne({
      _id: feeRecord.student,
      admin: req.user?.id,
    });
    if (!student) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    await FeeRecord.deleteOne({ _id: feeRecordId });

    res.json({ message: "Fee record deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
