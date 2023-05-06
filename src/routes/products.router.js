import { Router } from 'express';
import ProductManager from '../models/ProductManager.js';

const productsRouter = Router();

//Instancio una nueva clase de Product Manager con el archivo ya creado
const ProductList = new ProductManager('./ProductManager.json');

//Endpoint que muestra todos los productos
productsRouter.get('/', async (req, res) => {
	try {
		let allProducts = await ProductList.getProducts();
		let limit = req.query.limit;
		if (limit) {
			// Si recibo el limite de productos a mostrar
			let productLimit = allProducts.slice(0, limit); //Solo muestro desde el primer elemento al limite indicado por query
			res.send(productLimit); //envio la respeusta
		} else res.send(allProducts); // Si no tengo query envio el listado completo
	} catch (error) {
		res.send(error);
	}
});

//Endpoint que muestra un producto en particular
productsRouter.get('/:pid', async (req, res) => {
	try {
		//Recibo un params y muestro el producto con ese ID, como el ID es un string lo paso a entero
		let product = await ProductList.getProductsById(parseInt(req.params.pid));
		res.send(product);
	} catch (error) {
		res.send(error);
	}
});

export { productsRouter };
