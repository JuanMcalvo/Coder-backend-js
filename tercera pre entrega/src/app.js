const express = require('express');
const app = express();
const port = 3000;
const ProductManager = require('./ProductManager');
const productManager = new ProductManager('./productos.json');

app.get('/products', async (req, res) => {
    try {
        let productos = await productManager.getProducts();
        let limit = req.query.limit ? parseInt(req.query.limit) : null;
        if (limit !== null && !isNaN(limit)) {
            productos = JSON.parse(productos);
            productos = productos.slice(0, limit);
            productos = JSON.stringify(productos);
            res.send(`hola ${productos}`)
        }
        res.send(`hola ${productos}`)
    } catch (err) {
        res.send(err)
    }

})

app.get('/products/:pid', async(req, res)=>{
    try{
        let pid = parseInt(req.params.pid);
        console.log(`producto es  ${pid}`)        
        let producto = await productManager.getProductById(pid)
        producto= JSON.stringify(producto);
    res.send (`el producto es ${producto}`)
    }
    catch (err){
        res.send(err)
    }
    
    
})

app.listen(port, () => {
    console.log(`escuchando en el puerto ${port}`)
})