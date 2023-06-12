import { Router } from 'express';
import { ProductList } from './products.router.js';
import { io } from '../app.js';
import ProductListDb from '../dao/service/Product.service.js';
import CartListDb from '../dao/service/Cart.service.js';

//Inicializo Router
const viewsRouter = Router();

//Endpoint que muestra los produuctos
viewsRouter.get('/products', async (req, res) => {
	try {
		const { limit, page, category, availability, sort } = req.query;
		let products = await ProductListDb.getProducts(limit, page, category, sort, availability); //traigo el listado de productos y los renderizo en home
		//let showProducts = products.payload;
		res.render('home', {
			products,
			style: 'index.css', // Envío los estilos css
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que muestra los productos en tiempo real
viewsRouter.get('/realtimeproducts', async (req, res) => {
	io.emit('real_time_products', await ProductListDb.getProducts());
	try {
		res.render('realTimeProducts', {
			//renderizo los productos en tiempo real
			style: 'index.css', // Envío los estilos css
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que muestra los mensajes
viewsRouter.get('/chat', async (req, res) => {
	// Inicio la conección y envio el listado de productos para rederizarlos en pantalla
	/*io.on('connection', async (socket) => {
		//cuando se conecta un cliente le envío el listado de productos
		socket.emit('real_time_products', await ProductList.getProducts());
	});*/

	try {
		res.render('chat'); // Renderizo los mensajes en pantalla
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que muestra los produuctos
viewsRouter.get('/carts/:cid', async (req, res) => {
	try {
		const cartId = req.params.cid;
		let products = await CartListDb.getCartById(cartId);
		console.log(products);
		res.render('cart', {
			products,
			cartId,
			style: 'index.css', // Envío los estilos css
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

export { viewsRouter };
