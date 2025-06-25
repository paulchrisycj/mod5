const express = require("express")
const app = express()
const User = require("./model/User")
const bcrypt = require("bcrypt")
const verifyToken = require("./middleware/auth")
const mongoose = require("mongoose")

mongoose
    .connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.3")
    .then(() => { console.log("Connected to MongoDB") })
    .catch(() => { console.log("Failed to connect to MongoDB") })

app.use(express.json())

app.post("/register", async (req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 10)
    const user = new User({ email: req.body.email, password: hashed })
    await user.save()
    res.status(201).send("User registered")
})

app.post("/login", async (req,res) => {
    const user = await User.findOne({ email: req.body.email })
    console.log(user)
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch)
        return res.status(401).send("Invalid credentials")
    const jwt = require("jsonwebtoken")
    const token = jwt.sign({ id: user._id }, "w4h9V7xYpL3QmZ8tR2fN6jBvXsC1KdPzF0qW8eYtUaMvJrXn", { expiresIn: "3h" })
    res.json({ token })
})

app.get("/dashboard", verifyToken, (req, res) => {
    res.send("Reached protected content!")
})

app.get("/profile", verifyToken, (req, res) => {
    res.send(`Welcome, ${req.user.id}`)
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})