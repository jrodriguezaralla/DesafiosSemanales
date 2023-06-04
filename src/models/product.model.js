//Modelo de productos para guardar en la base de datos
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: true,
	},
	code: {
		type: String,
		require: true,
		unique: true,
	},
	price: {
		type: Number,
		require: true,
	},
	status: {
		type: Boolean,
		require: true,
	},
	stock: {
		type: Number,
		require: true,
	},
	category: {
		type: String,
		require: true,
	},
	thumbnail: {
		type: Array,
		require: true,
	},
});

export const ProductModel = mongoose.model('products', productSchema);
