/****************************** AGREGAR DTOs **************************************************/

//Servicio de productos
export default class ProductRepository {
	constructor(dao) {
		this.dao = dao;
	}

	//Método para traer todos los productos de la base de datos
	async getProducts(limit, page, category, sort, status) {
		return await this.dao.getProducts(limit, page, category, sort, status);
	}

	async getAllProducts() {
		return await this.dao.getAllProducts();
	}

	//Método para agregar productos a la base de datos
	async addProducts(productToAdd) {
		await this.dao.addProducts(productToAdd);
	}

	//Método para adquirir un producto especifico por ID
	async getProductsById(idBuscado) {
		return await this.dao.getProductsById(idBuscado);
	}

	//Método para actualizar producto
	async updateProduct(idBuscado, productUpdated) {
		await this.dao.updateProduct(idBuscado, productUpdated);
	}

	//Método para eliminar un producto
	async deleteProduct(idBuscado) {
		await this.dao.deleteProduct(idBuscado);
	}
}
