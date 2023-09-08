import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const request = supertest('http://localhost:8080');

describe('Test de integracion - Sesiones', () => {
	let cookie = {};
	let productId;

	after(() => {
		request.delete(`/api/products/${userId}`).then((result) => {
			const { _body } = result;
			expect(_body).to.be.ok;
			expect(_body.payload).to.be.ok;
			expect(_body.payload.deletedCount).to.be.ok.and.equal(1);
		});
	});

	it('Se debe poder crear un producto correctamente correctamente', () => {
		const product = {
			title: 'MICROCELL',
			description: 'lala12',
			code: 'lala12',
			price: 43,
			status: true,
			stock: 100,
			category: 'lala',
			thumbnail: ['/MC12-12.jpg'],
		};

		request
			.post('/api/products')
			.send(product)
			.then((result) => {
				const { _body } = result;
				productId = _body.payload._id;
				expect(_body).to.be.ok;
			});
	});

	it('Se debe poder iniciar sesion correctamente (USO DE COOKIE)', () => {
		const user = {
			email: 'cosme_fulanito@gmail.com',
			password: '123',
		};

		request
			.post('/api/users/auth')
			.send(user)
			.then((result) => {
				const cookieResult = result.headers['set-cookie'][0];

				expect(cookieResult).to.be.ok;

				cookie = {
					name: cookieResult.split('=')[0],
					value: cookieResult.split('=')[1],
				};

				//expect(cookie.name).to.be.ok.and.equal('coderCookie');
				expect(cookie.token).to.be.ok;
			});
	});

	it('Se debe poder actualizar la contraseña', () => {
		request.get('/api/sessions//restorepass').then((result) => {
			const { _body } = result;
			//expect(_body.payload).to.be.ok;
			//expect(_body.payload.email).to.be.ok.and.equal('jwuan@perez2.com');
		});
	});

	it('Se debe poder actualizar el rol de un usuario de user a premium y viceversa', () => {
		request.get('/api/sessions//restorepass').then((result) => {
			const { _body } = result;
			expect(_body.status).to.be.ok.and.equal('success');
			//expect(_body.payload).to.be.ok;
			//expect(_body.payload.email).to.be.ok.and.equal('jwuan@perez2.com');
		});
	});
});
