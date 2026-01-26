const ChallengeService = require("../services/challengeService");

const ChallengeController = {
    async create(req, res) {
        try {
            const challenge = await ChallengeService.createChallenge(req.body);
            res.status(201).json(challenge);
        } catch (error) {
            res.status(500).json({ message: "Error creating challenge", error });
        }
    },

    async getAll(req, res) {
        try {
            const filters = {
                search: req.query.search || "",
                sortBy: req.query.sortBy || "createdAt",
                order: req.query.order || "desc",
                page: req.query.page || 1,
                limit: req.query.limit || 10,
            };

            const challenges = await ChallengeService.getAllChallenges(filters);
            res.status(200).json(challenges);
        } catch (error) {
            res.status(500).json({ message: "Error fetching challenges", error });
        }
    },

    async getById(req, res) {
        try {
            const challenge = await ChallengeService.getChallengeById(req.params.id);
            if (!challenge) {
                return res.status(404).json({ message: "Challenge not found" });
            }
            res.status(200).json(challenge);
        } catch (error) {
            res.status(500).json({ message: "Error fetching challenge", error });
        }
    },

    async update(req, res) {
        try {
            const updatedChallenge = await ChallengeService.updateChallenge(req.params.id, req.body);
            res.status(200).json(updatedChallenge);
        } catch (error) {
            res.status(500).json({ message: "Error updating challenge", error });
        }
    },

    async delete(req, res) {
        try {
            await ChallengeService.deleteChallenge(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting challenge", error });
        }
    }
};

module.exports = ChallengeController;
