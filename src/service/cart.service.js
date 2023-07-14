export default class CartService {
	constructor(dao) {
		this.dao = dao;
	}

	addNewCart() {
		this.dao.addNewCart();
	}

	//Método para adquirir un carrito especifico por ID
	async getCartById(idBuscado) {
		return await this.dao.getCartById(idBuscado);
	}

	async addProductToCart(cartId, productId) {
		await this.dao.addProductToCart(cartId, productId);
	}

	//Método para borrar un producto del carrito
	async deleteProduct(cartId, productId) {
		await this.dao.deleteProduct(cartId, productId);
	}

	//Método para actualizar todo el array de productos
	async updateAllProducts(cartId, newArray) {
		await this.dao.updateAllProducts(cartId, newArray);
	}

	//metodo para modificar la cantidad de productos de un elemento del array de productos
	async updateProductQuantity(cartId, productId, newQuantity) {
		await this.dao.updateProductQuantity(cartId, productId, newQuantity);
	}

	//Metodo para borrar todos los productos de un carrito determinado
	async deleteAllProducts(cartId) {
		await this.dao.deleteAllProducts(cartId);
	}
}
