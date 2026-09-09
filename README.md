# Inventory & Order Management API

A simple REST API built with **Node.js, Express.js, and MySQL** for managing products, stock, and customer orders.

## Setup

### 1. Clone Repository

```bash
git clone https://github.com/Abhishek-Singh25/Inventory_and_Order_Management
cd Inventory_and_Order_Management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=inventory
```

### 4. Setup Database

Open MySQL Workbench and run the SQL commands from:

```text
database.sql
```

This will create the database and required tables.

### 5. Run the Server

```bash
npm start
```

For development:

```bash
npm run dev
```

Server:

```text
http://localhost:5000
```

## Testing

Use **Postman** to test the API endpoints.

## API Endpoints

### Products

| Method | Endpoint                  | Description      |
| ------ | ------------------------- | ---------------- |
| POST   | `/api/products`           | Create product   |
| GET    | `/api/products`           | Get all products |
| GET    | `/api/products/:id`       | Get product by ID|
| PUT    | `/api/products/:id`       | Update product   |
| PUT    | `/api/products/:id/stock` | Add stock        |
| DELETE | `/api/products/:id`       | Delete product   |

### Orders

| Method | Endpoint                 | Description    |
| ------ | ------------------------ | -------------- |
| POST   | `/api/orders`            | Create order   |
| GET    | `/api/orders`            | Get all orders |
| GET    | `/api/orders/:id`        | Get order by ID|
| PUT    | `/api/orders/:id/cancel` | Cancel order   |

## Features

* Create, view, update, and delete products
* Add and manage product stock
* Create customer orders with one or more products
* Automatically reduce product stock when an order is created
* View all orders and individual order details
* Cancel an order
* Automatically restore product stock when an order is cancelled

## Tech Stack

* Node.js
* Express.js
* MySQL
