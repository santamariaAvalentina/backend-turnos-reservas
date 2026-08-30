# Backend Turnos y Reservas

Proyecto backend desarrollado con **Node.js** y **Express**, utilizando **ESM (ECMAScript Modules)**, para la gestión de servicios dentro de un sistema de turnos y reservas.

El proyecto implementa una API REST que permite realizar operaciones CRUD sobre los servicios, consultar servicios mediante diferentes filtros y gestionar los datos almacenados en un archivo JSON.

---

## 📌 Objetivo del proyecto

El objetivo es desarrollar una API backend que permita administrar los servicios disponibles en un sistema de turnos y reservas.

A través de la API es posible:

* Consultar todos los servicios.
* Buscar un servicio específico por su ID.
* Filtrar servicios por categoría.
* Filtrar servicios según su disponibilidad.
* Crear nuevos servicios.
* Modificar servicios existentes.
* Eliminar servicios.

El proyecto aplica conceptos fundamentales de **Node.js, Express, módulos ESM, variables de entorno, routing, CRUD y manejo de datos mediante archivos JSON**.

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
│   ├── data/
│   │   └── services.json
│   │
│   ├── managers/
│   │   └── ServiceManager.js
│   │
│   ├── routes/
│   │   └── services.router.js
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

### Descripción de las carpetas y archivos

**`src/config/env.config.js`**

Contiene la configuración de las variables de entorno utilizadas por el proyecto.

**`src/data/services.json`**

Archivo JSON utilizado como fuente de datos para almacenar los servicios.

**`src/managers/ServiceManager.js`**

Contiene la clase encargada de gestionar las operaciones sobre los servicios, como obtener, crear, actualizar y eliminar datos.

**`src/routes/services.router.js`**

Define las rutas y endpoints de la API relacionados con los servicios.

**`src/app.js`**

Configura la aplicación de Express y registra las rutas.

**`src/server.js`**

Es el punto de entrada del servidor. Se encarga de cargar la configuración y poner el servidor en funcionamiento utilizando el puerto definido mediante variables de entorno.

---

## ⚙️ Instalación

Para instalar las dependencias del proyecto, ejecutar:

```bash
npm install
```

---

## 🔐 Variables de entorno

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

## ▶️ Ejecución del proyecto

Para iniciar el servidor se debe ejecutar:

```bash
npm start
```

El servidor utilizará el puerto configurado en la variable de entorno `PORT`.

Por ejemplo:

```text
http://localhost:8080
```

---

# 📡 API REST

La API utiliza como ruta base:

```text
/api/services
```

A partir de esta ruta se pueden realizar las diferentes operaciones sobre los servicios.

---

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

También se puede consultar por servicios no disponibles:

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

Si el servicio solicitado no existe, la API devuelve un error `404`.

---

# ➕ POST - Crear un servicio

```http
POST /api/services
```

Permite agregar un nuevo servicio.

Los datos se envían mediante el `body` de la petición en formato JSON.

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

Para crear un servicio se validan los campos necesarios:

* `name`
* `description`
* `duration`
* `price`
* `category`
* `available`

Si la creación es correcta, la API responde con el código:

```text
201 Created
```

Si faltan datos obligatorios, devuelve:

```text
400 Bad Request
```

---

# ✏️ PUT - Actualizar un servicio

```http
PUT /api/services/:sid
```

Permite modificar los datos de un servicio existente utilizando su ID.

Ejemplo:

```http
PUT /api/services/1
```

Los datos actualizados se envían en formato JSON mediante el `body`.

El ID utilizado para identificar el servicio se mantiene y no se modifica desde el `body`.

Si el servicio no existe, la API devuelve:

```text
404 Not Found
```

---

# 🗑️ DELETE - Eliminar un servicio

```http
DELETE /api/services/:sid
```

Permite eliminar un servicio utilizando su identificador.

Ejemplo:

```http
DELETE /api/services/1
```

Si el servicio existe, se elimina correctamente.

Si no se encuentra el ID solicitado, la API devuelve:

```text
404 Not Found
```

---

# 🧩 ServiceManager

La gestión de los servicios se encuentra centralizada en la clase `ServiceManager`.

La clase cuenta con los siguientes métodos:

### `getServices()`

Obtiene los servicios y permite aplicar filtros por:

* categoría (`category`)
* disponibilidad (`available`)

### `getServiceById()`

Busca un servicio específico mediante su ID.

### `addService()`

Agrega un nuevo servicio después de validar que se encuentren presentes los campos requeridos.

### `updateService()`

Actualiza los datos de un servicio existente.

### `deleteService()`

Elimina un servicio mediante su ID.

---

# 🧪 Pruebas de la API

Las diferentes operaciones fueron probadas utilizando **Postman**.

Se realizaron pruebas de los principales métodos HTTP:

```text
GET
POST
PUT
DELETE
```

También se probaron:

* Consulta de todos los servicios.
* Consulta de un servicio por ID.
* Filtro por categoría.
* Filtro por disponibilidad.
* Creación de servicios.
* Validación de datos.
* Actualización de servicios.
* Eliminación de servicios.
* Respuestas `404` cuando no se encuentra un servicio.
* Respuesta `400` ante datos incompletos al crear un servicio.

---

# 📦 Dependencias

El proyecto utiliza principalmente las siguientes dependencias:

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
* Manejo de respuestas HTTP
* Validación de datos
* Manejo de errores
* Clases y métodos
* Manejo de archivos JSON

---

## 👩‍💻 Autor

**Valentina Santamaria**

Proyecto desarrollado como parte del curso **Backend 1 - Coderhouse**.
