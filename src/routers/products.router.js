import { Router } from 'express';
import { io } from '../app.js';
import { middlewarePassportJWT } from '../middleware/jwt.middleware.js';
import { isAdmin } from '../middleware/isAdmin.middleware.js';

import productController from '../controllers/product.controller.js';
import CustomError from '../tools/CustomErrors.js';
import { generateProductErrorInfo } from '../tools/info.js';
import EErrors from '../tools/EErrors.js';
//Inicializo Router
const productsRouter = Router();

//Endpoint que muestra todos los productos
productsRouter.get('/', async (req, res) => {
	/*try {
		let allProducts = await ProductList.getProducts();
		let limit = req.query.limit;
		if (limit) {
			// Si recibo el limite de productos a mostrar
			let productLimit = allProducts.slice(0, limit); //Solo muestro desde el primer elemento al limite indicado por query
			res.send(productLimit); //envio la respuesta
		} else res.send(allProducts); // Si no tengo query envio el listado completo
	} catch (error) {
		res.status(400).send(error);
	}*/

	const { limit, page, category, availability, sort } = req.query;
	try {
		let showProducts = await productController.getProducts(limit, page, category, sort, availability); //Traigo el listado de productos
		res.send(showProducts); //envio la respuesta
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que muestra un producto en particular
productsRouter.get('/:pid', async (req, res) => {
	/*try {
		//Recibo un params y muestro el producto con ese ID, como el ID es un string lo paso a entero
		let product = await ProductList.getProductsById(parseInt(req.params.pid));
		res.send(product);
	} catch (error) {
		res.status(400).send(error);
	}*/
	try {
		//Recibo un params y muestro el producto con ese ID, como el ID es un string lo paso a entero
		let product = await productController.getProductsById(req.params.pid);
		res.send(product);
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que agrega un producto
productsRouter.post('/', middlewarePassportJWT, isAdmin, async (req, res, next) => {
	try {
		const productToAdd = req.body;
		if (
			!productToAdd.title ||
			!productToAdd.description ||
			!productToAdd.code ||
			!productToAdd.price ||
			!productToAdd.status ||
			!productToAdd.stock ||
			!productToAdd.category ||
			!productToAdd.thumbnail
		) {
			CustomError.createError({
				name: 'Product creation error',
				cause: generateProductErrorInfo(productToAdd),
				message: 'Error trying to create product',
				code: EErrors.INVALID_TYPES_ERROR,
			});
		}
		let newProduct = await productController.addProducts(productToAdd); //recibo por body el producto a agregar
		res.send(newProduct); //respondo con el producto agregado
	} catch (error) {
		next(error);
	}
});

//Endpoint que modifica un producto
productsRouter.put('/:pid', middlewarePassportJWT, isAdmin, async (req, res) => {
	/*try {
		let productUpdated = req.body; //recibo por body los datos modificados
		let product = await ProductList.updateProduct(parseInt(req.params.pid), productUpdated);
		io.emit('real_time_products', await ProductList.getProducts()); //propago el evento a todos los clientes
		res.send(product);
	} catch (error) {
		res.status(400).send(error);
	}*/

	try {
		let product = await productController.updateProduct(req.params.pid, req.body); //recibo por body los datos modificados
		io.emit('real_time_products', await productController.getProducts());
		res.send(product);
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que elimina un producto
productsRouter.delete('/:pid', middlewarePassportJWT, isAdmin, async (req, res) => {
	/*try {
		let product = await ProductList.deleteProduct(parseInt(req.params.pid));
		io.emit('real_time_products', await ProductList.getProducts()); //propago el evento a todos los clientes
		res.send(product);
	} catch (error) {
		res.status(400).send(error);
	}*/
	try {
		let product = await productController.deleteProduct(req.params.pid);
		io.emit('real_time_products', await productController.getProducts());
		res.send(product);
	} catch (error) {
		res.status(400).send(error);
	}
});

export { productsRouter };
