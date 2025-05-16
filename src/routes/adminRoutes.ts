import express from "express";
import { createAdmin, loginAdmin } from "../controllers/adminController";
import { verifyFounder } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create", verifyFounder, createAdmin);
// Admin login
router.post("/login", loginAdmin);
export default router;
