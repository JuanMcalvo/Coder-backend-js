const fs = require('fs');

class ProductManager {
  constructor(ubicacion) {
    this.id = Math.round(Math.random() * 1000);
    this.misProductos = [];
    this.Path = ubicacion;
  }


  async addProduct(product) {
    try {
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.log(`erro campo vacio`);
        return
      }
      if (this.misProductos.some(e => e.code === product.code)) {

        console.error("El código del producto ya existe");
        return;
      }
      this.misProductos.push({
        Title: product.Title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        id: this.id
      });
      product.id++;
      await fs.promises.writeFile(this.Path, JSON.stringify(this.misProductos), 'utf-8')
      console.log('producto agregado correctamente')
    }
    catch (error) {
      console.log(error)
    }
  }
  async getProducts() {
    try {
      const file = await fs.promises.readFile(this.Path, 'utf-8')
      console.log(file);
    } catch (error) {
      console.log(`no se puede leer archivo o el carrito esta vacio`, this.misProductos)
    }
  }
  async getProductById(id) {
    try {
      const file = JSON.parse(await fs.promises.readFile(this.Path, 'utf-8'))
      const product = file.find(e => e.id === id);
      if (product) {
        console.log(product);
      } else {
        console.log('Producto no encontrado');
      }
    } catch (err) {
      console.error('Error al obtener el producto por ID:', err);
    }
  }

  async updateProduct(id, objet) {  //se paso un id y un objeto pero se pudo hacer solo con un objeto completo y dsp destructurarlo
    try {
      let file = JSON.parse(await fs.promises.readFile(this.Path, 'utf-8'))
      const index = file.findIndex(e => e.id === id); // devuelve -1 sino lo encuentra.
      if (index !== -1) {
        file[index] = {
          description: objet.description,
          title: objet.title,
          price: objet.price,
          thumbnail: objet.thumbnail,
          code: objet.code,
          stock: objet.stock,
          id: file[index].id // Mantenemos el ID original
        };
        await fs.promises.writeFile(this.Path, JSON.stringify(file), 'utf-8');
      }
      console.log ('actualizado correctamente'+ file)
    } catch (err) {
      console.error('Error al obtener el producto por ID:', err);
    }
  }
  async deleteProduct(id) {
    try {
      const file = JSON.parse(await fs.promises.readFile(this.Path, 'utf-8'))
      const index = file.findIndex(e => e.id === id)
      if (index !== -1) {
        file.splice(index, 1)
        await fs.promises.writeFile(this.Path, JSON.stringify(file), 'utf-8')
        console.log('eliminado correctamente')
      } else {
        console.log('no se encontro producto');
      }
    }
    catch (error) {
      console.log(`error al borrar producto ${error}`)
    }
  }
}

/// -------------------- TESTING -------------
const producto1 = {
  title: "Producto 2",
  description: "Descripción del Producto 1",
  price: 10,
  thumbnail: "ruta/imagen1.jpg",
  code: "001",
  stock: 5
};
const producto2 = {
  title: "Producto 2",
  description: "Descripción del Producto 2",
  price: 10,
  thumbnail: "ruta/imagen1.jpg",
  code: "001",
  stock: 5
}; 
// ProductManager = new ProductManager('./productos.json');
// ProductManager.getProducts(); 
// ProductManager.addProduct(producto1);
// ProductManager.addProduct(producto2);
// ProductManager.getProducts(); 
// ProductManager.getProductById(171); 
// ProductManager.updateProduct(171,producto2); 
//ProductManager.deleteProduct(884);
//ProductManager.getProducts(); 