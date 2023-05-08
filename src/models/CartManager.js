//Primer Pre entrega

import fs from 'fs';

export default class CartManager {
	static id = 0; // ID que será vistos por todas las instancias

	constructor(myPath) {
		this.carts = [];
		this.path = myPath;
		//Si no existe el archivo lo creo de forma sincronica con un array vacío
		if (!fs.existsSync('./carrito.json')) {
			fs.promises.writeFile(`${this.path}`, JSON.stringify(this.carts));
		}
	}

	//Método para agregar productos al archivo
	async addNewCart() {
		this.carts = await this.getCarts();

		let Ids = this.carts.map((prod) => prod.id);

		let maxId = Ids.reduce(function (mayor, numero) {
			if (numero > mayor) {
				mayor = numero;
			}
			return mayor;
		}, Ids[0]);

		if (this.carts.length === 0) {
			CartManager.id = 0;
		} else {
			CartManager.id = maxId + 1;
		}

		let newCart = {
			id: CartManager.id,
			products: [],
		};

		this.carts.push(newCart);
		CartManager.id += 1; //incremento contador ID
		//Si no existe, Escribo el file utilizando promesas y esperando a que se cumpla la misma
		await fs.promises.writeFile(`${this.path}`, JSON.stringify(this.carts));
	}

	//Método para adquirir el listado de productos desde el archivo.
	async getCarts() {
		const actualCarts = await fs.promises.readFile(`${this.path}`, 'utf-8');
		return JSON.parse(actualCarts);
	}

	//Método para adquirir un producto especifico por ID
	async getCartById(idBuscado) {
		const cartById = await this.getCarts();

		const result = cartById.find((element) => element.id === idBuscado); // busco el elemento que coincida con el ID indicado
		if (result) {
			// Si tengo un resultado lo retorno, sino devuelvo error
			return result.products;
		} else {
			return { error: 'Error: Product not found' };
		}
	}

	//Método para actualizar producto
	async addProductToCart(cartId, productId) {
		let existe = false;
		const productCarts = await this.getCarts();
		const newProduct = {
			product: productId,
			quantity: 1,
		};

		productCarts.map((cart) => {
			if (cart.id === cartId) {
				cart.products.map((prod) => {
					if (prod.product === productId) {
						prod.quantity += 1;
						existe = true;
					}
				});
				if (!existe) {
					cart.products.push(newProduct);
					existe = false;
				}
			}
		});

		await fs.promises.writeFile(`${this.path}`, JSON.stringify(productCarts));
	}
}
