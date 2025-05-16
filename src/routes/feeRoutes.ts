import express from "express";
import {
  createOrUpdateFeeRecord,
  getFeeRecordsByStudent,
  deleteFeeRecord,
} from "../controllers/feeController";
import { verifyAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(verifyAdmin);

router.post("/", createOrUpdateFeeRecord);
router.get("/student/:studentId", getFeeRecordsByStudent);
router.delete("/:id", deleteFeeRecord);

export default router;
