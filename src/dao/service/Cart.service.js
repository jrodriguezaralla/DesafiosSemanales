import { CartModel } from '../models/cart.model.js';

class CartService {
	constructor() {
		this.model = CartModel;
	}

	//Método para agregar un nuevo carrito
	async addNewCart() {
		let newCart = {
			products: [],
		};
		this.model.create(newCart); //agrego el nuevo carrito al archivo
	}

	//Método para adquirir un carrito especifico por ID
	async getCartById(idBuscado) {
		const result = await this.model.findById(idBuscado); // busco el elemento que coincida con el ID indicado
		if (result) {
			// Si tengo un resultado lo retorno, sino devuelvo error
			return result.products;
		} else {
			return { error: `Error: Cart ID=${idBuscado} not found` };
		}
	}

	//Método agregar un producto al carrito
	async addProductToCart(cartId, productId) {
		const newProduct = {
			product: productId,
			quantity: 1,
		};
		const cart = await this.model.findById(cartId); //me quedo con el carrito a modificar
		const prod = cart.products.find((element) => element.product.toString() === productId);
		if (prod) {
			//Si existe sumo una unidad
			prod.quantity += 1;
		} else {
			//Si no axiste el producto lo agrego
			cart.products.push(newProduct);
		}

		await cart.save(); //guardo cambios
		return { status: 'sucess', message: `product ID=${productId} added to cart ID=${cartId}` }; // retorno el carrito con el producto agregado
	}
}

//Instancio una nueva clase de Cart Manager con el archivo ya creado
const CartListDb = new CartService();

export default CartListDb;
