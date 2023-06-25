import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { hashPassword } from '../../utils/encrypt.util.js';

class UserService {
	constructor() {
		this.model = userModel;
	}
	//método para traer todos los usuarios
	async getAll() {
		return await this.model.find();
	}

	//método para encontrar un usuario por mail
	async getByEmail(email) {
		return await this.model.findOne({ email: email });
	}

	//método para registrar un usuario
	async createUser(userData) {
		const hashUserData = { ...userData, password: hashPassword(userData.password) };
		return await this.model.create(hashUserData);
	}
}

const userService = new UserService();
export default userService;
