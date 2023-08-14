const express = require("express");
const errorMiddleware = require("./middleware/error.js");

const app = express();

app.use(express.json());

// Route Management
const products = require("./routes/productRoute");
const users = require("./routes/userRoute.js");

app.use("/api/v1", products);
app.use("/api/v1", users);
// Error Handling Using Middleware

app.use(errorMiddleware);

module.exports = app;
