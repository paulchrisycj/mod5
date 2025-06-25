const mongoose = require("mongoose");

const express = require("express");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.3")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));
