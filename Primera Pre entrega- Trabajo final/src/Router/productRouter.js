import {Router} from "express";
const router = Router ();
import {ProductManager} from '../ProductManager.js';
const productManager = new ProductManager('../productos.json');

router.get('/', async (req, res) => { // lista todos los productos con limit
    try {
        let productos = await productManager.getProducts();
        let limit = req.query.limit ? parseInt(req.query.limit) : null;
        if (limit !== null && !isNaN(limit)) {
            productos = JSON.parse(productos);
            productos = productos.slice(0, limit);
            productos = JSON.stringify(productos);
            return res.send(` ${productos}`)
        }
        console.log (productos)
        res.send(`hola ${productos}`)
    } catch (err) {
        res.send(err)
    }

})
/* 
router.post('/',async(req, res)=>{          // Agrega un nuevo campo

});

router.put('/',async(req, res)=>{
    
});
router.delete('/',async(req, res)=>{
    
}); */
/* 
Router.get('/products/:pid', async(req, res)=>{
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
 */


export default router;