import mongoose from 'mongoose';
import { ProductModel } from './product.model.js';

const cartSchema = new mongoose.Schema({
	products: [
		{
			product: String,
			quantity: Number,
		},
	],
});

export const CartModel = mongoose.model('carts', cartSchema);
