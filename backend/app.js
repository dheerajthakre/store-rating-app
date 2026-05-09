const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Test route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/stores", storeRoutes);

app.use("/api/ratings", ratingRoutes);

module.exports = app;