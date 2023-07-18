import userModel from '../../models/user.model.js';
import cartDAO from './cart.dao.js';

class UserDAO {
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

	//método para encontrar un usuario por id
	async getById(userId) {
		return await this.model.findById(userId);
	}

	//método para registrar un usuario
	async createUser(userData) {
		let newCartId = await cartDAO.addNewCart();
		userData.cartId = newCartId;
		return await this.model.create(userData);
	}
}

const userDAO = new UserDAO();
export default userDAO;
