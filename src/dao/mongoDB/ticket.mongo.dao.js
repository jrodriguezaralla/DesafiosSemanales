import { TicketModel } from '../../models/ticket.model.js';

class TicketDAO {
	constructor() {
		this.model = TicketModel;
	}

	//Método para agregar un nuevo carrito
	async createTicket(newTicket) {
		return (await this.model.create(newTicket))._id; //agrego el nuevo carrito al archivo
	}

	//Método para adquirir un carrito especifico por ID
	async getTicketById(idBuscado) {
		return await this.model.findById(idBuscado).lean();
	}

	//Método para eliminar un producto
	async deleteProduct(idBuscado) {
		return this.model.deleteOne({ _id: idBuscado }); //elimino producto seleccionado
	}
}

//Instancio una nueva clase de Cart Manager con el archivo ya creado
const ticketDAO = new TicketDAO();

export default ticketDAO;
