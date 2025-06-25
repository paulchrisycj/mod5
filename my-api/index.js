const express = require("express")
const app = express();

function logger(req, res, next){
    console.log(`${req.method} - ${req.url}`)
    req.body = JSON.stringify(req.body)
    next()
}
app.use(logger)

app.use(express.json())

const sampleProducts = [
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
    }]

app.get("/", (req, res) => {
    res.send("Welcome to my API!");
})
app.get("/hello", (req, res) => {
    res.send("Hello!");
})
//Two ways, 1
// app.get("/products", (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify(sampleProducts));
// })

//Second way, 2
app.get("/products", (req, res) => {
    res.json(sampleProducts);
})

app.get("/products/search", (req, res) => {
    const query = req.query.name
    console.log("In search query")
    const products = sampleProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    res.json(products);
})

app.get("/products/:pid", (req, res) => {
    const productId = req.params.pid
    const product = sampleProducts.find(product => product.id == productId)
    res.json(product);
})


app.get("/user/:uid", (req, res) => {
    const userId = req.params.uid
    res.send(`Hello! Your user ID is ${userId}`);
})

app.post("/message", (req, res) => {
    const message = req.body.text;
    res.send(`You said: ${message}`)
})

app.post("/products", (req, res) => {
    const {productName} = req.body;
    lastId = sampleProducts[sampleProducts.length - 1].id
    newProduct = { id: lastId + 1, name: productName}
    sampleProducts.push(newProduct)
    res.send(`Product saved!`)
})

app.put("/products/:pid", (req, res) => {
    const {productName} = req.body;
    const pid = req.params.pid
    const productIndex = sampleProducts.findIndex(product => product.id == pid)
    // console.log(sampleProducts[productIndex])
    sampleProducts[productIndex].name = productName
    // sampleProducts.push(newProduct)
    res.send(`Product saved!`)
})

// Create the /inspect/:resource route
app.post('/inspect/:resource', (req, res) => {
    const response = {
        params: req.params, // Get route parameters
        query: req.query,   // Get query parameters
        body: req.body      // Get request body
    };
    
    res.json(response); // Send the response as JSON
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})