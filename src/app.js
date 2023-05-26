//Primer Pre entrega//

//Imports
import express from 'express';
import { productsRouter } from './routers/products.router.js';
import { cartRouter } from './routers/carts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import path from 'path';
import { viewsRouter } from './routers/views.router.js';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

//Inicializo Express
const app = express();

//Monto el servidor en el puerto 8080
const webServer = app.listen(8080, () => {
	console.log('Servidor montado en puerto 8080');
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

//Definición de rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

// Inicialización de socket.io
const io = new Server(webServer);

//Me conecto a la base de datos
mongoose.connect('mongodb+srv://jrodriguezaralla:1234@freecluster.mxzp3zq.mongodb.net/?retryWrites=true&w=majority');

export { io };
