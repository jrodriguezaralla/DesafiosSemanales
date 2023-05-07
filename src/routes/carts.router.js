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

export { cartRouter };
