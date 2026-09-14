# Backend Turnos y Reservas

Proyecto backend desarrollado con **Node.js** y **Express**, utilizando **ESM (ECMAScript Modules)**, para la gestión de servicios y reservas dentro de un sistema de turnos.

El proyecto implementa una API REST organizada en diferentes capas de responsabilidad:

* **Routes:** definición de endpoints.
* **Controllers:** recepción de requests y envío de responses.
* **Managers:** lógica de acceso y manipulación de datos.
* **JSON:** persistencia de la información.

---

## 📌 Objetivo del proyecto

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

La arquitectura separa las responsabilidades entre **rutas, controllers y managers**, permitiendo que el proyecto tenga una estructura más clara y preparada para futuras etapas.

---

## 🛠️ Tecnologías utilizadas

* **Node.js**
* **Express**
* **JavaScript**
* **ESM (ECMAScript Modules)**
* **dotenv**
* **JSON**
* **Postman** para realizar pruebas de los endpoints.

---

## 📁 Estructura del proyecto

```text
backend-turnos-reservas/
│
├── src/
│   ├── config/
│   │   └── env.config.js
│   │
│   ├── controllers/
│   │   ├── services.controller.js
│   │   └── bookings.controller.js
│   │
│   ├── data/
│   │   ├── services.json
│   │   └── bookings.json
│   │
│   ├── managers/
│   │   ├── ServiceManager.js
│   │   └── BookingManager.js
│   │
│   ├── routes/
│   │   ├── services.router.js
│   │   └── bookings.router.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🧩 Organización de responsabilidades

### Routes

Los routers se encargan únicamente de definir los endpoints y conectarlos con los métodos correspondientes de los controllers.

No contienen lógica de negocio ni acceso directo a los archivos JSON.

### Controllers

Los controllers reciben las requests, leen los datos enviados mediante:

* `req.params`
* `req.query`
* `req.body`

Luego interactúan con los managers y construyen la respuesta mediante `res.status().json()`.

### Managers

Los managers contienen la lógica relacionada con la manipulación y persistencia de los datos.

Trabajan con los archivos JSON y no utilizan `req` ni `res`.

Esta separación permite mantener una arquitectura más organizada y facilita futuras modificaciones.

---

# 📡 API REST

La API utiliza las siguientes rutas base:

```text
/api/services
/api/bookings
```

---

# 🦷 Services

## 📋 GET - Obtener todos los servicios

```http
GET /api/services
```

Devuelve la lista completa de servicios almacenados.

---

## 🔎 GET - Filtrar servicios por categoría

```http
GET /api/services?category=nombreCategoria
```

Permite obtener únicamente los servicios pertenecientes a una determinada categoría.

Ejemplo:

```http
GET /api/services?category=salud
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

Permite obtener un servicio específico utilizando su identificador.

Ejemplo:

```http
GET /api/services/1
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

Si la creación es correcta, la API responde:

```text
201 Created
```

---

## ✏️ PUT - Actualizar un servicio

```http
PUT /api/services/:sid
```

Permite modificar los datos de un servicio existente utilizando su ID.

Ejemplo:

```http
PUT /api/services/1
```

Los datos actualizados se envían mediante el body en formato JSON.

El ID utilizado para identificar el servicio se mantiene y no se modifica desde el body.

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
DELETE /api/services/1
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

Si la creación es correcta, la API responde:

```text
201 Created
```

---

## 🔍 GET - Obtener una reserva por ID

```http
GET /api/bookings/:bid
```

Permite consultar una reserva específica utilizando su identificador.

Ejemplo:

```http
GET /api/bookings/1
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
POST /api/bookings/1/services/2
```

Antes de agregar el servicio, el controller verifica:

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

Si ambas entidades existen, se actualiza la reserva correctamente.

---

# 🧩 ServiceManager

La gestión de los servicios se encuentra centralizada en:

```text
src/managers/ServiceManager.js
```

La clase cuenta con los siguientes métodos:

### `getServices()`

Obtiene los servicios almacenados y permite aplicar filtros por:

* categoría (`category`)
* disponibilidad (`available`)

### `getServiceById()`

Busca un servicio específico mediante su ID.

### `addService()`

Agrega un nuevo servicio y persiste la información en el archivo JSON.

### `updateService()`

Actualiza los datos de un servicio existente.

### `deleteService()`

Elimina un servicio mediante su ID.

---

# 📅 BookingManager

La gestión de las reservas se encuentra centralizada en:

```text
src/managers/BookingManager.js
```

El manager se encarga de trabajar con los datos almacenados en:

```text
src/data/bookings.json
```

Entre sus responsabilidades se encuentran:

* Crear reservas.
* Buscar reservas por ID.
* Agregar servicios a una reserva.
* Persistir los cambios en el archivo JSON.

---

# ⚙️ Variables de entorno

El proyecto utiliza **dotenv** para trabajar con variables de entorno.

Se debe crear un archivo `.env` en la raíz del proyecto con las variables necesarias:

```env
PORT=8080
NODE_ENV=development
```

También se incluye un archivo `.env.example` como referencia:

```env
PORT=
NODE_ENV=
```

El archivo `.env` se encuentra incluido en `.gitignore` para evitar subir información de configuración local al repositorio.

---

# ▶️ Ejecución del proyecto

Para instalar las dependencias:

```bash
npm install
```

Para iniciar el servidor:

```bash
npm start
```

El servidor utilizará el puerto configurado en la variable de entorno `PORT`.

Por ejemplo:

```text
http://localhost:8080
```

---

# 🧪 Pruebas de la API

Las operaciones de la API fueron probadas utilizando **Postman**.

Se realizaron pruebas sobre los principales endpoints de:

### Services

* GET de todos los servicios.
* GET de un servicio por ID.
* GET de un ID inexistente.
* Filtrado por categoría.
* Filtrado por disponibilidad.
* POST para crear servicios.
* PUT para actualizar servicios.
* DELETE de servicios.
* DELETE de un ID inexistente.
* GET posterior a un DELETE para comprobar la persistencia de la eliminación.

### Bookings

* POST para crear reservas.
* GET de reservas por ID.
* GET de reservas inexistentes.
* POST para agregar servicios a una reserva.
* Validación de reserva inexistente.
* Validación de servicio inexistente.

Las pruebas permitieron comprobar el funcionamiento de los endpoints y la correcta separación entre **Routes, Controllers y Managers**.

---

# 📦 Dependencias

El proyecto utiliza principalmente:

### Express

Framework utilizado para crear el servidor y gestionar las rutas y peticiones HTTP.

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
* Routing
* API REST
* Métodos HTTP
* CRUD
* Query parameters
* Route parameters
* Controllers
* Managers
* Separación de responsabilidades
* Manejo de respuestas HTTP
* Validación de datos
* Manejo de errores
* Clases y métodos
* Manejo y persistencia de archivos JSON
* Pruebas de API con Postman

---

## 👩‍💻 Autor

**Andrea Valentina Santamaria**

Proyecto desarrollado como parte del curso **Backend 1 - Coderhouse**.
