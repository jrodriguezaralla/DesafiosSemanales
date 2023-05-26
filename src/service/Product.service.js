import { ProductModel } from '../models/product.model.js';

class ProductService {
	constructor() {
		this.model = ProductModel;
	}

	//Método para traer todos los productos de la base de datos
	async getProducts() {
		return await this.model.find();
	}

	//Método para agregar productos a la base de datos
	async addProducts(productToAdd) {
		if (
			!productToAdd.title ||
			!productToAdd.description ||
			!productToAdd.code ||
			!productToAdd.price ||
			!productToAdd.status ||
			!productToAdd.stock ||
			!productToAdd.category ||
			!productToAdd.thumbnail
		) {
			return { error: 'Error: fields missing' }; //Si falta algun campo, arrojo error
		}
		let products = await this.getProducts();

		let codes = products.map((cod) => cod.code); // me quedo con todos los códigos del array productos
		//evaluo si el codigo del nuevo producto no existe
		if (!codes.includes(productToAdd.code)) {
			await this.model.create(productToAdd);
			return { status: 'sucess', message: `product ${productToAdd.code} created` };
		} else {
			return { error: 'Error: product already exist' }; //Si el producto ya existe arrojo error
		}
	}

	//Método para adquirir un producto especifico por ID
	async getProductsById(idBuscado) {
		const result = this.model.find({ _id: idBuscado }); // busco el elemento que coincida con el ID indicado

		if (result) {
			// Si tengo un resultado lo retorno, sino devuelvo error
			return result;
		} else {
			return { error: 'Error: Product not found' };
		}
	}
}

const ProductListDb = new ProductService();

export default ProductListDb;
