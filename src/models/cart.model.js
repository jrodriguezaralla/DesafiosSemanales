import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
	products: Array,
});

export const CartModel = mongoose.model('carts', cartSchema);
