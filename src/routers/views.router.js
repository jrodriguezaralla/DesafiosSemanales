import { Router } from 'express';
import { io } from '../app.js';
import { isAuth, isGuest, isUser, isAdminOrPremium, isAdmin, isUserOrPremium } from '../middleware/auth.middleware.js';
import { middlewarePassportJWT } from '../middleware/jwt.middleware.js';
import productController from '../controllers/product.controller.js';
import cartController from '../controllers/cart.controller.js';
import { validateTokenRestorePass } from '../middleware/jwtrestorepass.middleware.js';
import userController from '../controllers/user.controller.js';
import ViewUserDTO from '../dto/viewuser.dto.js';
import { usersRouter } from './user.router.js';
import environment from '../config/environment.js';

//Inicializo Router
const viewsRouter = Router();

//Endpoint que muestra los productos
viewsRouter.get('/products', middlewarePassportJWT, isUserOrPremium, async (req, res) => {
	let user = req.user;
	try {
		const { limit, page, category, availability, sort } = req.query;
		let products = await productController.getProducts(parseInt(limit), parseInt(page), category, sort, availability); //traigo el listado de productos y los renderizo en home
		res.render('home', {
			products,
			user,
			style: 'index.css', // Envío los estilos css
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que muestra los productos en tiempo real
viewsRouter.get('/realtimeproducts', async (req, res) => {
	io.emit('real_time_products', await productController.getProducts());
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
viewsRouter.get('/chat', middlewarePassportJWT, isUser, async (req, res) => {
	try {
		res.render('chat'); // Renderizo los mensajes en pantalla
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que muestra los productos de un carrito
viewsRouter.get('/carts/:cid', async (req, res) => {
	try {
		const cartId = req.params.cid;
		let products = await cartController.getCartById(cartId);
		res.render('cart', {
			products,
			cartId,
			style: 'index.css', // Envío los estilos css
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpint para confirmar que el registro fue ok
viewsRouter.get('/registerok', async (req, res) => {
	try {
		res.render('registerok', {
			title: 'Registro correcto',
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que muestra la pantalla de login
viewsRouter.get('/login', isGuest, async (req, res) => {
	try {
		res.render('login', {
			style: 'index.css', // Envío los estilos css
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que muestra la pantalla pra recuperar contraseña
viewsRouter.get('/restorepassview', isGuest, validateTokenRestorePass, async (req, res) => {
	try {
		res.render('restorepass', {
			style: 'index.css', // Envío los estilos css
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que muestra la pantalla de login
viewsRouter.get('/', async (req, res) => {
	try {
		res.redirect('/login');
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que muestra la pantalla de profile
viewsRouter.get('/profile', middlewarePassportJWT, async (req, res) => {
	let user = req.user;
	try {
		res.render('profile', {
			user,
			style: 'index.css', // Envío los estilos css
		});
	} catch (error) {
		res.status(400).send(error);
	}
});


//Endpoint que muestra la pantalla de master de productos
viewsRouter.get('/masterproducts', middlewarePassportJWT, isAdminOrPremium, async (req, res) => {
	let user = req.user; // obtengo usuario
	const { limit, page, category, availability, sort } = req.query;
	let products = await productController.getProducts(parseInt(limit), parseInt(page), category, sort, availability); //traigo el listado de productos para mostrarlos en pantalla
	try {
		res.render('masterproducts', {
			products,
			user,
			style: 'master.css', // Envío los estilos css
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que muestra el login de master de productos
viewsRouter.get('/loginmasterproducts', async (req, res) => {
	try {
		res.render('loginmasterproduct', {
			style: 'index.css', // Envío los estilos css
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que muestra el login de master de usuarios
viewsRouter.get('/loginmasterusers', async (req, res) => {
	try {
		res.render('loginmasterusers', {
			style: 'index.css', // Envío los estilos css
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que muestra el login de master de usuarios
viewsRouter.get('/masterusers', middlewarePassportJWT, isAdmin, async (req, res) => {
	let user = req.user;
	if(user.email === environment.adminName){
		user._id="";
	}
	const allUsers = await userController.getAll();
	const users = allUsers.map((usr) => {
		return new ViewUserDTO(usr);
	});
	try {
		res.render('masterusers', {
			user,
			users,
			style: 'master.css', // Envío los estilos css
		});
	} catch (error) {
		res.status(400).send(error);
	}
});


export { viewsRouter };
