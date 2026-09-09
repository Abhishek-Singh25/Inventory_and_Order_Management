const express = require("express");

const {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder);

router.get("/", getOrders);

router.get("/:id", getOrderById);

router.put("/:id/cancel", cancelOrder);


module.exports = router;