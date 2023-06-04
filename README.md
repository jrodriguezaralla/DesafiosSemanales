# Preentrega 15 - Mongo/Mongoose

Desarrollo de un servidor implementando base de datos MongoDb, modificando el proyecto para que funicione con las mismas y no con FileSystem.

## Routers

### El router "/" implementa

-   GET: _/_ - Renderiza el listado de productos en home
-   GET: _/realtimeproducts_ - Renderiza los productos en tiempo real
-   GET: _/chat_ - chat, guarda mensajes en base de datos

### El router "/api/productos" implementa

-   GET: _/_ - Me permite listar todos los productos
-   GET: _/:pid_ - Me permite listar un producto por su id
-   POST: _/_ - Para incorporar productos al listado
-   PUT: _/:pid_ - Actualiza un producto por su id
-   DELETE: _/:pid_ - Borra un producto por su id

### El router base "/api/carrito" implementa

-   POST: _/_ - Crea un carrito y devuelve su id.
-   GET: _/:cid_ - Me permite listar todos los productos guardados en el carrito llamado por su ID
-   POST: _/:cid/product/:pid_ - Para incorporar productos al carrito por su id de producto, por el momento se utiliza el ID automático de mongo para asignar los IDs de productos

### El router "/messages" implementa

-   GET: _/_ - Me permite listar todos los mensajes

## Correr de forma local

Clonar proyecto

```bash
  git clone https://github.com/jrodriguezaralla/DesafiosSemanales.git
```

Ir a la carpeta del proyecto

```bash
  cd ..../DesafiosSemanales
```

Instalar dependencias

```bash
  npm install -g nodemon
  npm init -y
  npm install express express-handlebars mongoose socket.io
```

Inciar servidor

```bash
  npm run start
```
