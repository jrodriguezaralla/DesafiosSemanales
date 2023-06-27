import { Router } from 'express';
import userService from '../dao/service/User.service.js';
import { comparePassword } from '../utils/encrypt.util.js';
import passport from 'passport';

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
usersRouter.post('/auth', passport.authenticate('auth', { failureRedirect: 'faillogin', failureMessage: true }), async (req, res) => {
	if (!req.user) {
		res.status(400).json({ status: 'error', message: 'invalid credentials' });
	}

	const user = req.user;
	delete user.password;
	req.session.user = user;
	res.redirect('/products');
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
