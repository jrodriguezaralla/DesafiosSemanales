//Servicio de productos

import TicketService from '../service/ticket.service.js';

class TicketController {
	constructor() {
		this.service = new TicketService();
	}

	//Método para agregar un nuevo carrito
	async createTicket(newTicket) {
		return await this.service.create(newTicket); //agrego el nuevo carrito al archivo
	}

	//Método para adquirir un carrito especifico por ID
	async getTicketById(idBuscado) {
		return await this.service.findById(idBuscado);
	}

	//Método para eliminar un producto
	async deleteProduct(idBuscado) {
		return this.service.deleteOne(idBuscado); //elimino producto seleccionado
	}
}

const ticketController = new TicketController();

export default ticketController;
