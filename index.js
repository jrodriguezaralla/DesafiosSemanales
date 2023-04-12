class ProductManager {
  static id = 0;
  constructor() {
    this.products = [];
  }
  addProducts(title, description, price, thumbnail, code, stock) {
    let newProduct = {
      id: ProductManager.id,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    let codes = this.products.map((cod) => cod.code);
    if (!codes.includes(code)) {
      this.products.push(newProduct);
      ProductManager.id += 1;
    } else {
      return console.log('Error: product already exist');
    }
  }

  getProducts() {
    return this.products;
  }

  getProductsById(idBuscado) {
    const result = this.products.find((element) => element.id === idBuscado);
    if (result) {
      return result;
    } else {
      return console.log('Error: Product not found');
    }
  }
}

let ProductList = new ProductManager();
console.log(ProductList.getProducts());

ProductList.addProducts(
  'producto prueba',
  'este es un producto de prueba',
  200,
  'sin imagen',
  'abc123',
  5
);
console.log(ProductList.getProducts());

ProductList.addProducts(
  'producto prueba',
  'este es un producto de prueba',
  200,
  'sin imagen',
  'abc123',
  5
);

console.log(ProductList.getProductsById(0));
ProductList.getProductsById(10);
