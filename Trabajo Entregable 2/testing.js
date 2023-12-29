// Importa la clase ProductManager
const ProductManager = require('./main.js');

// Crea una instancia de ProductManager
const productManager = new ProductManager('./productos.json');

// Llama a getProducts recién creada la instancia, debe devolver un arreglo vacío []
console.log("Productos al principio:", productManager.getProducts());

// Llama a addProduct con los campos especificados
let productoAgregado = productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
});

// Llama a getProducts nuevamente, esta vez debe aparecer el producto recién agregado
console.log("Productos después de agregar uno:", productManager.getProducts());

// Llama a getProductById y verifica que devuelva el producto con el id especificado
const productId = productoAgregado ? productoAgregado.id : null;  // Cambia el id según el generado automáticamente

const productById = productManager.getProductById(productId);
console.log("Producto encontrado por id:", productById);

// Llama a updateProduct para cambiar un campo del producto
const updatedProduct = {
    title: "Producto Actualizado",
    description: "Descripción actualizada",
    price: 250,
    thumbnail: "Nueva imagen",
    code: "xyz789",
    stock: 30
};

productManager.updateProduct(productId, updatedProduct);

// Llama a getProducts para verificar la actualización
console.log("Productos después de la actualización:", productManager.getProducts());

// Llama a deleteProduct para eliminar el producto
productManager.deleteProduct(productId);

// Llama a getProducts después de la eliminación
console.log("Productos después de la eliminación:", productManager.getProducts());