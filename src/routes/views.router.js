import { Router } from 'express';

const viewsRouter = Router();

//Endpoint que muestra un usuario
viewsRouter.get('/', async (req, res) => {
	try {
		let testUser = {
			name: 'Pedro',
			last_name: 'Martinez',
		};
		res.render('index', {
			name: testUser.name,
			style: 'index.css',
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

export { viewsRouter };
