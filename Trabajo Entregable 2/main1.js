class ProductManager {
    constructor() {
        this.products = [];
    }

    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        if (this.products.some(p => p.code === product.code)) {
            console.error("El código del producto ya existe");
            return;
        }

        product.id = this.generateUniqueId();
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        return product ? product : (console.error("Not found"), null);
    }
}

// Ejemplo de uso
const productManager = new ProductManager();

const producto1 = {
    title: "Producto 1",
    description: "Descripción del Producto 1",
    price: 10,
    thumbnail: "ruta/imagen1.jpg",
    code: "001",
    stock: 5
};

const producto2 = {
    title: "Producto 2",
    description: "Descripción del Producto 2",
    price: 20,
    thumbnail: "ruta/imagen2.jpg",
    code: "002",
    stock: 10
};

productManager.addProduct(producto1);
productManager.addProduct(producto2);

console.log(productManager.getProducts());
