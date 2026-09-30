# Backend Turnos y Reservas

Proyecto backend desarrollado con **Node.js** y **Express**, utilizando **ESM (ECMAScript Modules)**, para la gestión de servicios y reservas dentro de un sistema de turnos.

El proyecto implementa una API REST organizada mediante una arquitectura en capas, separando las responsabilidades de cada componente:

* **Routes:** definición de endpoints.
* **Controllers:** recepción de requests y envío de responses.
* **Services:** lógica de negocio y validaciones.
* **Repositories:** intermediarios entre los Services y los DAO.
* **DAO:** acceso directo y persistencia de datos.
* **MongoDB:** almacenamiento de la información.

La arquitectura permite mantener el código organizado y facilita el reemplazo o modificación de la capa de persistencia sin afectar las demás capas de la aplicación.

---

# 📌 Objetivo del proyecto

El objetivo es desarrollar y organizar una API backend para administrar los servicios disponibles y las reservas de un sistema de turnos.

La API permite:

* Consultar servicios.
* Buscar servicios por ID.
* Filtrar servicios por categoría.
* Filtrar servicios según disponibilidad.
* Crear nuevos servicios.
* Modificar servicios existentes.
* Eliminar servicios.
* Crear reservas.
* Consultar reservas por ID.
* Agregar servicios a una reserva.
* Crear y consultar mensajes.

La arquitectura separa las responsabilidades entre **Routes, Controllers, Services, Repositories y DAO**, permitiendo una estructura clara y preparada para trabajar con una base de datos.

---

# 🏗️ Arquitectura en capas

El flujo de las peticiones sigue la siguiente estructura:

```text
Router
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
DAO
   ↓
Mongoose
   ↓
MongoDB Atlas
```

### Routes

Los routers se encargan de definir los endpoints y conectarlos con los métodos correspondientes de los Controllers.

No contienen lógica de negocio ni acceso directo a MongoDB.

### Controllers

Los Controllers reciben las requests y trabajan con:

* `req.params`
* `req.query`
* `req.body`

Luego llaman a los Services correspondientes y construyen las respuestas mediante `res.status().json()`.

Los Controllers no acceden directamente a MongoDB ni contienen la lógica de negocio principal.

### Services

Los Services contienen la lógica de negocio de la aplicación.

Entre sus responsabilidades se encuentran:

* Validar los datos recibidos.
* Aplicar filtros.
* Comprobar la existencia de entidades.
* Aplicar reglas de negocio.
* Coordinar las operaciones mediante los Repositories.

Los Services no utilizan `req` ni `res` y no acceden directamente a MongoDB.

### Repositories

Los Repositories funcionan como una capa intermedia entre los Services y los DAO.

Se encargan de utilizar los métodos del DAO y abstraer la forma en que los Services acceden a los datos.

Esto permite que la lógica de negocio no dependa directamente de la implementación de persistencia.

### DAO

Los DAO se encargan del acceso directo a los datos mediante los modelos de Mongoose.

Son responsables de realizar operaciones de persistencia como:

* Buscar documentos.
* Buscar documentos por ID.
* Crear documentos.
* Actualizar documentos.
* Eliminar documentos.

Los DAO no contienen reglas de negocio ni utilizan `req` o `res`.

---

# 🗄️ MongoDB

El proyecto utiliza **MongoDB Atlas** como base de datos y **Mongoose** como ODM para trabajar con MongoDB desde Node.js.

La base de datos utilizada es:

```text
booking_system
```

Las principales colecciones utilizadas son:

```text
services
bookings
messages
```

Los documentos utilizan un identificador `_id` generado por MongoDB/Mongoose.

En las reservas, los servicios asociados se almacenan mediante referencias `ObjectId`:

```text
services
    ↓
service: ObjectId
quantity: Number
```

Esto permite mantener la relación entre una reserva y los servicios existentes sin duplicar toda la información del servicio dentro de la reserva.

---

# 🛠️ Tecnologías utilizadas

* **Node.js**
* **Express**
* **JavaScript**
* **ESM (ECMAScript Modules)**
* **Mongoose**
* **MongoDB Atlas**
* **dotenv**
* **Postman** para realizar pruebas de los endpoints.

---

# 📁 Estructura del proyecto

