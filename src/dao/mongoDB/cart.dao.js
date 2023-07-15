import { CartModel } from '../../models/cart.model.js';

class CartDAO {
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
		return await this.model.findById(idBuscado).lean().populate('products.product');
	}

	//Método agregar un producto al carrito
	async addProductToCart(cartId, newArray) {
		await this.model.findOneAndUpdate({ _id: cartId }, { products: newArray.products }); //busco el carrito y modifico el campo
	}

	//Método para borrar un producto del carrito
	async deleteProduct(cartId, newArray) {
		await this.model.findOneAndUpdate({ _id: cartId }, { products: newArray.products }); //busco el carrito y modifico el campo
	}

	//Método para actualizar todo el array de productos
	async updateAllProducts(cartId, newArray) {
		await this.model.findOneAndUpdate({ _id: cartId }, { products: newArray.products }); //busco el carrito y modifico el campo
	}

	//metodo para modificar la cantidad de productos de un elemento del array de productos
	async updateProductQuantity(cart) {
		await cart.save(); //guardo cambios
	}

	//Metodo para borrar todos los productos de un carrito determinado
	async deleteAllProducts(cartId) {
		await this.model.findOneAndUpdate({ _id: cartId }, { products: [] }); //busco el carrito e inserto un array vacio
	}
}

//Instancio una nueva clase de Cart Manager con el archivo ya creado
const cartDAO = new CartDAO();

export default cartDAO;
