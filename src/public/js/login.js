//Elementos Login
const btnLogin = document.getElementById('btnLogin');
const InputEmail = document.getElementById('InputEmail');
const InputPassword = document.getElementById('InputPassword');
const loginError = document.getElementById('loginError');

//Elementos Registro
const btnRegistrar = document.getElementById('btnRegistrar');
const InputFirstName = document.getElementById('first_name');
const InputLastName = document.getElementById('last_name');
const InputEmailRegistro = document.getElementById('email');
const InputPasswordRegistro = document.getElementById('password');

//Evento al presionar boton de Iniciar Sesion
btnLogin.addEventListener('click', async () => {
	//traigo los valores de los campos input
	const datos = {
		email: InputEmail.value,
		password: InputPassword.value,
	};
	//Realizo post
	await fetch(`/api/users/auth`, {
		method: 'POST',
		body: JSON.stringify(datos),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.status === 'success') {
				//Si tengo sucess en la respuesta redirijo a la vista productos
				window.location.replace('/products');
			}
			if (data.status === 'error') {
				//Sino informo error
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'usuario y/o contraseña incorrectos',
				});
			}
		});
});

//Evento de presionar boton registrar
btnRegistrar.addEventListener('click', async () => {
	//traigo los valores de los campos input
	const datos = {
		first_name: InputFirstName.value,
		last_name: InputLastName.value,
		email: InputEmailRegistro.value,
		password: InputPasswordRegistro.value,
	};
	//Realizo post
	await fetch(`/api/users/`, {
		method: 'POST',
		body: JSON.stringify(datos),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.status === 'success') {
				//Si obtengo un success en la respuesta registro usuario
				Swal.fire({
					icon: 'success',
					text: 'Se ha registrado correctamente',
				}).then((result) => {
					//Redirijo a login
					if (result.isConfirmed) {
						window.location.replace('/login');
					}
				});
			}
			if (data.error) {
				//-}Si mongo me devuelve que el email ya esta registrado retorno alert de error
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'email ya registrado',
				}).then((result) => {
					if (result.isConfirmed) {
						window.location.replace('/login'); //redirijo a login
					}
				});
			}
		});
});
