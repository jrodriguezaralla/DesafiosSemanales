import UserService from '../service/user.service.js';
import serviceDAO from '../dao/mongoDB/user.dao.js';

class UserController {
	constructor() {
		this.service = new UserService(serviceDAO);
	}
	//método para traer todos los usuarios
	async getAll() {
		return await this.service.getAll();
	}

	//método para encontrar un usuario por mail
	async getByEmail(email) {
		return await this.service.getByEmail(email);
	}

	//método para encontrar un usuario por id
	async getById(userId) {
		return await this.service.getById(userId);
	}

	//método para registrar un usuario
	async createUser(userData) {
		return await this.service.createUser(userData);
	}
}

const userController = new UserController();
export default userController;