```text
backend-turnos-reservas/

│
├── src/
│   │
│   ├── config/
│   │   ├── env.config.js
│   │   └── database.config.js
│   │
│   ├── controllers/
│   │   ├── services.controller.js
│   │   ├── bookings.controller.js
│   │   └── messages.controller.js
│   │
│   ├── services/
│   │   ├── services.service.js
│   │   ├── bookings.service.js
│   │   └── messages.service.js
│   │
│   ├── repositories/
│   │   ├── services.repository.js
│   │   ├── bookings.repository.js
│   │   └── messages.repository.js
│   │
│   ├── dao/
│   │   ├── services.dao.js
│   │   ├── bookings.dao.js
│   │   ├── messages.dao.js
│   │   └── models/
│   │       ├── service.model.js
│   │       ├── booking.model.js
│   │       └── message.model.js
│   │
│   ├── routes/
│   │   ├── services.router.js
│   │   ├── bookings.router.js
│   │   └── messages.routes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

> El archivo `.env` se utiliza de forma local y se encuentra incluido en `.gitignore`, por lo que no debe subirse al repositorio.

---

# 📡 API REST

La API utiliza las siguientes rutas base:

```text
/api/services
/api/bookings
/api/messages
```

---

# 🦷 Services

## 📋 GET - Obtener todos los servicios

```http
GET /api/services
```

Devuelve la lista de servicios almacenados en MongoDB.

---

## 🔎 GET - Filtrar servicios por categoría

```http
GET /api/services?category=nombreCategoria
```

Permite obtener únicamente los servicios pertenecientes a una determinada categoría.

El filtro no distingue entre mayúsculas y minúsculas.

Ejemplo:

```http
GET /api/services?category=odontología
```

---

## ✅ GET - Filtrar servicios por disponibilidad

```http
GET /api/services?available=true
```

Permite obtener los servicios según su disponibilidad.

También se pueden consultar los servicios no disponibles:

```http
GET /api/services?available=false
```

---

## 🔍 GET - Obtener un servicio por ID

```http
GET /api/services/:sid
```

Permite obtener un servicio específico utilizando su identificador de MongoDB.

Ejemplo:

```http
GET /api/services/6ab9a6f2c7ee1d10094f5922
```

Si el servicio solicitado no existe, la API devuelve:

```text
404 Not Found
```

---

## ➕ POST - Crear un servicio

```http
POST /api/services
```

Permite agregar un nuevo servicio.

Los datos se envían mediante el body de la petición en formato JSON.

Ejemplo:

```json
{
    "name": "Consulta",
    "description": "Consulta general",
    "duration": 60,
    "price": 5000,
    "category": "salud",
    "available": true
}
```

El campo `available` tiene un valor predeterminado de `true` cuando no se especifica.

Si la creación es correcta, la API responde:

```text
201 Created
```

MongoDB/Mongoose genera automáticamente el `_id` del documento.

---

## ✏️ PUT - Actualizar un servicio

```http
PUT /api/services/:sid
```

Permite modificar los datos de un servicio existente utilizando su ID.

Ejemplo:

```http
PUT /api/services/6ab9a6f2c7ee1d10094f5922
```

Los datos actualizados se envían mediante el body en formato JSON.

El ID utilizado para identificar el servicio se mantiene y no se modifica desde el body.

Si no se envía un body, la API responde:

```text
400 Bad Request
```

Si el servicio no existe, la API devuelve:

```text
404 Not Found
```

---

## 🗑️ DELETE - Eliminar un servicio

```http
DELETE /api/services/:sid
```

Permite eliminar un servicio utilizando su identificador.

Ejemplo:

```http
DELETE /api/services/6ab9a6f2c7ee1d10094f5922
```

Si el servicio existe, se elimina correctamente.

Si el ID solicitado no existe, la API devuelve:

```text
404 Not Found
```

---

# 📅 Bookings

## ➕ POST - Crear una reserva

```http
POST /api/bookings
```

Permite crear una nueva reserva.

Los datos se envían mediante el body de la petición en formato JSON.

Al crear una reserva, el campo `services` se inicializa como un array vacío.

Si la creación es correcta, la API responde:

```text
201 Created
```

---

## 🔍 GET - Obtener una reserva por ID

```http
GET /api/bookings/:bid
```

Permite consultar una reserva específica utilizando su identificador de MongoDB.

Ejemplo:

```http
GET /api/bookings/6abc3b22db77c9d2716db071
```

Si la reserva no existe, la API devuelve:

```text
404 Not Found
```

---

## ➕ Agregar un servicio a una reserva

```http
POST /api/bookings/:bid/services/:sid
```

Permite agregar un servicio existente a una reserva.

Ejemplo:

```http
POST /api/bookings/6abc3b22db77c9d2716db071/services/6ab9a6f2c7ee1d10094f5922
```

Antes de agregar el servicio se comprueba:

1. Que la reserva exista.
2. Que el servicio exista.

Si la reserva no existe:

```text
404 Not Found
```

Si el servicio no existe:

```text
404 Not Found
```

Si ambas entidades existen, el servicio se agrega a la reserva.

Si el mismo servicio ya se encuentra agregado, se incrementa su cantidad:

```json
{
    "service": "6ab9a6f2c7ee1d10094f5922",
    "quantity": 2
}
```

La relación entre la reserva y el servicio utiliza un `ObjectId`.

Esta regla de negocio se encuentra implementada en `bookings.service.js`.

---

# 💬 Messages

## 📋 GET - Obtener todos los mensajes

```http
GET /api/messages
```

Devuelve todos los mensajes almacenados en MongoDB.

---

## 🔍 GET - Obtener un mensaje por ID

```http
GET /api/messages/:id
```

Permite obtener un mensaje específico utilizando su identificador.

Ejemplo:

```http
GET /api/messages/6abc47bd4b476c2b54ef621e
```

Si el mensaje no existe, la API devuelve:

```text
404 Not Found
```

---

## ➕ POST - Crear un mensaje

```http
POST /api/messages
```

Permite crear un nuevo mensaje.

Los datos se envían mediante el body de la petición en formato JSON.

Ejemplo:

```json
{
    "user": "Valentina",
    "message": "Mensaje de prueba"
}
```

Si la creación es correcta, la API responde:

```text
201 Created
```

Mongoose genera automáticamente el `_id`, `createdAt` y `updatedAt`.

---

# ⚙️ Variables de entorno

El proyecto utiliza **dotenv** para trabajar con variables de entorno.

Se debe crear un archivo `.env` en la raíz del proyecto con las variables necesarias:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=tu_uri_de_mongodb
```

