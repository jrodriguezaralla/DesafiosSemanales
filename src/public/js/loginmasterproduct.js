const btnLogInMasterProduct = document.getElementById('btnLogInMasterProduct');

btnLogInMasterProduct.addEventListener('click', async () => {
	const username = document.getElementById('LogInInputEmailMasterProducts').value;
	const password = document.getElementById('LogInInputPassMasterProducts').value;
	const user = { username, password };

	//realizo un post para loguear
	fetch('/api/users/auth', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then((response) => response.json())
		.then((data) => {
			//cuando obtengo la respuesta redirijo
			if (data.status === 'success') {
				window.location.replace('/masterproducts');
			}
			if (data.status === 'error') {
				//sino, indico error de logueo
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: `${data.message}`,
				});
			}
		});
});
