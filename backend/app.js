const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());

// Route Management
const products = require("./routes/productRoute");

app.use("/api/v1", products);

// Error Handling Using Middleware

app.use(errorMiddleware);

module.exports = app;
