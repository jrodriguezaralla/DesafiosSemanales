import passport from 'passport';
import local from 'passport-local';
import userService from '../dao/service/User.service.js';
import { hashPassword, comparePassword } from '../utils/encrypt.util.js';
import GitHubStrategy from 'passport-github2';

const LocalStrategy = local.Strategy;
const initializePassport = () => {
	//Estrategia para registrar
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

	//Estrategia login
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

	//Estrategia login con GitHub
	passport.use(
		'github',
		new GitHubStrategy(
			{
				clientID: 'Iv1.c623391f18ee226a',
				clientSecret: '5519d07036793572abee5b4698dda6b25140edfb',
				callbackURL: 'http://localhost:8080/api/users/githubcallback',
			},
			async (accessToken, refreshToken, profile, done) => {
				try {
					console.log(profile);
					let user = await userService.getByEmail(profile._json.email);
					if (!user) {
						let newUser = {
							first_name: profile._json.name,
							last_name: '',
							email: profile._json.email,
							password: '',
							img: profile._json.avatar_url,
						};
						user = await userService.createUser(newUser);
						done(null, user);
					} else {
						done(null, user);
					}
				} catch (error) {
					done(error, false);
				}
			}
		)
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
