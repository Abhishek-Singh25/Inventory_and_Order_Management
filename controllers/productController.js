const db=require("../db");

const createProduct=async(req, res)=>{
    try{
        const {name, price, stock}=req.body;

        if(!name || price===undefined || stock===undefined){
            return res.status(400).json({message: "name, price and stock are required"});
        }
        const [result]=await db.query(
            "INSERT INTO products (name, price, stock) VALUES(?,?,?)", [name, price, stock]
        );
        res.status(201).json({message:"product created successfully", productId: result.insertId});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const getProducts=async(req,res)=>{
    try{
        const [products]=await db.query(
            "SELECT * FROM products ORDER BY id DESC"
        );
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const getProductById=async(req,res)=>{
    try{
        const {id}=req.params;
        const [products]=await db.query(
            "SELECT * FROM products Where id=?", [id]
        );
        if(products.length===0){
            return res.status(404).json({message:"product not found"});
        }
        res.status(200).json(products[0]);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const updateProduct=async(req,res)=>{
    try{
        const {id}=req.params;
        const {name, price, stock}=req.body;
        const [result]=await db.query(
            `UPDATE products SET name=?, price=?, stock=? WHERE id=?`, [name,price,stock,id]
        );
        if(result.affectedRows===0){
            return res.status(404).json({message:"product not found"});
        }
        res.status(200).json({message:"product updated successfully"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const addStock=async(req,res)=>{
    try{
        const {id}=req.params;
        const {quantity}=req.body;

        if(!quantity || quantity<0){
            return res.status(400).json({message:"valid quantity is required"});
        }
        const [result]=await db.query(
            "UPDATE products SET stock=stock+? WHERE id=?",[quantity,id]
        );
        if(result.affectedRows===0){
            return res.status(404).json({message:"product not found"});
        }
        res.status(200).json({message:"stock added successfully"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const deleteProduct=async(req,res)=>{
    try{
        const {id}=req.params;

        const [result]=await db.query(
            "DELETE FROM products WHERE id=?", [id]
        );
        if(result.affectedRows===0){
            return res.status(404).json({message:"product not found"});
        }
        res.status(200).json({message:"product deleted successfully"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

module.exports={
    createProduct, getProducts, getProductById, updateProduct, addStock, deleteProduct,
};