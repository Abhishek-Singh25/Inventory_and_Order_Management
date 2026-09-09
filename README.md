# Inventory & Order Management API

A simple REST API built with **Node.js, Express.js, and MySQL** for managing products, stock, and customer orders.

## Setup

### 1. Clone Repository

```bash
git clone <your-repository-url>
cd inventory-order-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file using `.env.example`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=inventory_db
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
| GET    | `/api/products/:id`       | Get product      |
| PUT    | `/api/products/:id`       | Update product   |
| PUT    | `/api/products/:id/stock` | Add stock        |
| DELETE | `/api/products/:id`       | Delete product   |

### Orders

| Method | Endpoint                 | Description    |
| ------ | ------------------------ | -------------- |
| POST   | `/api/orders`            | Create order   |
| GET    | `/api/orders`            | Get all orders |
| GET    | `/api/orders/:id`        | Get order      |
| PUT    | `/api/orders/:id/cancel` | Cancel order   |

## Features

* Product management
* Stock management
* Multiple products per order
* Automatic stock reduction
* Order cancellation
* Automatic stock restoration

## Tech Stack

* Node.js
* Express.js
* MySQL
* mysql2
* dotenv
