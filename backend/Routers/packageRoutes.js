import express from "express";
import {AuthMiddleware} from '../middleware/authMiddleware.js'

import {
  addPackage,
  getAllPackages,
  getSinglePackage,
} from "../controllers/packageController.js";

const router = express.Router();

router.post("/addPackages",AuthMiddleware, addPackage);
router.get("/getPackages",AuthMiddleware, getAllPackages);
router.get("/:id",AuthMiddleware, getSinglePackage);

export default router;
