import express from "express";
import { addToPlan, getMyPlan } from "../controllers/myPlanController.js";
import {AuthMiddleware} from '../middleware/authMiddleware.js'


const router = express.Router();

router.post("/addMyPlan",AuthMiddleware, addToPlan);
router.get("/",AuthMiddleware, getMyPlan);

export default router;
