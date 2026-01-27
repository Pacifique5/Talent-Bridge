const express = require("express");
const ChallengeController = require("../controllers/challengeController");
const challengeValidationRules = require("../validations/challengeValidation");
const validate = require("../middleware/validateMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public route - anyone can view challenges
router.get("/", ChallengeController.getAll);
router.get("/:id", ChallengeController.getById);

// Protected routes - require authentication
router.post("/", authMiddleware, challengeValidationRules, validate, ChallengeController.create);
router.put("/:id", authMiddleware, challengeValidationRules, validate, ChallengeController.update);
router.delete("/:id", authMiddleware, ChallengeController.delete);

module.exports = router;
