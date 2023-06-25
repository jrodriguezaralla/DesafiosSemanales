import { Router } from 'express';
import userService from '../dao/service/User.service.js';
import { comparePassword } from '../utils/encrypt.util.js';
import passport from 'passport';

const usersRouter = Router();

//Endpoint para registrar usuario
/*
usersRouter.post('/', async (req, res) => {
	const userData = req.body;
	try {
		const respuesta = await userService.createUser(userData);
		res.json({ status: 'success', message: 'user registered' });
		//res.redirect('/login');
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});*/

usersRouter.post('/', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
	res.send({ status: 'success', message: 'user registered' });
});

usersRouter.get('/failregister', async (req, res) => {
	res.status(400).send({ error: 'fail register' });
});

//Endpoint para autenticar usuario y contraseña
/*usersRouter.post('/auth', async (req, res) => {
	const { email, password } = req.body; // recibo usuario y contraseña por body
	try {
		const user = await userService.getByEmail(email);

		// Chequeo de datos
		if (!user) {
			//Existe el usuario?
			res.json({ status: 'error', message: 'user doesn´t exist' });
		}

		if (!comparePassword(user, password)) {
			// La contraseña es correcta?
			res.json({ status: 'error', message: 'incorrect pasword' });
		}

		delete user.password;
		// Si todo está bien, guardo el usuario en la sesión
		req.session.user = user;
		res.json({ status: 'success', message: 'user login authorized' });
	} catch (error) {
		//res.status(400).send(error);
	}
});*/
usersRouter.post('/auth', passport.authenticate('auth', { failureRedirect: '/faillogin' }), async (req, res) => {
	if (!req.user) {
		res.send({ status: 'error', message: 'invalid credentials' });
	}
	req.session.user = {
		first_name: req.user.first_name,
		las_name: req.user.last_name,
		email: req.user.email,
	};
	res.send({ status: 'success', message: 'user login authorized' });
});

usersRouter.get('/faillogin', async (req, res) => {
	res.status(400).json({ error: 'faillogin' });
});

//Endpoitn para destruir sesion
usersRouter.post('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/login');
});

export default usersRouter;
