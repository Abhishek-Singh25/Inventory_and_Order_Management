const express=require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const productRoutes=require("./routes/productRoutes");
const orderRoutes=require("./routes/orderRoutes");

const app=express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Inventory & Order Management API is running");
});

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});