const express = require("express")
const Product = require("../models/Product")
const router = express.Router()

const products = [
    {
        id: 1,
        name: "Shampoo"
    },
    {
        id: 2,
        name: "Snacks"
    },
    {
        id: 3,
        name: "Instant noodles"
    }
]

router.use((req, res, next) => {
    console.log("Product Route Accessed")
    console.log(`${req.method} - ${req.url}`)
    next()
})

router.get("/", async (req, res) => {
    res.json(await Product.find())
})

router.post("/", async (req, res) => {
    const newProduct = new Product(req.body)
    const saved = await newProduct.save()
    res.status(201).json(saved);
})

// UPDATE
 router.put("/:id", async (req, res) => {
   const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
   res.json(updated);
 });
 
 // DELETE
 router.delete("/:id", async (req, res) => {
   await Product.findByIdAndDelete(req.params.id);
   res.sendStatus(204);
 });

module.exports = router