import { Router } from "express";
import  {cart} from '../cartManager.js';
const router = Router();
const carts = new cart();


router.get('/', async(req,res)=>{
  try {
    let cart= await carts.createCart()
    res.send(cart);
  }
  catch (err){
    console.log (err)
  }

});

router.get("/:cid", async (req, res) => {
    const {cid} = req.params;
    let products = await carts.getCartById(parseInt(cid));
    res.send (products);
  });

router.post ('/:cid/product/:pid', async(req, res)=>{
  try {    
  const {cid} = req.params;
  const {pid} = req.params;
  let cids = parseint(cid);
  let pids = parseint(pid);
  await carts.addProductCart(cids, pids)
  res.send('Agregado correctamente') 

}catch (errr) {
  res.send (errr)
}} )

export default router;