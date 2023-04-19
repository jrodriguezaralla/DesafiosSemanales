//Desafio Clase 4 - Manejo de archivos en Javascript

const fs = require("fs");

class ProductManager {
	static id = 0; // ID que será vistos por todas las instancias

	constructor(myPath) {
		this.products = [];
		this.path = myPath;
	}

	async addProducts(title, description, price, thumbnail, code, stock) {
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
		if (!codes.includes(code)) {
			//evaluo si el codigo del nuevo producto no existe
			this.products.push(newProduct);
			ProductManager.id += 1; //incremento contador ID

			//Escribo el file utilizando promesas y esperando a que se cumpla la misma
			await fs.promises.writeFile(`${this.path}`, JSON.stringify(this.products));
		} else {
			return console.log("Error: product already exist");
		}
	}

	async getProducts() {
		const actualProducts = await fs.promises.readFile(`${this.path}`, "utf-8");
		return JSON.parse(actualProducts);
	}

	getProductsById(idBuscado) {
		const result = this.products.find((element) => element.id === idBuscado); // busco el elemento que coincida con el ID indicado
		if (result) {
			// Si tengo un resultado lo retorno, sino devuelvo error
			return result;
		} else {
			return console.log("Error: Product not found");
		}
	}
}

//Genero nueva instancia de ProductManager
let ProductList = new ProductManager("./ProductManager.json");

//Solicito ver el listado de productos, en este caso se devuelve el array vacio
const test = async () => {
	try {
		await ProductList.addProducts("producto prueba", "este es un producto de prueba", 200, "sin imagen", "abc123", 5);
		await ProductList.addProducts("producto prueba", "este es un producto de prueba", 200, "sin imagen", "abc123", 5);
		console.log(await ProductList.getProducts());
	} catch (error) {
		console.log("Error en el test");
	}
};
test();

//Agrego un producto
//ProductList.addProducts("producto prueba", "este es un producto de prueba", 200, "sin imagen", "abc123", 5);

//ProductList.addProducts("producto prueba2", "este es un producto de prueba2", 300, "sin imagen", "abc", 10);

//ProductList.addProducts("producto prueba3", "este es un producto de prueba3", 100, "sin imagen", "123", 8);

//Solicito ver el listado de productos, en este caso se devuelve el array con el producto ingresado
//console.log(ProductList.getProducts());

//Intento agregar el mismo producto nuevamente, obtengo un Error
//ProductList.addProducts("producto prueba", "este es un producto de prueba", 200, "sin imagen", "abc123", 5);

//Solicito mostrar el producto con ID 0, y muestra el mismo
//console.log(ProductList.getProductsById(0));

//Solicito mostrar el producto con ID 10, y muestra Error porque el mismo no existe
//ProductList.getProductsById(10);
