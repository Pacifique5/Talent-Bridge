const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
    console.log("🔍 Validation middleware: Checking request body:", req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error("❌ Validation errors:", errors.array());
        return res.status(400).json({ 
            message: "Validation failed",
            errors: errors.array() 
        });
    }
    
    console.log("✅ Validation passed");
    next();
};

module.exports = validate;
