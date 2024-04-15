import fs from 'fs'


export class cart {
    constructor() {
        this.id = Math.round(Math.random() * 1000);
        this.path = './src/carts.json';
        this.products = [];
        this.createCart();
    }
    async createCart() {
        try {
            let cart;
            try {
                const fileContent = await fs.promises.readFile(this.path, 'utf-8');
                cart = JSON.parse(fileContent);
                cart.push({
                    id: this.id++,
                    products: this.products
                });
                await fs.promises.writeFile(this.path, JSON.stringify(cart, null, 2), 'utf-8');
                console.log('Archivo de carrito encontrado y cargado correctamente.');
            } catch (error) {
                console.log('No se encontró un archivo de carrito. Creando uno nuevo...');
                cart = [{
                    id: this.id++,
                    products: this.products
                }];
                await fs.promises.writeFile(this.path, JSON.stringify(cart, null, 2), 'utf-8');
            }

            return cart;
        } catch (error) {
            console.error('Error al crear o cargar el carrito:', error);
            return null;
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
            const cart = file.find(e => id === id);
            if (cart) {
                return cart; // Devuelve el carrito completo
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
            const index = file.findIndex(e => e.id === idc);

            if (index !== -1) {                
                const indexp = file[index].products.findIndex(e => e.id === idp);

                if (indexp !== -1) {
                    file[index].products[indexp].quantity++;
                } else {
                    file[index].products.push({ id: idp, quantity: 1 });
                }
                await fs.promises.writeFile(this.path,JSON.stringify(file),'utf-8')
            } else {
                console.log('El carrito no existe.');
            }
        } catch (err) {
            console.log('Error al agregar producto:', err);
        }
    }
}