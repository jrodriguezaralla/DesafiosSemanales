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

btnLogin.addEventListener('click', async () => {
	//traigo todos los botones
	const datos = {
		email: InputEmail.value,
		password: InputPassword.value,
	};
	await fetch(`/api/users/auth`, {
		//agrego endpoint
		method: 'POST',
		body: JSON.stringify(datos),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.status === 'sucess') {
				window.location.replace('/products');
			}
			if (data.status === 'error') {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'usuario y/o contraseña incorrectos',
				});
			}
		});
});

btnRegistrar.addEventListener('click', async () => {
	const datos = {
		first_name: InputFirstName.value,
		last_name: InputLastName.value,
		email: InputEmailRegistro.value,
		password: InputPasswordRegistro.value,
	};

	await fetch(`/api/users/`, {
		//agrego endpoint
		method: 'POST',
		body: JSON.stringify(datos),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data.status === 'sucess') {
				Swal.fire({
					icon: 'sucess',
					text: 'Se ha registrado correctamente',
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						window.location.replace('/login');
					}
				});
			}
			if (data.error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'email ya registrado',
				}).then((result) => {
					if (result.isConfirmed) {
						window.location.replace('/login');
					}
				});
			}
		});
});
