//import ticketDAO from '../dao/mongoDB/ticket.mongo.dao.js';
import { ticketDAO } from '../dao/factory.js';
import TicketRepository from '../repositories/ticket.repository.js';

//Servicio de productos
export default class TicketService {
	constructor() {
		this.repository = new TicketRepository(ticketDAO);
	}

	//Método para agregar un nuevo carrito
	async createTicket(newTicket) {
		return await this.repository.createTicket(newTicket); //agrego el nuevo carrito al archivo
	}

	//Método para adquirir un carrito especifico por ID
	async getTicketById(idBuscado) {
		return await this.repository.getTicketById(idBuscado);
	}

	//Método para eliminar un producto
	async deleteTicket(idBuscado) {
		return this.repository.deleteTicket(idBuscado); //elimino producto seleccionado
	}
}
