const express = require("express");
const ChallengeController = require("../controllers/challengeController");
const challengeValidationRules = require("../validations/challengeValidation");
const validate = require("../middleware/validateMiddleware");

const router = express.Router();

router.get("/", ChallengeController.getAll);
router.post("/", challengeValidationRules, validate, ChallengeController.create);
router.get("/:id", ChallengeController.getById);
router.put("/:id", challengeValidationRules, validate, ChallengeController.update);
router.delete("/:id", ChallengeController.delete);

module.exports = router;
