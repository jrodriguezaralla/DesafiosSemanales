//Imports
import express from 'express';
import ProductManager from './ProductManager.js';

//Inicializo Express
const app = express();

//Instancio una nueva clase de Product Manager con el archivo ya creado
const ProductList = new ProductManager('./ProductManager.json');

app.use(express.urlencoded({ extended: true }));

//Endpoint que muestra todos los productos
app.get('/products', async (req, res) => {
	try {
		let allProducts = await ProductList.getProducts();
		let limit = req.query.limit;
		if (limit) {
			// Si recibo el limite de productos a mostrar
			let productLimit = allProducts.slice(0, limit); //Solo muestro desde el primer elemento al limite indicado por query
			res.send(productLimit); //envio la respeusta
		} else res.send(allProducts); // Si no tengo query envio el listado completo
	} catch (error) {
		res.send(error);
	}
});

//Endpoint que muestra un producto en particular
app.get('/products/:pid', async (req, res) => {
	try {
		//Recibo un params y muestro el producto con ese ID, como el ID es un string lo paso a entero
		let product = await ProductList.getProductsById(parseInt(req.params.pid));
		res.send(product);
	} catch (error) {
		res.send(error);
	}
});

//Monto el servidor en el puerto 8080
app.listen(8080, () => {
	console.log('Servidor montado en puerto 8080');
});
