function backToProducts() {
	window.location.replace('/products');
}

async function BePremium(){
	let userId;
	///fetch para obtener datos de la sesion actual
	await fetch('/api/sessions/current')
		.then((res) => res.json())
		.then((data) => {
			userId = data._id;
			console.log(userId)
		});

		///premium/:uid
}