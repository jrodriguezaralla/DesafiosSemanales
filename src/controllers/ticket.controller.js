//Servicio de productos

import TicketService from '../service/ticket.service.js';
import cartController from './cart.controller.js';
import productController from './product.controller.js';
import { DateTime } from 'luxon';

class TicketController {
	constructor() {
		this.service = new TicketService();
	}

	//Método para agregar un nuevo carrito
	async createTicket(cartId, userEmail) {
		let cart = await cartController.getCartById(cartId);
		let notStock = [];
		let newTicket = {};
		let str = 'T';
		let auxiliar = cart.map((el) => {
			let resta = el.product.stock - el.quantity;
			if (resta < 0) {
				notStock.push(el.product._id);
				return 0;
			} else {
				el.product.stock -= el.quantity;
				productController.updateProduct(el.product._id, el.product);
				cartController.deleteProduct(cartId, el.product._id);
				return el.quantity * el.product.price;
			}
		});

		let totalAmount = auxiliar.reduce((acumulador, elemento) => acumulador + elemento, 0);

		newTicket = {
			code: str.concat(Math.floor(Math.random() * 1000000000 + 1).toString()),
			purchase_datetime: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
			amount: totalAmount,
			purchaser: userEmail,
		};

		await this.service.createTicket(newTicket); //agrego el nuevo carrito al archivo

		return { notStock, newTicket };
	}

	//Método para adquirir un carrito especifico por ID
	async getTicketById(idBuscado) {
		return await this.service.getTicketById(idBuscado);
	}

	//Método para eliminar un producto
	async deleteTicket(idBuscado) {
		return this.service.deleteTicket(idBuscado); //elimino producto seleccionado
	}
}

const ticketController = new TicketController();

export default ticketController;

/* */
