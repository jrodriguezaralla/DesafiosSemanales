const socket = io(); // se levantta socket del lado del cliente
socket.emit('message', 'Hola, me estoy comunicando desde un websocket');

socket.on('evento_para_todos', (data) => {
	console.log(data);
});
