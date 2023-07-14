//Servicio de Mensajes
import MessageService from '../service/message.service.js';
import messageDAO from '../dao/mongoDB/message.dao.js';

class MessageController {
	constructor() {
		this.service = new MessageService(messageDAO);
	}

	//Método para traer todos los mensajes de la base de datos
	async getMessages() {
		return await this.service.getMessages();
	}

	//Método para agregar mensajes a la base de datos
	async addMessage(messageToAdd) {
		if (!messageToAdd.user || !messageToAdd.message) {
			return { error: 'Error: fields missing' }; //Si falta algun campo, arrojo error
		}

		await this.service.addMessage(messageToAdd);
		return { status: 'sucess', message: `message added to DB` };
	}
}

const messageController = new MessageController();
export default messageController;
