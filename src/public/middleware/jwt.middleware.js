import jwt from 'jsonwebtoken';
const privatekey = 'privatekey';
import passport from 'passport';

const generateToken = (user) => {
	return jwt.sign({ user }, privatekey, { expiresIn: '1h' });
};

const middlewarePassportJWT = async (req, res, next) => {
	passport.authenticate('jwt', { session: false }, (err, usr, info) => {
		if (err) {
			next(err);
		}

		if (!usr) {
			res.status(401).json({ status: 'error', message: 'user/password incorrect' });

			/*send({
				message: info.messages ? info.messages : info.toString(),
			});*/
		}

		req.user = usr;
		next();
	})(req, res, next);
};

export { generateToken, middlewarePassportJWT };
