const btnLogin = document.getElementById('btnLogin');
const InputEmail = document.getElementById('InputEmail');
const InputPassword = document.getElementById('InputPassword');
const loginError = document.getElementById('loginError');

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
