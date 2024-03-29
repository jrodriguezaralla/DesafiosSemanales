import chai from 'chai';
import supertest from 'supertest';
import environment from '../src/config/environment.js';

const expect = chai.expect;
const request = supertest('http://localhost:8080');

describe('Test de integracion - Productos', () => {
	let authTokenCookie;
	let productId;

	it('Verificando listado de productos', async () => {
		const response = await request.get('/api/products')
		expect(response.status).to.equal(200);
		expect(response._body.status).to.be.ok.and.equal('success');
	});

	it('Verificando creación de producto', async () => {
		const product = {
			title: 'REMERA OVERSIZE',
			description: 'remera oversize talle único colo negra',
			code: 'R003',
			price: 43,
			status: true,
			stock: 100,
			category: 'Remeras',
			thumbnail: ['https://acdn.mitiendanube.com/stores/001/966/536/products/1024x1024-21-b321421924a8680bc316440191914454-640-0.webp'],
		};

		const user = {
			username: environment.adminName,
			password: environment.adminPassword,
		};
		const response = await request.post('/api/users/auth').send(user);
		authTokenCookie = response.headers['set-cookie'];
		const {_body} = await request.post('/api/products').set('Cookie',authTokenCookie).send(product);
		productId= _body.payload._id;
		expect(_body.status).to.be.ok.and.equal('success');
		expect(_body.payload).to.have.property('_id');
	});

	it('Verificando buscar producto por su ID', async () => {
		const response = await request.get(`/api/products/${productId}`);
		expect(response._body).to.have.property('_id');
	});

	it('Verificando modificar producto', async () => {
		const product = {
			title: 'REMERA OVERSIZE',
			description: 'remera oversize talle único colo negra',
			code: 'R035',
			price: 60,
			status: true,
			stock: 150,
			category: 'Remeras',
			thumbnail: ['https://acdn.mitiendanube.com/stores/001/966/536/products/1024x1024-21-b321421924a8680bc316440191914454-640-0.webp'],
		};

		const response = await request.put(`/api/products/${productId}`).set('Cookie', authTokenCookie).send(product);
		expect(response._body.status).to.be.ok.and.equal('success');
	});

	after(async () => {
		const { _body } = await request.delete(`/api/products/${productId}`).set('Cookie',authTokenCookie);
		expect(_body.status).to.be.ok.and.equal('success');

		const response = await request.post(`/api/users/logout`);
		// Obtiene las cookies de la respuesta
		const cookies = response.headers['set-cookie'];
		// Encuentra la cookie 'token' en las cookies
		let tokenCookie;
		if (cookies) {
			for (const cookie of cookies) {
				if (cookie.startsWith('token=')) {
					tokenCookie = cookie;
					break;
				}
			}
		}
		// Parseo la cookie para obtener el valor del token
		const tokenValue = tokenCookie.split('=')[1].split(';')[0];
		// Verifica que la cookie 'token' se haya borrado
		expect(tokenValue).to.be.equal('');
	});
});
