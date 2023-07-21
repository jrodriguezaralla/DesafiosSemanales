import ticketDAO from '../dao/mongoDB/ticket.mongo.dao.js';
import TicketRepository from '../repositories/ticket.repository.js';

//Servicio de productos
export default class TicketService {
	constructor() {
		this.repository = new TicketRepository(ticketDAO);
	}

	//Método para agregar un nuevo carrito
	async createTicket(newTicket) {
		return await this.repository.create(newTicket); //agrego el nuevo carrito al archivo
	}

	//Método para adquirir un carrito especifico por ID
	async getTicketById(idBuscado) {
		return await this.repository.findById(idBuscado);
	}

	//Método para eliminar un producto
	async deleteProduct(idBuscado) {
		return this.repository.deleteOne(idBuscado); //elimino producto seleccionado
	}
}
