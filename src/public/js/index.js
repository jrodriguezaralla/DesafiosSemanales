const socket = io(); // se levantta socket del lado del cliente

function render(data) {
	// Genero el html
	const html = data.map((elem) => {
		// Recorro el array de mensajes y genero el html
		return `<div>
				<h2>Product ID${elem.id} </h2>
				<p>Title: ${elem.title}</p>
				<p>description: ${elem.description} </p>
				<p>code: ${elem.code} </p>
				<p>price: ${elem.price} </p>
				<p>status: ${elem.status} </p>
				<p>stock: ${elem.stock} </p>
				<p>category: ${elem.category} </p>
				<p>thumbnail: ${elem.thumbnail} </p>
            </div>`;
	});

	// Inserto el html en el elemento con id messages
	document.getElementById('productsList').innerHTML = html;
}

// Escucho el evento messages y renderizo los mensajes
socket.on('products', (data) => {
	render(data);
});
