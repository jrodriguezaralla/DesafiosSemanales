let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // si tengo guardado un carrito en Local Storage lo asigno a carrito, sino le asigno un array vacio
let btnAgregarCarrito = document.querySelectorAll('.btnAgregarCarrito'); // NodeList = [button#1, button#2 .... , button#n]
const cartId = '6476a662e14fcee005c06b2c';

btnAgregarCarrito.forEach((el) => {
	el.addEventListener('click', async (e) => {
		fetch(`/api/carts/${cartId}/product/${e.target.id}`, {
			method: 'POST',
		})
			.then(() => {
				alert('Se agrego producto al carrito');
			})
			.catch((err) => {
				alert(`Error al agregar producto al carrito ${err}`);
			});
	});
});
