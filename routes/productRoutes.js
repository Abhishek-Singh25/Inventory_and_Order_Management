const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  addStock,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.put("/:id/stock", addStock);

router.delete("/:id", deleteProduct);


module.exports = router;