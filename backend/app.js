const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error.js");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Route Management
const products = require("./routes/productRoute");
const users = require("./routes/userRoute.js");
const orders = require("./routes/orderRoute.js");

app.use("/api/v1", products);
app.use("/api/v1", users);
app.use("/api/v1", orders);
// Error Handling Using Middleware

app.use(errorMiddleware);

module.exports = app;
