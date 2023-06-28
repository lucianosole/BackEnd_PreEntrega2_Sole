const { resolve } = require("dns/promises");
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

    const productExists = products.some((product) => product.id === id);
    if (productExists) {
      const updateProduct = products.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            title: product.title,
            description: product.description,
            code: product.code,
            thumbnail: product.thumbnail,
            price: product.price,
          };
        }
        return p;
      });

      await fs.writeFile(this.filePath, JSON.stringify(updateProduct, null, 2));
    } else {
      console.log(`El ID: ${id} no existe en la lista de productos.`);
      return;
    }
  }

  async deleteProduct(id) {
    const data = await fs.readFile(this.filePath, "utf-8");
    const products = JSON.parse(data);

    const productExists = products.some((product) => product.id === id);
    if (!productExists) {
      console.log(`El ID: ${id} no existe en la lista de productos.`);
      return;
    }

    const idDeleted = { id: id };
    const newProducts = products.filter((product) => product.id !== id);
    newProducts.push(idDeleted);

    await fs.writeFile(this.filePath, JSON.stringify(newProducts, null, 2));
  }
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
// manager.deleteProduct(10);

// PARA ACTUALIZAR UN PRODUCTO POR ID: (ID, PRODUCTO)
// manager.updateProduct(1000, {
//   title: "prueba de cambio1",
//   description: "Pegamento universal",
//   price: 60,
//   thumbnail: "imagen3.jpg",
//   code: "000AD",
//   stock: 8,
// });
