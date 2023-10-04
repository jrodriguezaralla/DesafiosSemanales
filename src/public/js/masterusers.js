let btnEditUser = document.querySelectorAll('.btnEditUser'); // NodeList = [button#1, button#2 .... , button#n] array con todos los botones
let btnDeleteUser = document.querySelectorAll('.btnDeleteUser'); // NodeList = [button#1, button#2 .... , button#n] array con todos los botones
let btnDeleteAllUsers = document.getElementById('btnDeleteAllUsers');

let inputRole = document.getElementById('inputRole');


let btnSaveUpdatedUser = document.getElementById('btnSaveUpdatedUser');

let userId;
let userDeleteId;
let user;

//Evento de boton agregar producto a carrito
btnEditUser.forEach((el) => {
	//por cada boton agrego elevento
	el.addEventListener('click', async (e) => {
		
		let str = e.target.id
		let parts = str.split("btnEdit")
		userId = parts[1]
		
		
		//fetch para obtener datos de la sesion actual
		await fetch(`/api/users/${userId}`)
			.then((res) => res.json())
			.then((data) => {
				user = data.payload
			});
		inputRole.value = user.role;

	});
});

//Evento de boton agregar producto a carrito
btnDeleteUser.forEach((el) => {
	//por cada boton agrego elevento
	el.addEventListener('click', async (e) => {
		let str = e.target.id;
		let parts = str.split('btnDelete');
		userDeleteId = parts[1];
		let cartId;
		//fetch para obtener datos de la sesion actual
		await fetch(`/api/users/${userDeleteId}`)
			.then((res) => res.json())
			.then((data) => {
				user = data.payload;
			});
		cartId = user.cartId;
		//alert para confirmar el borrado
		Swal.fire({
			title: 'Esta seguro que desea eliminar producto?',
			text: 'No podra volver atras!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#212529',
			cancelButtonColor: '#dc3545',
			confirmButtonText: 'Si, deseo borrar!',
		}).then(async (result) => {
			if (result.isConfirmed) {
				//fetch a ruta para eliminar productos
				await fetch(`/api/users/${userDeleteId}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				//fetch a ruta para eliminar productos
				await fetch(`/api/carts/delete/${cartId}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				//Alert con la confirmación del borrado
				Swal.fire({
					title: 'Usuario borrado!',
					icon: 'success',
					confirmButtonColor: '#212529',
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						window.location.replace('/masterusers');
					}
				});
			}
		});
	});
});


btnSaveUpdatedUser.addEventListener('click', async (e) => {
	let newUser = {
		email: user.email,
		role: inputRole.value
	};

	//fetch para agregar los productos al carrito
	await fetch(`/api/users/`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newUser),
	});
	//alert con confirmación de operación
	Swal.fire({
		title: 'Usuario actualizado!',
		//text: 'Muchas Gracias, vuelva pronto.',
		icon: 'success',
		confirmButtonColor: '#212529',
	}).then((result) => {
		/* Read more about isConfirmed, isDenied below */
		if (result.isConfirmed) {
			window.location.replace('/masterusers');
		}
	});
});

btnDeleteAllUsers.addEventListener("click",(e)=>{
	Swal.fire({
		title: 'Seguro desea continuar?',
		text: 'se eliminaran todos los usuarios que no hayan tenido conexión en los últimos 2 dias',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#212529',
		cancelButtonColor: '#dc3545',
		confirmButtonText: 'Si, deseo borrar!',
	}).then(async (result) => {
		if (result.isConfirmed) {
			//fetch a ruta para eliminar productos
			await fetch(`/api/users/`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			//Alert con la confirmación del borrado
			Swal.fire({
				title: 'Usuarios borrados!',
				icon: 'success',
				confirmButtonColor: '#212529',
			}).then((result) => {
				/* Read more about isConfirmed, isDenied below */
				if (result.isConfirmed) {
					window.location.replace('/masterusers');
				}
			});
		}
	});
})