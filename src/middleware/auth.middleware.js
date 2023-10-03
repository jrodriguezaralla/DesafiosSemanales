//importación de libreria de dating
import { DateTime } from 'luxon';

//Middleware para corroborar si el usuario esta autenticado, sino redirijo a login
export function isAuth(req, res, next) {
	if (req.body.user) {
		next();
	} else {
		res.redirect('/login');
	}
}

//Middleware para corroborar si elusuario no esta autenticado, sino lo esta redirijo a las vista de productos
export function isGuest(req, res, next) {
	if (!req.body.user) {
		next();
	} else {
		res.redirect('/products');
	}
}

export function isAdmin(req, res, next) {
	const dateTime = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
	if (req.user.role === 'admin') {
		req.logger.info(`${dateTime} - Admin Access ${req.user.first_name} ${req.user.last_name} ${req.user.email}`);
		next();
	} else {
		res.status(403).send({ status: 'error', message: 'access denied, you do not have permission to be here' });
	}
}

//Middleware para corroborar si el usuario esta autenticado, sino redirijo a login
export function isPremium(req, res, next) {
	if (req.user.role === 'premium') {
		next();
	} else {
		res.status(403).send({ status: 'error', message: 'access denied, you do not have permission to be here' });
	}
}


export function isAdminOrPremium(req, res, next) {
	const dateTime = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
	if (req.user.role === 'admin' || req.user.role === 'premium') {
		req.logger.info(`${dateTime} - Admin/Premium Access ${req.user.first_name} ${req.user.last_name} ${req.user.email}`);
		next();
	} else {
		res.status(403).send({ status: 'error', message: 'access denied, you do not have permission to be here' });
	}
}

//Middleware para corroborar si el usuario esta autenticado, sino redirijo a login
export function isUser(req, res, next) {
	if (req.user.role === 'user') {
		next();
	} else {
		res.status(403).send({ status: 'error', message: 'access denied, you do not have permission to be here' });
	}
}

//Middleware para corroborar si el usuario esta autenticado, sino redirijo a login
export function isUserOrPremium(req, res, next) {
	if (req.user.role === 'user' || req.user.role === 'premium') {
		next();
	} else {
		res.status(403).send({ status: 'error', message: 'access denied, you do not have permission to be here' });
	}
}
