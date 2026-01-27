const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class DashboardController {
    static async getDashboardStats(req, res) {
        try {
            console.log("📊 Dashboard stats requested by user:", req.user.email);

            // Get total challenges
            const totalChallenges = await prisma.challenge.count();

            // Get user's challenges (if they created any)
            const userChallenges = await prisma.challenge.count({
                where: { createdBy: req.user.id }
            });

            // Get recent challenges
            const recentChallenges = await prisma.challenge.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    difficulty: true,
                    duration: true,
                    createdAt: true
                }
            });

            const stats = {
                totalChallenges,
                userChallenges,
                completedChallenges: 0, // TODO: Implement when we have submissions
                ongoingChallenges: totalChallenges,
                recentChallenges
            };

            console.log("✅ Dashboard stats retrieved successfully:", stats);
            res.json(stats);
        } catch (error) {
            console.error("❌ Dashboard stats error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getUserProfile(req, res) {
        try {
            console.log("👤 User profile requested:", req.user.email);

            const user = {
                id: req.user.id,
                email: req.user.email,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                fullName: `${req.user.firstName} ${req.user.lastName}`,
                joinedAt: req.user.createdAt
            };

            res.json(user);
        } catch (error) {
            console.error("❌ User profile error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = DashboardController;