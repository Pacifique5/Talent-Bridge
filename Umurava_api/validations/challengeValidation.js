const {body} = require("express-validator");

const challengeValidationRules = [
    body("title")
        .notEmpty().withMessage("Title is required")
        .isString().withMessage("Title must be a string")
        .isLength({ min: 3, max: 200 }).withMessage("Title must be between 3 and 200 characters"),

    body("description")
        .notEmpty().withMessage("Description is required")
        .isString().withMessage("Description must be a string")
        .isLength({ min: 10, max: 2000 }).withMessage("Description must be between 10 and 2000 characters"),

    body("difficulty")
        .notEmpty().withMessage("Difficulty is required")
        .isIn(["easy", "medium", "hard"]).withMessage("Difficulty must be 'easy', 'medium', or 'hard'"),

    body("duration")
        .notEmpty().withMessage("Duration is required")
        .isInt({ min: 1, max: 365 }).withMessage("Duration must be a positive integer between 1 and 365 days")
];

module.exports = challengeValidationRules;
