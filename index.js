class ProductManager {
  static id = 0; // ID que será vistos por todas las instancias
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

    let codes = this.products.map((cod) => cod.code); // me quedo con todos los códigos del array productos
    if (!codes.includes(code)) { //evaluo si el codigo del nuevo producto no existe
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
    const result = this.products.find((element) => element.id === idBuscado); // busco el elemento que coincida con el ID indicado
    if (result) { // Si tengo un resultado lo retorno, sino devuelvo error
      return result;
    } else { 
      return console.log('Error: Product not found');
    }
  }
}

//Genero nueva instancia de ProductManager
let ProductList = new ProductManager();

//Solicito ver el listado de productos, en este caso se devuelve el array vacio
console.log(ProductList.getProducts());

//Agrego un producto
ProductList.addProducts(
  'producto prueba',
  'este es un producto de prueba',
  200,
  'sin imagen',
  'abc123',
  5
);

//Solicito ver el listado de productos, en este caso se devuelve el array con el producto ingresado
console.log(ProductList.getProducts());

//Intento agregar el mismo producto nuevamente, obtengo un Error
ProductList.addProducts(
  'producto prueba',
  'este es un producto de prueba',
  200,
  'sin imagen',
  'abc123',
  5
);

//Solicito mostrar el producto con ID 0, y muestra el mismo
console.log(ProductList.getProductsById(0));

//Solicito mostrar el producto con ID 10, y muestra Error porque el mismo no existe
ProductList.getProductsById(10);
