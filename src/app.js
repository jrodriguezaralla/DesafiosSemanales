//Primer Pre entrega//

//Imports
import express from 'express';
import { productsRouter } from './routes/products.router.js';
import { cartRouter } from './routes/carts.router.js';

//Inicializo Express
const app = express();

app.use(express.json()); //Middleware que facilita la conversión en formato json de lo que se reciba por body
app.use(express.urlencoded({ extended: true })); //Middleware para que express pueda reconover los objetos de las request como strings o arrays

//Definición de rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

//Monto el servidor en el puerto 8080
app.listen(8080, () => {
	console.log('Servidor montado en puerto 8080');
});
