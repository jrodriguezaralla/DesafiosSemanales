import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
	products: [
		{
			product: String,
			quantity: Number,
		},
	],
});

export const CartModel = mongoose.model('carts', cartSchema);
