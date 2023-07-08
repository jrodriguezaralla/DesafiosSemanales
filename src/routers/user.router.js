import { Router } from 'express';
import userService from '../dao/service/User.service.js';
import { comparePassword } from '../utils/encrypt.util.js';
import passport from 'passport';
import { generateToken } from '../public/middleware/jwt.middleware.js';

const usersRouter = Router();

//Endpoint para registrar usuario
usersRouter.post('/', passport.authenticate('register', { failureRedirect: 'failregister' }), async (req, res) => {
	//res.send({ status: 'success', message: 'user registered' });
	res.redirect('/registerok');
});

usersRouter.get('/failregister', async (req, res) => {
	res.render('registererror', {
		title: 'Error: error al registrar',
	});
});

//Endopoint para autenticar con Github
usersRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {});

usersRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: 'faillogin' }), (req, res) => {
	req.session.user = req.user;
	res.redirect('/products');
});

//Endpoint para autenticar usuario y contraseña
usersRouter.post('/auth', async (req, res) => {
	const { username, password } = req.body;

	let user = await userService.getByEmail(username);

	if (!user) {
		res.status(401).send({ message: 'User not found' });
	}

	if (!comparePassword(user, password)) {
		res.status(401).send({ message: 'User or Password not valid' });
	}

	const token = generateToken(user);
	res.cookie('token', token, {
		httpOnly: true,
		maxAge: 60000,
	}).send();
	//res.json({ status: 'success', message: 'user login authorized' });
});

usersRouter.get('/faillogin', async (req, res) => {
	res.render('loginerror', {
		title: 'Error: error al ingresar',
	});
});

//Endpoitn para destruir sesion
usersRouter.post('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/login');
});

export default usersRouter;
