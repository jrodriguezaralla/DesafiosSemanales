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
	}).then((response) => window.location.replace(response.url));
});
