const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.route("/allProduct").get(productController.product);
router.route("/filter").post(productController.filteredProducts);
router.route("/productDetails/:id").get(productController.productDetail);

module.exports = router;

