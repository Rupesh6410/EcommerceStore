import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
    let token;
    
    // Check for token in cookies first, then Authorization header
    token = req.cookies.jwt;
    
    // If no cookie token, check Authorization header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (token) {
        try {
            // Verify JWT token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Find user and attach to request
            req.user = await User.findById(decoded.userId).select("-password");
            
            // Check if user still exists
            if (!req.user) {
                res.status(401);
                throw new Error("User not found - token invalid");
            }
            
            next();
        } catch (error) {
            console.error("Token verification error:", error.message);
            res.status(401);
            throw new Error("Not authorized - token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized - no token provided");
    }
});

const authorizeAdmin = (req, res, next) => {
    // Check if user exists and is admin
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403); // 403 Forbidden is more appropriate than 401
        throw new Error("Not authorized as admin");
    }
};

export { authenticate, authorizeAdmin };