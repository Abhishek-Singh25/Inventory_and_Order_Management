const db = require("../db");

const createOrder = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { customer_name, products } = req.body;

    if (!customer_name || !products || products.length === 0) {
      return res.status(400).json({
        message: "Customer name and products are required",
      });
    }

    await connection.beginTransaction();

    
    const [orderResult] = await connection.query(
      "INSERT INTO orders (customer_name) VALUES (?)",
      [customer_name]
    );

    const orderId = orderResult.insertId;


    
    for (const item of products) {
      const { product_id, quantity } = item;

      
      const [product] = await connection.query(
        "SELECT * FROM products WHERE id = ?",
        [product_id]
      );

      if (product.length === 0) {
        throw new Error(`Product with ID ${product_id} not found`);
      }

      
      if (product[0].stock < quantity) {
        throw new Error(
          `Insufficient stock for product: ${product[0].name}`
        );
      }

      
      await connection.query(
        `INSERT INTO order_items 
        (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)`,
        [
          orderId,
          product_id,
          quantity,
          product[0].price,
        ]
      );

      
      await connection.query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [quantity, product_id]
      );
    }

    await connection.commit();

    res.status(201).json({
      message: "Order created successfully",
      orderId,
    });

  } catch (error) {

    await connection.rollback();

    res.status(400).json({
      message: error.message,
    });

  } finally {

    connection.release();

  }
};


const getOrders = async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT 
        orders.id AS order_id,
        orders.customer_name,
        orders.status,
        orders.created_at,

        order_items.product_id,
        products.name AS product_name,
        order_items.quantity,
        order_items.price

      FROM orders

      LEFT JOIN order_items
        ON orders.id = order_items.order_id

      LEFT JOIN products
        ON products.id = order_items.product_id

      ORDER BY orders.id DESC
    `);

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const [order] = await db.query(
      `SELECT 
        orders.id AS order_id,
        orders.customer_name,
        orders.status,
        orders.created_at,

        order_items.product_id,
        products.name AS product_name,
        order_items.quantity,
        order_items.price

      FROM orders

      LEFT JOIN order_items
        ON orders.id = order_items.order_id

      LEFT JOIN products
        ON products.id = order_items.product_id

      WHERE orders.id = ?`,
      [id]
    );

    if (order.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


const cancelOrder = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { id } = req.params;

    await connection.beginTransaction();


    const [orders] = await connection.query(
      "SELECT * FROM orders WHERE id = ?",
      [id]
    );

    if (orders.length === 0) {
      throw new Error("Order not found");
    }


    if (orders[0].status === "CANCELLED") {
      throw new Error("Order already cancelled");
    }


    const [items] = await connection.query(
      "SELECT * FROM order_items WHERE order_id = ?",
      [id]
    );


    for (const item of items) {

      await connection.query(
        "UPDATE products SET stock = stock + ? WHERE id = ?",
        [
          item.quantity,
          item.product_id,
        ]
      );

    }

    await connection.query(
      `UPDATE orders 
       SET status = 'CANCELLED'
       WHERE id = ?`,
      [id]
    );


    await connection.commit();

    res.status(200).json({
      message: "Order cancelled and stock returned successfully",
    });

  } catch (error) {

    await connection.rollback();

    res.status(400).json({
      message: error.message,
    });

  } finally {

    connection.release();

  }
};


module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
};