const prisma = require("../config/database");

const ChallengeService = {
    async createChallenge(data) {
        return prisma.challenge.create({ data });
    },

    async getAllChallenges(filters) {
        const { search, sortBy = "createdAt", order = "desc", page = 1, limit = 10 } = filters;
        const skip = (page - 1) * limit;

        const where = search
            ? { title: { contains: search, mode: "insensitive" } }
            : {};

        return prisma.challenge.findMany({
            where,
            orderBy: { [sortBy]: order },
            skip: parseInt(skip),
            take: parseInt(limit),
        });
    },

    async getChallengeById(id) {
        return prisma.challenge.findUnique({ where: { id } });
    },

    async updateChallenge(id, data) {
        return prisma.challenge.update({
            where: { id },
            data,
        });
    },

    async deleteChallenge(id) {
        return prisma.challenge.delete({ where: { id } });
    }
};

module.exports = ChallengeService;