También se incluye un archivo `.env.example` como referencia:

```env
PORT=
NODE_ENV=
MONGO_URI=
```

El archivo `.env` se encuentra incluido en `.gitignore` para evitar subir información sensible al repositorio.

> Nunca se debe publicar la contraseña utilizada en la conexión a MongoDB.

---

# ▶️ Instalación y ejecución

Clonar o descargar el proyecto y acceder a su carpeta:

```bash
cd backend-turnos-reservas
```

Instalar las dependencias:

```bash
npm install
```

Crear el archivo `.env` en la raíz del proyecto y completar las variables de entorno:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=tu_uri_de_mongodb
```

Iniciar el servidor:

```bash
npm start
```

Si la conexión es correcta, se mostrará un mensaje indicando que la conexión a la base de datos fue establecida y que el servidor está escuchando en el puerto configurado.

Por ejemplo:

```text
Conexión a la base de datos establecida
Servidor escuchando en el puerto 8080
```

La API estará disponible en:

```text
http://localhost:8080
```

---

# 🧪 Pruebas de la API

Las operaciones de la API fueron probadas utilizando **Postman**.

## Services

Se realizaron pruebas sobre:

* GET de todos los servicios.
* GET de un servicio por ID.
* GET de un ID inexistente.
* Filtrado por categoría.
* Filtrado por disponibilidad.
* POST para crear servicios.
* Validación de campos obligatorios.
* PUT para actualizar servicios.
* PUT sin body.
* DELETE de servicios.
* DELETE de un ID inexistente.
* GET posterior a un DELETE para comprobar la eliminación.

## Bookings

Se realizaron pruebas sobre:

* POST para crear reservas.
* GET de reservas por ID.
* GET de reservas inexistentes.
* POST para agregar servicios a una reserva.
* Agregar nuevamente un servicio existente y comprobar el incremento de `quantity`.
* Validación de reserva inexistente.
* Validación de servicio inexistente.

## Messages

Se realizaron pruebas sobre:

* POST para crear mensajes.
* GET de todos los mensajes.
* GET de un mensaje por ID.

Las pruebas permitieron comprobar el funcionamiento de los endpoints y la correcta separación entre **Routes, Controllers, Services, Repositories y DAO**.

---

# 📦 Dependencias

El proyecto utiliza principalmente:

### Express

Framework utilizado para crear el servidor y gestionar las rutas y peticiones HTTP.

### Mongoose

ODM utilizado para trabajar con MongoDB desde Node.js, definir Schemas y Models y realizar operaciones sobre las colecciones.

### dotenv

Paquete utilizado para cargar las variables de entorno definidas en el archivo `.env`.

---

# 📚 Conceptos aplicados

Durante el desarrollo del proyecto se trabajaron conceptos de:

* Node.js
* Express
* ESM
* Importación y exportación de módulos
* Variables de entorno
* dotenv
* MongoDB
* MongoDB Atlas
* Mongoose
* Schemas
* Models
* ObjectId
* Referencias entre documentos
* Routing
* API REST
* Métodos HTTP
* CRUD
* Query parameters
* Route parameters
* Controllers
* Services
* Repositories
* DAO
* Arquitectura en capas
* Separación de responsabilidades
* Validación de datos
* Manejo de errores
* Clases y métodos
* Persistencia de datos
* Pruebas de API con Postman

---

# 👩‍💻 Autor

**Andrea Valentina Santamaria**

Proyecto desarrollado como parte del curso **Backend 1 - Coderhouse**.
