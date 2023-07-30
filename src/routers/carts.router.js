//Router de carritos
import { Router } from 'express';
import cartController from '../controllers/cart.controller.js';
import { middlewarePassportJWT } from '../public/middleware/jwt.middleware.js';
import { isUser } from '../public/middleware/isUser.middleware.js';
import ticketController from '../controllers/ticket.controller.js';

const cartRouter = Router();

//Endpoint que agrega un nuevo carrito
cartRouter.post('/', async (req, res) => {
	/*try {
		CartList.addNewCart();
		res.send({ status: 'sucess', message: 'New cart added' });
	} catch (error) {
		res.status(400).send(error);
	}*/
	try {
		await cartController.addNewCart();
		res.send({ status: 'sucess', message: 'New cart added' });
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que muestra los productos de un carrito en particular
cartRouter.get('/:cid', async (req, res) => {
	/*try {
		//Recibo un params y muestro el producto con ese ID, como el ID es un string lo paso a entero
		let products = await CartList.getCartById(parseInt(req.params.cid));
		res.send(products);
	} catch (error) {
		res.status(400).send(error);
	}*/
	try {
		//Recibo un params y muestro el listado de productos de un carrito determinado
		let products = await cartController.getCartById(req.params.cid);
		res.send(products);
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que agrega el producto a un carrito determinado
cartRouter.post('/:cid/product/:pid', middlewarePassportJWT, isUser, async (req, res) => {
	/*try {
		//Recibo un params y muestro el producto con ese ID, como el ID es un string lo paso a entero
		let product = await CartList.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
		res.send(product);
	} catch (error) {
		res.status(400).send(error);
	}*/
	try {
		//Recibo por params el Id de carrito y el ID del producto y lo agrego al carrito indicado
		let product = await cartController.addProductToCart(req.params.cid, req.params.pid);
		res.send(product);
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint para borrar un producto del carrito
cartRouter.delete('/:cid/product/:pid', async (req, res) => {
	try {
		//Recibo por params el Id de carrito y el ID del producto y lo agrego al carrito indicado
		let product = await cartController.deleteProduct(req.params.cid, req.params.pid);
		res.send(product);
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint para actualizar los productos completos de un carrito
cartRouter.put('/:cid', async (req, res) => {
	try {
		//Recibo por params el Id de carrito y el ID del producto y lo agrego al carrito indicado
		let result = await cartController.updateAllProducts(req.params.cid, req.body);
		res.send(result);
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint para actualizar as cantidades de un producto dentro de un determinado carrito
cartRouter.put('/:cid/product/:pid', async (req, res) => {
	try {
		//Recibo por params el Id de carrito y el ID del producto y lo agrego al carrito indicado
		let result = await cartController.updateProductQuantity(req.params.cid, req.params.pid, req.body);
		res.send(result);
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint para borrar todos los productos del carrito
cartRouter.delete('/:cid', async (req, res) => {
	try {
		//Recibo por params el Id de carrito
		let product = await cartController.deleteAllProducts(req.params.cid);
		res.send(product);
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint para obtener el ticket de compra
cartRouter.post('/:cid/purchase', async (req, res) => {
	try {
		const cartId = req.params.cid;
		const { email } = req.body;
		let result = await ticketController.createTicket(cartId, email);
		res.send(result);
	} catch (error) {
		res.status(400).send(error);
	}
});

export { cartRouter };
