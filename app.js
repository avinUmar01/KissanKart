const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/toFarm";

main().then(() =>{
    console.log("connected to DB");
}).catch((err) =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req,res)=>{
    res.send("Hi I am root");
})

app.get("/products", async (req,res) =>{
    const allProducts = await Product.find({});
    res.render("./products/index.ejs", {allProducts});
})

app.get("/products/new", (req,res) =>{
    res.render("./products/new.ejs");
})


app.get("/products/:id", async(req,res) =>{
    let {id} = req.params;
    const product = await Product.findById(id);
    res.render("./products/show.ejs", {product});
});

app.get("/products/:id/edit", async (req,res) =>{
    let {id} = req.params;
    const product = await Product.findById(id);
    res.render("./products/edit.ejs", {product});
})

app.put("/products/:id", async (req,res) =>{
    let {id} = req.params;
    await Product.findByIdAndUpdate(id, {...req.body.product});
    res.redirect("/products");
})

app.delete("/products/:id", async(req,res) =>{
    let {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
})


// Delete Route
app.post("/products", async(req,res) =>{
    const newProduct = new Product(req.body.product);
    await newProduct.save();
    res.redirect("/products");
});

app.listen(8080, () => {
    console.log("server is listening to server 8080");
});