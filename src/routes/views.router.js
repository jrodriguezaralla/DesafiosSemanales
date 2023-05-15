import { Router } from 'express';
import ProductManager from '../models/ProductManager.js';

const viewsRouter = Router();

//Instancio una nueva clase de Product Manager con el archivo ya creado
const ProductList = new ProductManager('./productos.json');

//Endpoint que muestra un usuario
viewsRouter.get('/', async (req, res) => {
	try {
		let products = await ProductList.getProducts();
		res.render('home', {
			products,
			style: 'index.css',
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

export { viewsRouter };
