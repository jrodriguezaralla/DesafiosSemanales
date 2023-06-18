const btnLogin = document.getElementById('btnLogin');
const InputEmail = document.getElementById('InputEmail');
const InputPassword = document.getElementById('InputPassword');

btnLogin.addEventListener('click', async () => {
	//traigo todos los botones
	const datos = {
		email: InputEmail.value,
		password: InputPassword.value,
	};
	await fetch(`/api/users/auth`, {
		//agrego endpoint
		method: 'POST',
		body: JSON.stringify(datos), // data can be `string` or {object}!
		redirect: 'follow',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(async (response) => {
		if (response.status == 200) {
			window.location.replace(response.url);
		} else if (response.status == 400) {
			window.location.replace('/login');
			await fetch(`/login`, {
				//agrego endpoint
				method: 'GET',
				body: JSON.stringify({
					user: 'error',
				}), // data can be `string` or {object}!
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}
	});
});
