import { ProductModel } from '../models/product.model.js';

class ProductService {
	constructor() {
		this.model = ProductModel;
	}

	async getProducts() {
		return await this.model.find();
	}
}

const ProductListDb = new ProductService();

export default ProductListDb;
