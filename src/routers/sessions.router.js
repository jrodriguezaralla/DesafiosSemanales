import { Router } from 'express';
import { middlewarePassportJWT } from '../public/middleware/jwt.middleware.js';
import passport from 'passport';

const sessionRouter = Router();

//Endopoint para autenticar con Github
sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {});

sessionRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: 'faillogin' }), (req, res) => {
	req.session.user = req.user;
	res.redirect('/products');
});

//Endpoint que muestra todos los productos
sessionRouter.get('/current', middlewarePassportJWT, async (req, res) => {
	try {
		return res.send(req.user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ status: 'error', message: 'Internal server error' });
	}
});

export { sessionRouter };
