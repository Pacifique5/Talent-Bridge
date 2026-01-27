const express = require("express");
const cors = require("cors");
const challengeRoutes = require("./routes/challengeRoute");
const authRoutes = require("./routes/authRoute");
const contactRoutes = require("./routes/contactRoute");
const userRoutes = require("./routes/userRoute");
const communityRoutes = require("./routes/communityRoute");
const dashboardRoutes = require("./routes/dashboardRoute");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/challenges", challengeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/user", userRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorHandler);

module.exports = app;
