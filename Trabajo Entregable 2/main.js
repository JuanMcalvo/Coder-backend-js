const fs = require('fs').promises;

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.productId = Math.floor(Math.random() * 1000)
        this.loadProducts(); // Cargar productos existentes al instanciar la clase
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {

                this.productId = Math.max(...this.products.map(p => p.id)) + 1;
            }
        } catch (error) {
            console.error('Error al cargar productos:', error.message);
        }
    }


    async saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            await fs.writeFile(this.path, data, 'utf8');
        } catch (error) {
            console.error('Error al guardar productos:', error.message);
        }
    }

    async addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios");
            return null;
        }

        // Asignar un nuevo ID autoincrementable
        product.id = this.productId++;
        this.products.push(product);

        try {
            // Guardar productos después de agregar
            await this.saveProducts();
            return product; // Devuelve el producto agregado
        } catch (error) {
            console.error('Error al guardar productos:', error.message);
            return null;
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        return product ? product : (console.error("Producto no encontrado"), null);
    }

    async updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            // Mantener el mismo ID
            updatedProduct.id = id;
            this.products[index] = { ...this.products[index], ...updatedProduct };
            await this.saveProducts();
            return true;
        }
        return false;
    }

    async deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            await this.saveProducts();
            return true;
        }
        return false;
    }
}

module.exports = ProductManager;

const productManager = new ProductManager();
