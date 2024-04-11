import { Router } from "express";
import  {cart} from '../cartManager.js';
const router = Router();

router.get('/', async(req,res)=>{

   /*  res.send('soy un carrito'); */
const carts = new cart;
    res.send(carts);
})

router.get("/:cid", async (req, res) => {
    const {cid} = req.params;
    
  });


export default router;