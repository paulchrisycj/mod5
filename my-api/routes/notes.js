const express = require("express")
const toa = require("../middleware/toa")
const router = express.Router()
const Notes = require('../models/Notes')
router.use(toa)
router.use(express.json())

router.post("/", async (req, res) => {
    const note = new Notes(req.body)
    const saved = await note.save()
    res.json(saved)
})

router.get("/", async (req, res) => {
    res.json(await Notes.find())
})

router.put("/:id", async (req, res) => {
    const updated = await Notes.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
})

router.put("/:id", async (req, res) => {
    const updated = Notes.findByIdAndDelete(req.params.id)
    res.json(await Notes.find())
})
