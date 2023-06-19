import { Router } from 'express';
import userService from '../dao/service/User.service.js';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
	const userData = req.body;
	try {
		const respuesta = await userService.createUser(userData);
		console.log(respuesta);
		res.json({ status: 'sucess', message: 'user registered' });
		//res.redirect('/login');
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

usersRouter.post('/auth', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userService.getByEmail(email);

		// Chequeo de datos
		if (!user) {
			//throw new Error('Invalid data'); // Existe el usuario?
			res.json({ status: 'error', message: 'user doesn´t exist' });
		}
		if (user.password !== password) {
			//throw new Error('Invalid data'); // La contraseña es correcta?
			res.json({ status: 'error', message: 'incorrect pasword' });
		}

		// Si todo está bien, guardo el usuario en la sesión
		req.session.user = user;
		res.json({ status: 'sucess', message: 'user login authorized' });
		//res.redirect('/products');
	} catch (error) {
		//res.status(400).send(error);
	}
});

usersRouter.post('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/login');
});

export default usersRouter;
