import  fs from 'fs'


export class cart {
  constructor() {
    this.id = Math.round(Math.random() * 1000);
    this.path = './src/carts.json';
    this.products = [];
    this.createCart();

  }
  async  createCart(){

    try {
        const cartData = {
            id: this.id,
            products: this.products
          };
        let file = await fs.promises.writeFile(this.path, JSON.stringify(cartData,null,2), 'utf-8');
        return file;
    } catch(err){
        console.log (err)
    }
}
  async getCart() {
    try {
      const file = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(file);
    } catch (error) {
      console.log(`no se puede leer archivo `);
    }
  }

  async getCartById(id) {
    try {
      const file = await this.getCart ();
      const cart = file.find((e) => e.id === id);
      if (cart) {
        return (cart.product);
      } else {
        console.log("Producto no encontrado");
      }
    } catch (err) {
      console.error("Error al obtener el producto por ID:", err);
    }
  }
}
