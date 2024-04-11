import { Router } from "express";
const router = Router();
import { ProductManager } from "../ProductManager.js";
const productManager = new ProductManager("src/products.json");

router.get("/", async (req, res) => {
  // lista todos los products con limit
  try {
    let products = await productManager.getProducts();
    let limit = req.query.limit ? parseInt(req.query.limit) : null;
    if (limit !== null && !isNaN(limit)) {
      products = products.slice(0, limit);
      return res.send(products);
    }
    res.send(products);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    let pid = parseInt(req.params.pid);
    let product = await productManager.getProductById(pid);
    res.send(product);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  // Agrega un nuevo campo
  const product = req.body;
  await productManager.addProduct(product);
  res.status(200).send({ status: "success", payload: product });
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = req.body;
  let productNew = await productManager.updateProduct(parseInt(pid), product);
  if (productNew) {
    res.status(200).send({ status: "success", payload: productNew });
  } else {
    res.status(400).send({ status: "Error, no encontrado"})
  }
  
});
router.delete("/:pid", async (req, res) => {
 const {pid} = req.params;
 let deleteProduct = await productManager.deleteProduct(parseInt(pid));
 if (deleteProduct)
{ res.status(200).send({status: "success", })} else {
 res.status(400).send({ status: "Error, no encontrado"})

}

});


export default router;
