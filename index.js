//Desafio Clase 4 - Manejo de archivos en Javascript

const fs = require("fs");

class ProductManager {
	static id = 0; // ID que será vistos por todas las instancias

	constructor(myPath) {
		this.products = [];
		this.path = myPath;
	}

	//Método para agregar productos al archivo
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

		//evaluo si el codigo del nuevo producto no existe
		if (!codes.includes(code)) {
			this.products.push(newProduct);
			ProductManager.id += 1; //incremento contador ID

			//Si no existe, Escribo el file utilizando promesas y esperando a que se cumpla la misma
			await fs.promises.writeFile(`${this.path}`, JSON.stringify(this.products));
		} else {
			return console.log("Error: product already exist");
		}
	}

	//Método para adquirir el listado de productos desde el archivo.
	async getProducts() {
		const actualProducts = await fs.promises.readFile(`${this.path}`, "utf-8");
		return JSON.parse(actualProducts);
	}

	//Método para adquirir un producto especifico por ID
	async getProductsById(idBuscado) {
		const productList = await this.getProducts();
		const result = productList.find((element) => element.id === idBuscado); // busco el elemento que coincida con el ID indicado

		if (result) {
			// Si tengo un resultado lo retorno, sino devuelvo error
			return result;
		} else {
			return "Error: Product not found";
		}
	}

	//Método para actualizar producto
	async updateProduct(idBuscado, productUpdated) {
		const productList = await this.getProducts();
		productList.map((product) => {
			if (product.id === idBuscado) {
				product.title = productUpdated.title;
				product.description = productUpdated.description;
				product.price = productUpdated.price;
				product.thumbnail = productUpdated.thumbnail;
				product.code = productUpdated.code;
				product.stock = productUpdated.stock;
			}
			return product;
		});

		await fs.promises.writeFile(`${this.path}`, JSON.stringify(productList));
		return productList;
	}
}

//Genero nueva instancia de ProductManager
let ProductList = new ProductManager("./ProductManager.json");

//Solicito ver el listado de productos, en este caso se devuelve el array vacio
const test = async () => {
	const newProd = {
		title: "producto prueba2",
		description: "este es un producto de prueba2",
		price: 20,
		thumbnail: "sin imagen 2",
		code: "asdasd",
		stock: 25,
	};

	try {
		//Agrego un producto
		await ProductList.addProducts("producto prueba", "este es un producto de prueba", 200, "sin imagen", "abc123", 5);

		console.log(await ProductList.updateProduct(0, newProd));
		//Solicito ver el listado de productos, en este caso se devuelve el array con el producto ingresado
		//console.log(await ProductList.getProducts());

		//Intento agregar el mismo producto nuevamente, obtengo un Error
		//await ProductList.addProducts("producto prueba", "este es un producto de prueba", 200, "sin imagen", "abc123", 5);

		//Solicito mostrar el producto con ID 0, y muestra el mismo
		//console.log(await ProductList.getProductsById(0));

		//Solicito mostrar el producto con ID 10, y muestra Error porque el mismo no existe
		//console.log(await ProductList.getProductsById(0));
	} catch (error) {
		console.log("Error en el test");
	}
};
test();
