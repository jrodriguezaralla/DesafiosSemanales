import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const ProductList = new ProductManager('./ProductManager.json');

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
	try {
		let allProducts = await ProductList.getProducts();
		let limit = req.query.limit;
		if (limit) {
			let productLimit = allProducts.slice(0, limit);
			res.send(productLimit);
		} else res.send(allProducts);
	} catch (error) {
		res.send(error);
	}
});

app.get('/products/:pid', async (req, res) => {
	try {
		let product = await ProductList.getProductsById(parseInt(req.params.pid));
		console.log(typeof product);
		res.send(product);
	} catch (error) {
		res.send(error);
	}
});

app.listen(8080, () => {
	console.log('Servidor montado en puerto 8080');
});
