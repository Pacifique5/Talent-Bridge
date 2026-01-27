const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class AuthController {
    static async signup(req, res) {
        try {
            console.log("📝 Signup request received:", req.body);
            const { email, password, firstName, lastName } = req.body;

            // Check if user already exists
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                console.log("❌ User already exists:", email);
                return res.status(400).json({ message: "User already exists" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create user
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName
                }
            });

            console.log("✅ User created successfully:", user.email);

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET || "your-secret-key",
                { expiresIn: "7d" }
            );

            res.status(201).json({
                message: "User created successfully",
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
        } catch (error) {
            console.error("❌ Signup error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async login(req, res) {
        try {
            console.log("🔐 Login request received:", req.body.email);
            const { email, password } = req.body;

            // Find user
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                console.log("❌ User not found:", email);
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // Check password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                console.log("❌ Invalid password for:", email);
                return res.status(401).json({ message: "Invalid credentials" });
            }

            console.log("✅ Login successful:", email);

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET || "your-secret-key",
                { expiresIn: "7d" }
            );

            res.json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
        } catch (error) {
            console.error("❌ Login error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async logout(req, res) {
        res.json({ message: "Logout successful" });
    }

    static async getMe(req, res) {
        try {
            // This would require auth middleware to get user from token
            res.json({ message: "Get current user - requires auth middleware" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = AuthController;