let btnEditProduct = document.querySelectorAll('.btnEditProduct'); // NodeList = [button#1, button#2 .... , button#n] array con todos los botones
let btnDeleteProduct = document.querySelectorAll('.btnDeleteProduct'); // NodeList = [button#1, button#2 .... , button#n] array con todos los botones



let inputTitle = document.getElementById('inputTitle');
let inputDescription = document.getElementById('inputDescription');
let inputCode = document.getElementById('inputCode');
let inputPrice = document.getElementById('inputPrice');
let inputStatus = document.getElementById('inputStatus');
let inputStock = document.getElementById('inputStock');
let inputCategory = document.getElementById('inputCategory');
let inputThumbnail = document.getElementById('inputThumbnail');
let inputOwner = document.getElementById('inputOwner');

let btnSaveUpdatedProduct = document.getElementById('btnSaveUpdatedProduct');
let productId;

//Evento de boton agregar producto a carrito
btnEditProduct.forEach((el) => {
	//por cada boton agrego elevento
	el.addEventListener('click', async (e) => {
		
		let str = e.target.id
		let parts = str.split("btnEdit")
		productId = parts[1]
		let product
		
		//fetch para obtener datos de la sesion actual
		await fetch(`/api/products/${productId}`)
			.then((res) => res.json())
			.then((data) => {
				product = data[0]
			});
		console.log(product);
		inputTitle.value = product.title;
		inputDescription.value = product.description;
		inputCode.value = product.code;
		inputPrice.value = product.price;
		inputStatus.value = product.status;
		inputStock.value = product.stock;
		inputCategory.value = product.category;
		inputThumbnail.value = product.thumbnail;
		inputOwner.value = product.owner;
	});
});

btnSaveUpdatedProduct.addEventListener('click', async (e) => {
	console.log(productId);

	let newProduct = {
		title: inputTitle.value,
		description: inputDescription.value,
		code: inputCode.value,
		price: inputPrice.value,
		status: inputStatus.value,
		stock: inputStock.value,
		category: inputCategory.value,
		thumbnail: inputThumbnail.value,
		owner: inputOwner.value,
	};

	//fetch para agregar los productos al carrito
	await fetch(`/api/products/${productId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newProduct),
	});
	//alert con confirmación de operación
	Swal.fire({
		title: 'Producto actualizado!',
		//text: 'Muchas Gracias, vuelva pronto.',
		icon: 'success',
		confirmButtonColor: '#212529',
	}).then((result) => {
		/* Read more about isConfirmed, isDenied below */
		if (result.isConfirmed) {
			window.location.replace('/masterproducts');
		}
	});
});