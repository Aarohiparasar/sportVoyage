import express from "express";
import { createTripInquiry } from "../controllers/tripController.js";

const router = express.Router();

router.post("/plan-trip", createTripInquiry);

export default router;
