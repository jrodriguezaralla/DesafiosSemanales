import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const ProductList = new ProductManager('./ProductManager.json');

app.use(express.urlencoded({ extended: true }));

app.get('/products', (req, res) => {
	let limit = req.query.limit;
	res.send('Hola a Todoos!');
});

app.listen(8080, () => {
	console.log('Servidor montado en puerto 8080');
});
