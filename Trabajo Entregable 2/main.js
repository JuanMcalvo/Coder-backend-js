class ProductManager {
    constructor() {
        this.products = [];
        this.productId = Math.floor(Math.random() * 1000)
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

        product.id = this.productId++;
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

// testing
console.log(`<----Arreglo vacio---->`);
console.log(productManager.getProducts());
console.log(`<----PRIMER PRODUCTO---->`);
productManager.addProduct(producto1);
console.log(productManager.getProducts());
console.log(`<----ERROR DE CODIGO---->`);
productManager.addProduct(producto2);
console.log(`<----ARREGLO 1 SOLO PRODUCT---->`);
console.log(productManager.getProducts());
console.log(`<----PRODUCTO QUE NO EXISTE---->`);
console.log(productManager.getProductById(3));
console.log(`----PRODUCTO QUE EXISTE----`);
console.log(productManager.getProductById(1));