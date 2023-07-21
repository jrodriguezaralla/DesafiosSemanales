/****************************** AGREGAR DTOs **************************************************/

//Servicio de Mensajes

export default class MessageRepository {
	constructor(dao) {
		this.dao = dao;
	}

	//Método para traer todos los mensajes de la base de datos
	async getMessages() {
		return await this.dao.getMessages();
	}

	//Método para agregar mensajes a la base de datos
	async addMessage(messageToAdd) {
		await this.dao.addMessage(messageToAdd);
	}
}
