import mongoose from 'mongoose';
import environment from '../config/environment.js';

export let cartDAO;
export let messageDAO;
export let productDAO;
export let ticketDAO;
export let userDAO;

switch (environment.persistence) {
	case 'MONGO':
		//Me conecto a la base de datos
		mongoose.connect(environment.mongoUrl);
		const { default: cartMongo } = await import('./mongoDB/cart.mongo.dao.js');
		const { default: messageMongo } = await import('./mongoDB/message.mongo.dao.js');
		const { default: productMongo } = await import('./mongoDB/product.mongo.dao.js');
		const { default: ticketMongo } = await import('./mongoDB/ticket.mongo.dao.js');
		const { default: userMongo } = await import('./mongoDB/user.mongo.dao.js');
		cartDAO = cartMongo;
		messageDAO = messageMongo;
		productDAO = productMongo;
		ticketDAO = ticketMongo;
		userDAO = userMongo;

		break;
}
