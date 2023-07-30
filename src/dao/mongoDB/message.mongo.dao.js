import { MessageModel } from '../../models/message.model.js';

class MessageMongo {
	constructor() {
		this.model = MessageModel;
	}

	//Método para traer todos los mensajes de la base de datos
	async getMessages() {
		return await this.model.find().lean();
	}

	//Método para agregar mensajes a la base de datos
	async addMessage(messageToAdd) {
		await this.model.create(messageToAdd);
	}
}

const messageMongo = new MessageMongo();
export default messageMongo;
