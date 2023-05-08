import { Router } from 'express';
import CartManager from '../models/CartManager.js';

const cartRouter = Router();

//Instancio una nueva clase de Cart Manager con el archivo ya creado
const CartList = new CartManager('./carrito.json');

cartRouter.post('/', async (req, res) => {
	try {
		CartList.addNewCart();
		res.send(`{"status": "sucess", "message":"New cart added"}`);
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que muestra los productos de un carrito en particular
cartRouter.get('/:cid', async (req, res) => {
	try {
		//Recibo un params y muestro el producto con ese ID, como el ID es un string lo paso a entero
		let products = await CartList.getCartById(parseInt(req.params.cid));
		res.send(products);
	} catch (error) {
		res.status(400).send(error);
	}
});

export { cartRouter };
