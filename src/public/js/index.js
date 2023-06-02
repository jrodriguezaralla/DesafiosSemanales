const socket = io(); // se levantta socket del lado del cliente
let user;
const inputMSJ = document.getElementById('msj');

//Función para renderizar los productos
function render(data) {
	const contenedorProductos = document.getElementById('productsList');
	contenedorProductos.innerText = ''; // Borro el contenido para pintar los productos 1 vez sobreescribiendo los mismos
	data.forEach((elem) => {
		//por cada elemento genero un div y lo agrego en el body
		let div = document.createElement('div');
		div.className = 'card';
		div.innerHTML = `
					<h2>Product ID:${elem._id} </h2>
					<p>Title: ${elem.title}</p>
					<p>description: ${elem.description} </p>
					<p>code: ${elem.code} </p>
					<p>price: ${elem.price} </p>
					<p>status: ${elem.status} </p>
					<p>stock: ${elem.stock} </p>
					<p>category: ${elem.category} </p>
					<p>thumbnail: ${elem.thumbnail} </p>
				`;
		contenedorProductos.append(div); //agrego div
	});
}

Swal.fire({
	title: 'Ingrese dirección de email',
	input: 'email',
	inputPlaceholder: 'Ingrese su dirección de correo',
	inputValidator: (value) => {
		return (
			!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value) &&
			'dirección de correo invalida, ingrese nuevamente' //Expresion regular para validar email
		);
	},
	allowOutsideClick: false,
}).then((result) => {
	user = result.value;
	socket.emit('sayhello', user);
});

function renderMensajes(data) {
	// Genero el html
	const html = data
		.map((elem) => {
			// Recorro el array de mensajes y genero el html
			return `<div>
				<strong>${elem.user}:</strong>
                <em>${elem.msj}</em>
            </div>`;
		})
		.join(' '); // Convierto el array de strings en un string

	// Inserto el html en el elemento con id messages
	document.getElementById('messages').innerHTML = html;
}

inputMSJ.addEventListener('keyup', (event) => {
	if (event.key === 'Enter') {
		let msj = inputMSJ.value;
		if (msj.trim().length > 0) {
			socket.emit('message', { user, msj });
			inputMSJ.value = '';
		}
	}
});

// Escucho el evento real_time_products y renderizo los productos que recibo por parametro
socket.on('real_time_products', (data) => {
	render(data);
});

socket.on('messages', (data) => {
	renderMensajes(data);
});
