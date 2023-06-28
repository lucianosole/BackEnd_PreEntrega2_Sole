console.log("Inicio de programa");
const fs = require("fs/promises");
const path = require("path");

class ProductManager {
  constructor(path) {
    this.filePath = path;
  }

  async addProduct(product) {
    const data = await fs.readFile(this.filePath, "utf-8");
    const products = JSON.parse(data);
    const lastId = products[products.length - 1]?.id || 0;

    products.push({ ...product, id: lastId + 1 });

    await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
  }

  async getProducts() {
    const data = await fs.readFile(this.filePath, "utf-8");
    const products = JSON.parse(data);

    return products;
  }

  async getProductById(id) {
    const data = await fs.readFile(this.filePath, "utf-8");
    const products = JSON.parse(data);
    const product = products.find((product) => product.id === id);
    return product;
  }

  async updateProduct(id, product) {
    const data = await fs.readFile(this.filePath, "utf-8");
    const products = JSON.parse(data);
  }

  // updateProduct(id, product) {
  //   // ✓ Debe tener un método updateProduct, el
  //   // cual debe recibir el id del producto a
  //   // actualizar, así también como el campo a
  //   // actualizar (puede ser el objeto completo,
  //   // como en una DB), y debe actualizar el
  //   // producto que tenga ese id en el archivo.
  // }

  async deleteProduct(id) {
    const data = await fs.readFile(this.filePath, "utf-8");
    const products = JSON.parse(data);

    // Filtrar el arreglo de productos y mantener solo los IDs diferentes al ID especificado
    const idDeleted = { id: id };
    const newProducts = products.filter((product) => product.id !== id);
    newProducts.push(idDeleted);

    await fs.writeFile(this.filePath, JSON.stringify(newProducts, null, 2));
  }

  // deleteProduct(id) {
  //   // ✓ Debe tener un método deleteProduct, el
  //   // cual debe recibir un id y debe eliminar el
  //   // producto que tenga ese id en el archivo.
  //   // NO DEBE BORRARSE SU ID

  // }
}

const manager = new ProductManager(path.join(__dirname, "products.json"));

// manager.addProduct({
//   title: "Martillo",
//   description: "Hammer Nro1",
//   price: 1500,
//   thumbnail: "imagen.jpg",
//   code: "ABC123",
//   stock: 12,
// });

// manager.addProduct({
//   title: "Sierra",
//   description: "Sierra Nro2",
//   price: 180,
//   thumbnail: "imagen2.jpg",
//   code: "123AV",
//   stock: 9,
// });

// manager.addProduct({
//   title: "Super Glue",
//   description: "Pegamento universal",
//   price: 60,
//   thumbnail: "imagen3.jpg",
//   code: "000AD",
//   stock: 8,
// });

// OBTENER TODOS LOS PRODUCTOS:
// manager.getProducts().then((products) => console.log(products));

// OBTENER PRODUCTO POR ID
// manager.getProductById(3).then((product) => console.log(product));

// PARA BORRAR UN PRODUCTO, MANTENINEDO ID:
// manager.deleteProduct(9);

console.log("Fin de programa");
