//Imports generales
import express from 'express';
import MongoStore from 'connect-mongo';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import __dirname from './dirname.util.js';
import handlebars from 'express-handlebars';

import { Server } from 'socket.io';

//import de rutas
import { productsRouter } from './routers/products.router.js';
import { cartRouter } from './routers/carts.router.js';
import { viewsRouter } from './routers/views.router.js';
import { messagesRouter } from './routers/message.router.js';
import { usersRouter } from './routers/user.router.js';
import { sessionRouter } from './routers/sessions.router.js';
import { mailRouter } from './routers/mail.router.js';
import { mockingRouter } from './routers/mocking.router.js';

//Import de passport
import initializePassport from './config/passport.config.js';

//import de environment
import environment from './config/environment.js';

//import de controllers
import productController from './controllers/product.controller.js';
import messageController from './controllers/message.controller.js';

//Inicializo Express
const app = express();

//Monto el servidor en el puerto 8080
const webServer = app.listen(environment.port, () => {
	console.log(`Servidor montado en puerto ${environment.port}`);
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
			mongoUrl: environment.mongoUrl,
			mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
			ttl: 6000,
		}),
		secret: environment.mongoSessionSecret,
		resave: true,
		saveUninitialized: true,
	})
);
app.use(cookieParser(environment.cookieHash));
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
app.use('/email', mailRouter);
app.use('/mockingproducts', mockingRouter);

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
	socket.emit('real_time_products', await productController.getProducts());
	// Envio los mensajes al cliente que se conectó
	socket.emit('messages', messages);

	// Escucho los mensajes enviado por el cliente y se los propago a todos
	socket.on('message', async (message) => {
		newMessage.user = message.user; //recibo el mensaje enviado por el cliente y su usuario
		newMessage.message = message.msj;
		await messageController.addMessage(newMessage); //Lo guardo en la base de datos
		// Agrego el mensaje al array de mensajes
		messages.push(message);
		// Propago el evento a todos los clientes conectados
		io.emit('messages', messages);
	});
});

//Me conecto a la base de datos
//mongoose.connect(environment.mongoUrl);

export { io };
/*

generarIdUnico1 = () => { 
    return Math.random().toString(30).substring(2);           
} 

*/
