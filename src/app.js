//Primer Pre entrega//

//Imports
import express from 'express';
import { productsRouter } from './routes/products.router.js';
import { cartRouter } from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import path from 'path';
import { viewsRouter } from './routes/views.router.js';

//Inicializo Express
const app = express();

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

//Monto el servidor en el puerto 8080
app.listen(8080, () => {
	console.log('Servidor montado en puerto 8080');
});
