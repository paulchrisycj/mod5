const express = require("express")
const app = express()
const productRoutes = require("./routes/products")
const taskRoutes = require("./routes/tasks")
const logger = require("./middleware/logger")

const mongoose = require("mongoose")

mongoose
    .connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.3")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("Connection error:", err));

app.use(logger)
app.use(express.json())

app.use("/products", productRoutes)
app.use("/tasks", taskRoutes)

app.listen(3000, () => console.log("Server running"))
