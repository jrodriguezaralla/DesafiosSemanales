import productDAO from '../dao/mongoDB/product.mongo.dao.js';
import ProductRepository from '../repositories/product.repository.js';

//Servicio de productos
export default class ProductService {
	constructor() {
		this.repository = new ProductRepository(productDAO);
	}

	//Método para traer todos los productos de la base de datos
	async getProducts(limit, page, category, sort, status) {
		return await this.repository.getProducts(limit, page, category, sort, status);
	}

	async getAllProducts() {
		return await this.repository.getAllProducts();
	}

	//Método para agregar productos a la base de datos
	async addProducts(productToAdd) {
		await this.repository.addProducts(productToAdd);
	}

	//Método para adquirir un producto especifico por ID
	async getProductsById(idBuscado) {
		return await this.repository.getProductsById(idBuscado);
	}

	//Método para actualizar producto
	async updateProduct(idBuscado, productUpdated) {
		await this.repository.updateProduct(idBuscado, productUpdated);
	}

	//Método para eliminar un producto
	async deleteProduct(idBuscado) {
		await this.repository.deleteProduct(idBuscado);
	}
}
