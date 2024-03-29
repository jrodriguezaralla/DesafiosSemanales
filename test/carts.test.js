import chai from 'chai';
import supertest from 'supertest';
import environment from '../src/config/environment.js';

const expect = chai.expect;
const request = supertest('http://localhost:8080');

describe('Test de integracion - Carrito', () => {
	let productId = '648d03e20a7231cb7170ea26';
	let cartId;
	let authTokenCookie;
	const user = {
		username: 'q@q',
		password: '1',
	};

	it('Verificando creación de nuevo carrito', async () => {
		const response = await request.post('/api/carts');
		expect(response.status).to.equal(200);
		expect(response._body.status).to.be.ok.and.equal('success');
		expect(response._body.cartId).to.not.equal('');	
		cartId = response._body.cartId; // guardo elcarti id para usarlo despues
	});

	it('Verificando agregar un producto al carrito creado', async () => {
		//logueo con usuario de prueba para probar agregar un producto
		const authResponse = await request.post('/api/users/auth').send(user);
		authTokenCookie = authResponse.headers['set-cookie']; //guardo el token para usarlo despues

		const cartResponse = await request.post(`/api/carts/${cartId}/product/${productId}`).set('Cookie', authTokenCookie);
		expect(cartResponse.status).to.equal(200);
		expect(cartResponse._body.status).to.be.ok.and.equal('success');
	});

	it('Verificando actualizar cantidades de producto en el carrito', async () => {
		const cartResponse = await request.put(`/api/carts/${cartId}/product/${productId}`).set('Cookie', authTokenCookie).send({"quantity" : 10});
		expect(cartResponse.status).to.equal(200);
		expect(cartResponse._body).to.have.property('_id');
	});

	it('Verificando borrar un producto del carrito', async () => {
		const cartResponse = await request.delete(`/api/carts/${cartId}/product/${productId}`).set('Cookie', authTokenCookie);
		expect(cartResponse.status).to.equal(200);
		expect(cartResponse._body.status).to.be.ok.and.equal('success');
	});

	after(async () => {
		//elimino carrito creado para el test
		const cartResponse = await request.delete(`/api/carts/delete/${cartId}`);
		expect(cartResponse._body.status).to.be.ok.and.equal('success');
		//cierro sesion de usuario
		const userResponse = await request.post(`/api/users/logout`);
	});
});
