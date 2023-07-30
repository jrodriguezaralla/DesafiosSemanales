import { Router } from 'express';
import nodemailer from 'nodemailer';

const mailRouter = Router();

const transport = nodemailer.createTransport({
	service: 'gmail',
	port: 587,
	auth: {
		user: 'jrodriguez.aralla@gmail.com',
		pass: 'zxnr rhxp lxgs fjaq',
	},
});

//Endpoint que muestra los mensajes
mailRouter.get('/', async (req, res) => {
	try {
		let result = await transport.sendMail({
			from: 'jrodriguez.aralla@gmail.com',
			to: 'jrodriguez.aralla@gmail.com',
			subject: 'correo de prueba',
			html: `
            <div>
                <h1>Prueba</h1>
            </div>
            `,
			attachments: [],
		});
		res.send(result);
	} catch (error) {
		res.status(400).send(error);
	}
});

export { mailRouter };
