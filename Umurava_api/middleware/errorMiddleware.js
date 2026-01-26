const errorHandler = (err, _req, res, _next) => {
    res.status(500).json({ message: err.message || "Internal Server Error" });
};

module.exports = errorHandler;
