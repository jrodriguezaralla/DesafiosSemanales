export default class TicketRepository {
	constructor(dao) {
		this.dao = dao;
	}

	//Método para agregar un nuevo carrito
	async createTicket(newTicket) {
		return await this.dao.createTicket(newTicket); //agrego el nuevo carrito al archivo
	}

	//Método para adquirir un carrito especifico por ID
	async getTicketById(idBuscado) {
		return await this.dao.getTicketById(idBuscado);
	}

	//Método para eliminar un producto
	async deleteProduct(idBuscado) {
		return this.dao.deleteProduct(idBuscado); //elimino producto seleccionado
	}
}
