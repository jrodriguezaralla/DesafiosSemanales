import jwt from 'jsonwebtoken';
import environment from '../config/environment.js';

const validateTokenRestorePass = (req, res, next) => {
	const { token } = req.query;
	if (!token) es.json({ status: 'error', message: 'access denied' });

	jwt.verify(token, environment.restorepasskey, (err, user) => {
		if (err) {
			res.json({ status: 'error', message: 'access denied, token expired or incorrect' });
		} else {
			next();
		}
	});
};

export { validateTokenRestorePass };
