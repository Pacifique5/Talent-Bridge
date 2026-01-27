const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log("🔒 Auth middleware: No token provided");
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
            console.log("✅ Auth middleware: Token verified for user:", decoded.email);
            
            // Get user from database
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    createdAt: true
                }
            });

            if (!user) {
                console.log("❌ Auth middleware: User not found:", decoded.userId);
                return res.status(401).json({ message: "Invalid token. User not found." });
            }

            req.user = user;
            next();
        } catch (jwtError) {
            console.log("❌ Auth middleware: Invalid token:", jwtError.message);
            return res.status(401).json({ message: "Invalid token." });
        }
    } catch (error) {
        console.error("❌ Auth middleware error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = authMiddleware;