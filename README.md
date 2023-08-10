# Desafio - Clase 34- logging

Desarrollo de un servidor implementando base de datos MongoDb, modificando el proyecto para que funicione con las mismas y no con FileSystem.

## Routers

### El router "/" implementa

-   GET: _/_ - Rendirecciona a pantalla de login
-   GET: _/products_ - Renderiza el listado de productos en home
-   GET: _/realtimeproducts_ - Renderiza los productos en tiempo real
-   GET: _/chat_ - chat, guarda mensajes en base de datos
-   GET: _/carts/:cid_ - Muestra los productos de un carrito determinado
-   GET: _/registeredok_ - Muestra cartel de Rigistro Aceptado
-   GET: _/login_ - Renderiza pantalla de login

### El router "/api/products" implementa

-   GET: _/_ - Me permite listar todos los productos
-   GET: _/:pid_ - Me permite listar un producto por su id
-   POST: _/_ - Para incorporar productos al listado
-   PUT: _/:pid_ - Actualiza un producto por su id
-   DELETE: _/:pid_ - Borra un producto por su id

### El router base "/api/carts" implementa

-   POST: _/_ - Crea un carrito y devuelve su id.
-   GET: _/:cid_ - Me permite listar todos los productos guardados en el carrito llamado por su ID
-   POST: _/:cid/product/:pid_ - Para incorporar productos al carrito por su id de producto, por el momento se utiliza el ID automático de mongo para asignar los IDs de productos
-   DELETE: _/:cid/products/:pid_ elimina del carrito el producto seleccionado.
-   PUT: _/:cid_ actualiza el carrito con un nuevo arreglo de productos.
-   PUT: _/:cid/products/:pid_ actualiza SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
-   DELETE: _/:cid_ elimina todos los productos del carrito
-   DELETE: _/:cid/purchase_ Confirmación de compra

### El router "/messages" implementa

-   GET: _/_ - Me permite listar todos los mensajes

### El router "/mockingproducts" implementa

-   GET: _/_ - Me genera un mock de productos

### El router "/loggerTest" implementa

-   GET: _/_ - Realiza un Test de logs de Winston

### El router "/api/sessions" implementa

-   GET: _/github_ - inicio de sesion con github
-   GET: _/githubcallback_ - callback de github
-   GET: _/current_ - Me permite ver sesion actual

### El router "/api/users" implementa

-   POST: _/_ - registro de usuario
-   GET: _/failregister_ - vista para renderizar error de registro
-   POST: _/auth_ - atenticación de usuario y contraseña
-   GET: _/faillogin_ - vista para renderizar error de login
-   GET: _/logout_ - elimina token de sesion

### El router "/email" implementa

-   POST: _/_ - envia email de confirmación de compra

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
  npm install


```

Inciar servidor

```bash
  node src/app.js --mode "mode"
```

> "mode"= dev -> Entorno desarrollo
>
> "mode"= prod -> Entorno produccion
