import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const ProductList = new ProductManager('./ProductManager.json');

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
	let limit = req.query.limit;
	try {
		let allProducts = await ProductList.getProducts();
		res.send(allProducts);
	} catch (error) {
		res.send(error);
	}
});

app.listen(8080, () => {
	console.log('Servidor montado en puerto 8080');
});
