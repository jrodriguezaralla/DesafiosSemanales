function login() {
	const username = document.getElementById('loginEmail').value;
	const password = document.getElementById('loginPassword').value;
	const user = { username, password };
	fetch('/api/users/auth', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			window.location.replace('/products');
		})
		.catch((error) => {
			//console.error('Error:', error);
		});
}
