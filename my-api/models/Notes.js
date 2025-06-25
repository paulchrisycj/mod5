const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date() }
})

module.exports = mongoose.model("Notes", notesSchema)