// server/middleware/protectRoute.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
        console.log(decoded);
        const userId = decoded.id;
        console.log(decoded.id);
        // It MUST look for 'decoded.userId'
        const user = await User.findById(decoded?.id);
        // const user = await User.findById("68ce4e64efddd5cb0c80415e");
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;