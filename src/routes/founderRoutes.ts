import express from "express";
import {
  registerFounder,
  loginFounder,
} from "../controllers/founderController";

const router = express.Router();

router.post("/register", registerFounder);
router.post("/login", loginFounder);

export default router;
