import jwt from 'jsonwebtoken';
import environment from '../config/environment.js';

const validateTokenRestorePass = (req, res, next) => {
	const { token } = req.query;
	if (!token) res.send('access denied');

	jwt.verify(token, environment.restorepasskey, (err, user) => {
		if (err) {
			res.send('access denied, token expired or incorrect');
		} else {
			next();
		}
	});
};

export { validateTokenRestorePass };
