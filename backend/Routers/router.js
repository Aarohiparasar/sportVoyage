import express from "express";
import { SignUp, Login,Logout} from "../controllers/authController.js";
import {AuthMiddleware} from '../middleware/authMiddleware.js'
import { User } from "../Models/userModel.js";

const router = express.Router();

router.post("/register", SignUp);
router.post('/login', Login)
router.post('/logout', Logout)

router.get("/me", AuthMiddleware, async (req, res) => {
  
    try {
        
        const user=await User.findById(req.user?._id).select("-password")
        res.status(200).json(user)
    } catch (error) {
        console.log(`Error in getMe controller:${error.message}`);
        res.status(500).json({ error: `internal server error ${error.message}` });
    }

});


export default router;