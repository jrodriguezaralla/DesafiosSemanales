import { Router } from 'express';
import userService from '../dao/service/User.service.js';

const usersRouter = Router();

//Endpoint para registrar usuario
usersRouter.post('/', async (req, res) => {
	const userData = req.body;
	try {
		const respuesta = await userService.createUser(userData);
		res.json({ status: 'success', message: 'user registered' });
		//res.redirect('/login');
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//Endpoint para autenticar usuario y contraseña
usersRouter.post('/auth', async (req, res) => {
	const { email, password } = req.body; // recibo usuario y contraseña por body
	try {
		const user = await userService.getByEmail(email);

		// Chequeo de datos
		if (!user) {
			//Existe el usuario?
			res.json({ status: 'error', message: 'user doesn´t exist' });
		}
		if (user.password !== password) {
			// La contraseña es correcta?
			res.json({ status: 'error', message: 'incorrect pasword' });
		}

		// Si todo está bien, guardo el usuario en la sesión
		req.session.user = user;
		res.json({ status: 'success', message: 'user login authorized' });
	} catch (error) {
		//res.status(400).send(error);
	}
});

//Endpoitn para destruir sesion
usersRouter.post('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/login');
});

export default usersRouter;
