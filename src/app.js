import express from 'express';
import ProductManager from './ProductManager';

const app = express();
const ProductList = new ProductManager('./ProductManager.json');

app.use(express.urlencoded({ extended: true }));

app.get('/saludo', (req, res) => {
	res.send('Hola a Todoos!');
});

app.listen(8080, () => {
	console.log('Servidor montado en puerto 8080');
});
