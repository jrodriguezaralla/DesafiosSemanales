import passport from 'passport';
import local from 'passport-local';
import userService from '../dao/service/User.service.js';
import { hashPassword, comparePassword } from '../utils/encrypt.util.js';

const LocalStrategy = local.Strategy;
const initializePassport = () => {
	passport.use(
		'register',
		new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
			const { first_name, last_name, email } = req.body;
			try {
				let user = await userService.getByEmail(email);
				if (user) {
					return done(null, false);
				}
				const newUser = {
					first_name,
					last_name,
					email,
					password: hashPassword(password),
				};
				let result = await userService.createUser(newUser);
				return done(null, result);
			} catch (error) {
				return done('Error al obtener el usuario' + error);
			}
		})
	);
	passport.use(
		'auth',
		new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
			try {
				const user = await userService.getByEmail(username);
				if (!user) {
					return done(null, false);
				}
				if (!comparePassword(user, password)) {
					return done(null, false);
				}
				return done(null, user);
			} catch (error) {
				return done(error);
			}
		})
	);
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser(async (id, done) => {
		let user = await userService.getById(id);
		done(null, user);
	});
};

export default initializePassport;
