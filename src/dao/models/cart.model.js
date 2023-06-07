//Modelo de carritos para guardar en la base de datos
import mongoose from 'mongoose';
import { ProductModel } from './product.model.js';

const cartSchema = new mongoose.Schema({
	products: [
		{
			product: String, //Id de producto
			quantity: Number,
		},
	],
});

export const CartModel = mongoose.model('carts', cartSchema);
