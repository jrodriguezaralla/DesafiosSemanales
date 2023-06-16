import { Router } from 'express';

const sessionRouter = Router();

sessionRouter.get('/', (req, res) => {
	res.send('Bienvenido');
});

sessionRouter.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (!err) {
			res.send('session closed');
		} else {
			res.status(500).send({ status: 'logout ERROR', body: err });
		}
	});
});

export { sessionRouter };
