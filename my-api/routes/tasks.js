const express = require("express")
const toa = require("../middleware/toa")
const router = express.Router()
const Task = require('../models/Task')
router.use(toa)
router.use(express.json())

const tasks = [
    {
        id: 1,
        name: "Change bedsheets"
    },
    {
        id: 2,
        name: "Mop the floor"
    },
    {
        id: 3,
        name: "Make food"
    }
]

router.get("/", async (req, res) => {
    res.json(await Task.find())
})

router.post("/", async (req, res) => {
    const task = new Task(req.body)
    const saved = await task.save()
    res.status(201).json(saved)
})

router.put("/:id", async (req, res) => {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
})

router.delete("/:id", async (req, res) => {
    const deleted = await Task.findByIdAndDelete(req.params.id)
    res.json(await Task.find())
})

module.exports = router