import { Router } from 'express';
import MessageListDb from '../service/Message.service.js';

const messagesRouter = Router();

//Endpoint que muestra todos los productos
messagesRouter.get('/', async (req, res) => {
	try {
		res.send(await MessageListDb.getMessages()); // Si no tengo query envio el listado completo
	} catch (error) {
		res.status(400).send(error);
	}
});

export { messagesRouter };
