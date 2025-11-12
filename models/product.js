const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1661669037600-615a42b0a829?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D": v
    },
    price: {
        type: Number,
        required: true,
    },
});


const Product = mongoose.model("Product", productSchema);
module.exports = Product;
