import fs from "fs";

export class ProductManager {
  constructor(ubicacion) {
    this.id = Math.round(Math.random() * 1000);
    this.misProductos = [];
    this.Path = ubicacion;
    
  }

  async addProduct(product) {
    try {
      if (
        !product.title ||
        !product.description ||
        !product.code ||
        !product.price ||
        !product.stock ||
        !product.category
      ) {
        console.log(`Faltan campos obligatorios`);
        return;
      }
      if (this.misProductos.some((e) => e.code === product.code)) {
        console.error("El código del producto ya existe");
        return;
      }
      const thumbnails = product.thumbnails ? [product.thumbnails] : [];
      console.log(product.thumbnails);
      this.misProductos.push({
        title: product.title,
        description: product.description,
        code: product.code,
        price: product.price,
        status: true, // Status es true por defecto
        stock: product.stock,
        category: product.category,
        thumbnails: thumbnails,
        id: this.id ++,
      });
      await fs.promises.writeFile( this.Path, JSON.stringify(this.misProductos), "utf-8"   );
      console.log("producto agregado correctamente");
    } catch (error) {
      console.log(error);
    }
  }
  async getProducts() {
    try {
      const file = await fs.promises.readFile(this.Path, "utf-8");
      return JSON.parse(file);
    } catch (error) {
      console.log(`no se puede leer archivo o  esta vacio`, this.misProductos);
    }
  }
  async getProductById(id) {
    try {
      const file = JSON.parse(await fs.promises.readFile(this.Path, "utf-8"));
      const product = file.find((e) => e.id === id);
      if (product) {
        return product;
      } else {
        console.log("Producto no encontrado");
      }
    } catch (err) {
      console.error("Error al obtener el producto por ID:", err);
    }
  }

  async updateProduct(id, objet) {
    //se paso un id y un objeto pero se pudo hacer solo con un objeto completo y dsp destructurarlo
    try {
      let file = JSON.parse(await fs.promises.readFile(this.Path, "utf-8"));
      const index = file.findIndex((e) => e.id === id); // devuelve -1 sino lo encuentra.
      if (index !== -1) {
        file[index] = {
          description: objet.description,
          title: objet.title,
          price: objet.price,
          thumbnails: objet.thumbnails, 
          code: objet.code,
          category: objet.category,
          stock: objet.stock,
          id: file[index].id, // Mantenemos el ID original
        };
        console.log("actualizado correctamente");
        await fs.promises.writeFile(this.Path, JSON.stringify(file), "utf-8");
        return file[index];
      } else {
        console.log("no se encontro producto");
      }
    } catch (err) {
      console.error("Error al obtener el producto por ID:", err);
    }
  }
  async deleteProduct(id) {
    try {
      const file = await this.getProducts();
      const index = file.findIndex((e) => e.id === id);
      if (index !== -1) {
        file.splice(index, 1);
        await fs.promises.writeFile(this.Path, JSON.stringify(file), "utf-8");
        console.log("eliminado correctamente");
        return (true);
      } else {
        console.log("no se encontro producto");
      }
    } catch (error) {
      console.log(`error al borrar producto ${error}`);
    }
  }
}
