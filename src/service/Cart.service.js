import { CartModel } from '../models/cart.model.js';

class CartService {
	constructor() {
		this.model = CartModel;
	}

	//Método para agregar productos al archivo
	async addNewCart() {
		let newCart = {
			products: [],
		};
		this.model.create(newCart); //agrego el nuevo carrito al archivo
	}

	//Método para adquirir un producto especifico por ID
	async getCartById(idBuscado) {
		const result = this.model.find({ _id: idBuscado }); // busco el elemento que coincida con el ID indicado

		if (result) {
			// Si tengo un resultado lo retorno, sino devuelvo error
			return result;
		} else {
			return { error: `Error: Cart ID=${idBuscado} not found` };
		}
	}

	//Método agregar un producto al carrito
	async addProductToCart(cartId, productId) {
		let existe = false; // flag para indicar si el producto ya existe en el carrito
		const newProduct = {
			product: productId,
			quantity: 1,
		};

		const result = this.model.find({ _id: cartId }); // busco el elemento que coincida con el ID indicado
		if ((await result).length == 0) return { error: `Error: Cart ID=${cartId} not found` }; //si no lo encuentra retorno error

		productCarts.map((cart) => {
			//recorro el array buscando el ID del carrito indicado
			if (cart.id === cartId) {
				cart.products.map((prod) => {
					//por cada carrito busco el producto indicado
					if (prod.product === productId) {
						//Si existe sumo una unidad
						prod.quantity += 1;
						existe = true; //enciendo flag
					}
				});
				if (!existe) {
					//Si no axiste el producto lo agrego
					cart.products.push(newProduct);
					existe = false;
				}
			}
		});
		await fs.promises.writeFile(`${this.path}`, JSON.stringify(productCarts));
		return { status: 'sucess', message: `product ID=${productId} added to cart ID=${cartId}` };
	}
}

//Instancio una nueva clase de Cart Manager con el archivo ya creado
const CartListDb = new CartService();

export default CartListDb;
