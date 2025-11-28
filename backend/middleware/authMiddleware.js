import jwt from 'jsonwebtoken';
import { User } from "../Models/userModel.js";

export const AuthMiddleware = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "Unauthorized: No token provided" 
      });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user by ID from the token
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(404).json({ 
          success: false,
          message: "User not found" 
        });
      }

      // Attach user to the request object
      req.user = user;
      next();
      
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          success: false,
          message: "Session expired, please log in again" 
        });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          success: false,
          message: "Invalid token" 
        });
      }
      throw error; // Re-throw other errors
    }

  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};