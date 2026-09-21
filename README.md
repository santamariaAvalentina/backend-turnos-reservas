# Backend Turnos y Reservas

Proyecto backend desarrollado con **Node.js** y **Express**, utilizando **ESM (ECMAScript Modules)**, para la gestión de servicios y reservas dentro de un sistema de turnos.

El proyecto implementa una API REST organizada mediante una arquitectura en capas, separando las responsabilidades de cada componente:

* **Routes:** definición de endpoints.
* **Controllers:** recepción de requests y envío de responses.
* **Services:** lógica de negocio y validaciones.
* **Repositories:** intermediarios entre los Services y los DAO.
* **DAO:** acceso directo y persistencia de datos.
* **JSON:** almacenamiento de la información.

La arquitectura permite mantener el código organizado y facilita futuras modificaciones, como el reemplazo de la persistencia mediante archivos JSON por una base de datos.

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

La arquitectura separa las responsabilidades entre **Routes, Controllers, Services, Repositories y DAO**, permitiendo una estructura más clara y preparada para futuras etapas del proyecto.

---

## 🏗️ Arquitectura en capas

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
JSON
```

### Routes

Los routers se encargan únicamente de definir los endpoints y conectarlos con los métodos correspondientes de los controllers.

No contienen lógica de negocio ni acceso directo a los archivos JSON.

### Controllers

Los controllers reciben las requests y trabajan con:

* `req.params`
* `req.query`
* `req.body`

Luego llaman a los Services correspondientes y construyen la respuesta mediante `res.status().json()`.

Los controllers no acceden directamente a los archivos JSON ni contienen lógica de negocio.

### Services

Los Services contienen la lógica de negocio de la aplicación.

Entre sus responsabilidades se encuentran:

* Validar los datos recibidos.
* Generar identificadores.
* Aplicar filtros.
* Comprobar la existencia de entidades.
* Aplicar reglas de negocio.
* Coordinar las operaciones necesarias mediante los Repositories.

Los Services no utilizan `req` ni `res` y no acceden directamente a los archivos JSON.

### Repositories

Los Repositories funcionan como una capa intermedia entre los Services y los DAO.

Se encargan de utilizar los métodos del DAO y abstraer la forma en que los Services acceden a los datos.

Esto permite que la lógica de negocio no dependa directamente del mecanismo de persistencia utilizado.

### DAO

Los DAO se encargan del acceso directo a los datos.

En esta etapa del proyecto utilizan archivos JSON para:

* Leer información.
* Crear registros.
* Actualizar registros.
* Eliminar registros.

Los DAO no contienen reglas de negocio ni utilizan `req` o `res`.

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
│   ├── services/
│   │   ├── services.service.js
│   │   └── bookings.service.js
│   │
│   ├── repositories/
│   │   ├── services.repository.js
│   │   └── bookings.repository.js
│   │
│   ├── dao/
│   │   ├── services.dao.js
│   │   └── bookings.dao.js
│   │
│   ├── routes/
│   │   ├── services.router.js
│   │   └── bookings.router.js
│   │
│   ├── data/
│   │   ├── services.json
│   │   └── bookings.json
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

> El archivo `.env` se utiliza de forma local y se encuentra incluido en `.gitignore`, por lo que no debe subirse al repositorio público.

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

El filtro no distingue entre mayúsculas y minúsculas.

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
  "service": 2,
  "quantity": 2
}
```

Esta regla de negocio se encuentra implementada en `bookings.service.js`.

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
* DELETE de servicios.
* DELETE de un ID inexistente.
* GET posterior a un DELETE para comprobar la persistencia de la eliminación.

## Bookings

Se realizaron pruebas sobre:

* POST para crear reservas.
* GET de reservas por ID.
* GET de reservas inexistentes.
* POST para agregar servicios a una reserva.
* Agregar nuevamente un servicio existente y comprobar el incremento de `quantity`.
* Validación de reserva inexistente.
* Validación de servicio inexistente.

Las pruebas permitieron comprobar el funcionamiento de los endpoints y la correcta separación entre **Routes, Controllers, Services, Repositories y DAO**.

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
* Services
* Repositories
* DAO
* Arquitectura en capas
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
