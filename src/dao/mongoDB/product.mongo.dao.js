//Servicio de productos
import { ProductModel } from '../../models/product.model.js';
const LIMITdEFAULT = 10;
const PAGEdEFAULT = 1;

class ProductMongo {
	constructor() {
		this.model = ProductModel;
	}

	//Método para traer todos los productos de la base de datos
	async getProducts(query, options) {
		let products = await this.model.paginate(query, options); // realizo la paginación
		return products; //retorno estructura
	}

	//Método para traer todos los productos de la base de datos
	async getAllProducts() {
		return await this.model.find().lean(); //retorno estructura
	}

	//Método para agregar productos a la base de datos
	async addProducts(productToAdd) {
		await this.model.create(productToAdd);
	}

	//Método para adquirir un producto especifico por ID
	async getProductsById(idBuscado) {
		return this.model.find({ _id: idBuscado }); // busco el elemento que
	}

	//Método para actualizar producto
	async updateProduct(idBuscado, productUpdated) {
		await this.model.updateOne({ _id: idBuscado }, productUpdated);
	}

	//Método para eliminar un producto
	async deleteProduct(idBuscado) {
		return this.model.deleteOne({ _id: idBuscado }); //elimino producto seleccionado
	}
}

const productMongo = new ProductMongo();

export default productMongo;
