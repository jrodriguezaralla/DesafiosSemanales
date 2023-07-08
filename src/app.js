//Primer Practica integradora//

//Imports
import express from 'express';
import MongoStore from 'connect-mongo';
import path from 'path';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import { productsRouter } from './routers/products.router.js';
import { cartRouter } from './routers/carts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './dirname.util.js';
import { viewsRouter } from './routers/views.router.js';
import ProductListDb from './dao/service/Product.service.js';
import MessageListDb from './dao/service/Message.service.js';
import { messagesRouter } from './routers/message.router.js';
import usersRouter from './routers/user.router.js';
import initializePassport from './config/passport.config.js';
import { sessionRouter } from './routers/sessions.router.js';
import config from './config/config.js';

//Inicializo Express
const app = express();

//Monto el servidor en el puerto 8080
const webServer = app.listen(config.port, () => {
	console.log(`Servidor montado en puerto ${config.port}`);
});

//Handlebars
app.engine('handlebars', handlebars.engine()); // Inicializamos el motor de plantillas de Handlebars
app.set('views', path.join(__dirname, 'views')); //indicamos ruta de las views
app.set('view engine', 'handlebars'); //por ultimo, se indica que vamos a utilizar el motor de Handlebars

//seteamos de manera estatica la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

//Middlewares
app.use(express.json()); //Middleware que facilita la conversión en formato json de lo que se reciba por body
app.use(express.urlencoded({ extended: true })); //Middleware para que express pueda reconover los objetos de las request como strings o arrays

//Session
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: config.mongoUrl,
			mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
			ttl: 6000,
		}),
		secret: '43330commerce',
		resave: true,
		saveUninitialized: true,
	})
);
app.use(cookieParser('B2zdY3B$pHmxW%'));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Definición de rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/users', usersRouter);
app.use('/', viewsRouter);
app.use('/messages', messagesRouter);

const messages = [];

// Inicialización de socket.io
const io = new Server(webServer);

//Estructura de mensaje para guardar en la base de datos
const newMessage = {
	user: '',
	message: '',
};

// Inicio la conección y envio el listado de productos para rederizarlos en pantalla
io.on('connection', async (socket) => {
	//cuando se conecta un cliente le envío el listado de productos
	socket.emit('real_time_products', await ProductListDb.getProducts());
	// Envio los mensajes al cliente que se conectó
	socket.emit('messages', messages);

	// Escucho los mensajes enviado por el cliente y se los propago a todos
	socket.on('message', async (message) => {
		newMessage.user = message.user; //recibo el mensaje enviado por el cliente y su usuario
		newMessage.message = message.msj;
		await MessageListDb.addMessage(newMessage); //Lo guardo en la base de datos
		// Agrego el mensaje al array de mensajes
		messages.push(message);
		// Propago el evento a todos los clientes conectados
		io.emit('messages', messages);
	});
});

//Me conecto a la base de datos
mongoose.connect(config.mongoUrl);

export { io };
