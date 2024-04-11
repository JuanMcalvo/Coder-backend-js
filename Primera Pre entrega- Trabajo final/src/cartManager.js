import fs from 'fs'
import { ProductManager } from './ProductManager';


export class cart {
    constructor() {
        this.id = Math.round(Math.random() * 1000);
        this.path = './src/carts.json';
        this.products = [];
        this.createCart();

    }
    async createCart() {

        try {
            const cartData = {
                id: this.id,
                products: this.products
            };
            let file = await fs.promises.writeFile(this.path, JSON.stringify(cartData, null, 2), 'utf-8');
            return file;
        } catch (err) {
            console.log(err)
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
            const file = await this.getCart();
            const cart = file.id === id;
            console.log(file.id)
            if (cart) {
                return file.products; // Devuelve el carrito completo
            } else {
                console.log("Carrito no encontrado");
                return null; // Devuelve null si el carrito no se encuentra
            }
        } catch (err) {
            console.error("Error al obtener el carrito por ID:", err);
            throw err; // Lanza el error para que sea manejado por el controlador
        }
    }
    async updateCart(cartData) {
        try {
            const cartJson = JSON.stringify(cartData, null, 2);
            await fs.promises.writeFile(this.path, cartJson, 'utf-8');
            return cartData
        } catch (error) {
            console.error('Error al actualizar el carrito:', error);

        }
    }

    async addProductCart(idc, idp) {
        try {
            const file = await this.getCart();
            if (file.id === idc) {
                const exist = ProductManager.getCartById(idp);
                if (exist) {
                    const indexp = file.products.findIndex(e => e.id === idp);
                    if (indexp !== -1) {
                        file.products[indexp].quantity++;
                    } else {
                        file.products.push({ id: idp, quantity: 1 });
                    }
                    this.updateCart(file)
                } else {
                    console.log('El producto no existe.');
                }
            } else {
                console.log('El carrito no existe.');
            }
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
        }
    }
}