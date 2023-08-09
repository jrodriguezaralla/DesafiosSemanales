import { Router } from 'express';
import CustomError from '../tools/CustomErrors.js';
import EErrors from '../tools/EErrors.js';

const loggerRouter = Router();

//Endpoint que muestra los mensajes
loggerRouter.get('/', async (req, res, next) => {
	try {
		req.logger.fatal('Log de Fatal');
		req.logger.warning('Log de Warning');
		req.logger.info('Log de Info');
		req.logger.http('Log de Http');
		req.logger.debug('Log de Debug');
		req.logger.error('Log de Error ');

		res.send('Prueba de logs OK');
	} catch (error) {
		next(error);
	}
});

export { loggerRouter };
