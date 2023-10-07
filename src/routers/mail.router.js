import { Router } from 'express';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import environment from '../config/environment.js';

const mailRouter = Router();
const RESTORE_PASS_URL = 'http://localhost:8080/restorepassview';

export const transport = nodemailer.createTransport({
	service: 'gmail',
	port: 587,
	auth: {
		user: environment.hostMail,
		pass: 'zxnr rhxp lxgs fjaq',
	},
});

//Endpoint que envia email con la compra
mailRouter.post('/', async (req, res) => {
	try {
		let { newTicket } = req.body; //recibo por body los datos
		let result = await transport.sendMail({
			from: environment.hostMail,
			to: `${newTicket.purchaser}`,
			subject: `Gracias por su compra`,
			html: `
            <div>
                <h1>Nueva Compra ${newTicket.code}</h1>
                <p>compra realizada el ${newTicket.purchase_datetime}</p>
                <p>Total de la compra: USD ${newTicket.amount}</p>
            </div>
            `,
			attachments: [],
		});
		res.send(result);
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que envia email para restablecer contraseña
mailRouter.post('/restorepassword', async (req, res) => {
	try {
		let { email } = req.body; //recibo por body los datos
		const token = jwt.sign({ email }, environment.restorepasskey, { expiresIn: '1h' });
		const url = RESTORE_PASS_URL + '?token=' + token;

		let result = await transport.sendMail({
			from: environment.hostMail,
			to: `${email}`,
			subject: `EncontraDeTodo - Restablecer contraseña`,
			html: `
            <div>
                <h3>Para restablecer tu contraseña haz click en el siguiente boton</h3>
                <button type="button" style="background-color: #0d6efd; border-radius: 0.4rem; border:none; padding: 8px;">
					<a href=${url} style="text-decoration: none; color: #FFF; ">Restablecer Contraseña</a>
				</button>
            </div>
            `,
			attachments: [],
		});
		res.redirect('/');
	} catch (error) {
		res.status(400).send(error);
	}
});

//Endpoint que envia email para dar aviso de que un prodcuto fue eliminado
mailRouter.post('/deleteproduct', async (req, res) => {
	try {
		let { email, product } = req.body; //recibo por body los datos
		let result = await transport.sendMail({
			from: environment.hostMail,
			to: `${email}`,
			subject: `Eliminación de prodcuto`,
			html: `
            <div>
                <p>Informamos que el producto codigo: ${product.code} y ID:${product._id} fue eliminado</p>
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
