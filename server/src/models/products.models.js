const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  brand: {
    type: String,
  },
  model: {
    type: String,
  },
  price: {
    type: Number,
  },
  color: {
    type: String,
  },
  type: {
    type: String,
  },
  image: {
    type: String,
  },
  headline: {
    type: String,
  },
  description: {
    type: String,
  },
  review: {
    type: String,
  },
  in_stock: {
    type: Boolean,
  },
  images: {
    type: Array,
  },
});

const Products = mongoose.model("Products", productSchema);
module.exports = Products;
