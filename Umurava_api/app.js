const express = require("express");
const cors = require("cors");
const challengeRoutes = require("./routes/challengeRoute");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/challenges", challengeRoutes);
app.use(errorHandler);

module.exports = app;
