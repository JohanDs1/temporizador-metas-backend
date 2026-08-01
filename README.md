# API Documentation — Temporizador de Metas

API REST para gestionar usuarios y metas del proyecto **Temporizador de Metas**.

## Base URL

### Development

```text
http://localhost:3000/api
```

### Production

La URL de producción dependerá del dominio configurado en Render.

---

# Users

## Crear o obtener usuario

Crea un nuevo usuario si el `username` no existe. Si el usuario ya existe, devuelve el usuario existente.

### Request

```http
POST /users
```

### Body

```json
{
  "username": "johan"
}
```

### Responses

#### `201 Created`

Usuario creado correctamente.

```json
{
  "id": 1,
  "username": "johan",
  "created_at": "2026-07-31T20:00:00.000Z",
  "updated_at": "2026-07-31T20:00:00.000Z"
}
```

#### `200 OK`

El usuario ya existe.

```json
{
  "id": 1,
  "username": "johan",
  "created_at": "2026-07-31T20:00:00.000Z",
  "updated_at": "2026-07-31T20:00:00.000Z"
}
```

#### `400 Bad Request`

El `username` no fue enviado.

```json
{
  "message": "Username is required"
}
```

#### `500 Internal Server Error`

Ocurrió un error interno en el servidor.

```json
{
  "message": "Internal server error"
}
```

---

## Obtener usuario por username

Obtiene un usuario utilizando su nombre de usuario.

### Request

```http
GET /users/:username
```

### Ejemplo

```http
GET /users/johan
```

### Responses

#### `200 OK`

```json
{
  "id": 1,
  "username": "johan",
  "created_at": "2026-07-31T20:00:00.000Z",
  "updated_at": "2026-07-31T20:00:00.000Z"
}
```

#### `404 Not Found`

```json
{
  "message": "User not found"
}
```

#### `500 Internal Server Error`

```json
{
  "message": "Internal server error"
}
```

---

# Goals

Las metas pertenecen a un usuario específico y se consultan utilizando su `username`.

Las metas eliminadas mediante `DELETE` no se eliminan físicamente de la base de datos. Se utiliza **soft delete** mediante el campo `deleted_at`.

Las consultas de metas solo devuelven registros cuyo:

```text
deleted_at IS NULL
```

---

## Obtener todas las metas de un usuario

Obtiene todas las metas activas de un usuario.

### Request

```http
GET /users/:username/goals
```

### Ejemplo

```http
GET /users/johan/goals
```

### Response

#### `200 OK`

```json
[
  {
    "id": 1,
    "name": "Aprender React",
    "description": "Aprender React y crear un proyecto personal",
    "start_date": "2026-07-01T00:00:00.000Z",
    "target_date": "2026-12-31T00:00:00.000Z",
    "completed": 0,
    "created_at": "2026-07-31T20:00:00.000Z",
    "updated_at": "2026-07-31T20:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Aprender TypeScript",
    "description": null,
    "start_date": "2026-08-01T00:00:00.000Z",
    "target_date": "2026-10-01T00:00:00.000Z",
    "completed": 0,
    "created_at": "2026-07-31T20:00:00.000Z",
    "updated_at": "2026-07-31T20:00:00.000Z"
  }
]
```

Las metas se devuelven ordenadas por `target_date` ascendente.

#### `404 Not Found`

El usuario no existe.

```json
{
  "message": "User not found"
}
```

#### `500 Internal Server Error`

```json
{
  "message": "Internal server error"
}
```

---

## Obtener una meta específica

Obtiene una meta específica perteneciente al usuario indicado.

### Request

```http
GET /users/:username/goals/:id
```

### Ejemplo

```http
GET /users/johan/goals/1
```

### Responses

#### `200 OK`

```json
{
  "id": 1,
  "name": "Aprender React",
  "description": "Aprender React y crear un proyecto personal",
  "start_date": "2026-07-01T00:00:00.000Z",
  "target_date": "2026-12-31T00:00:00.000Z",
  "completed": 0,
  "created_at": "2026-07-31T20:00:00.000Z",
  "updated_at": "2026-07-31T20:00:00.000Z"
}
```

#### `404 Not Found`

La meta no existe, fue eliminada o no pertenece al usuario indicado.

```json
{
  "message": "Goal not found"
}
```

#### `500 Internal Server Error`

```json
{
  "message": "Internal server error"
}
```

---

## Crear una meta

Crea una nueva meta para el usuario indicado.

### Request

```http
POST /users/:username/goals
```

### Ejemplo

```http
POST /users/johan/goals
```

### Body

```json
{
  "name": "Aprender React",
  "description": "Aprender React y crear un proyecto personal",
  "startDate": "2026-07-01T00:00:00.000Z",
  "targetDate": "2026-12-31T00:00:00.000Z"
}
```

### Campos

| Campo         | Tipo   | Requerido | Descripción                    |
| ------------- | ------ | --------- | ------------------------------ |
| `name`        | string | Sí        | Nombre de la meta              |
| `description` | string | No        | Descripción de la meta         |
| `startDate`   | string | Sí        | Fecha de inicio en formato ISO |
| `targetDate`  | string | Sí        | Fecha objetivo en formato ISO  |

### Response

#### `201 Created`

```json
{
  "id": 1,
  "name": "Aprender React",
  "description": "Aprender React y crear un proyecto personal",
  "start_date": "2026-07-01T00:00:00.000Z",
  "target_date": "2026-12-31T00:00:00.000Z",
  "completed": 0,
  "created_at": "2026-07-31T20:00:00.000Z",
  "updated_at": "2026-07-31T20:00:00.000Z"
}
```

#### `400 Bad Request`

Falta uno de los campos requeridos.

```json
{
  "message": "Name, start date and target date are required"
}
```

#### `404 Not Found`

El usuario no existe.

```json
{
  "message": "User not found"
}
```

#### `500 Internal Server Error`

```json
{
  "message": "Internal server error"
}
```

---

## Actualizar una meta

Actualiza los datos de una meta existente.

### Request

```http
PATCH /users/:username/goals/:id
```

### Ejemplo

```http
PATCH /users/johan/goals/1
```

### Body

```json
{
  "name": "Aprender React y Next.js",
  "description": "Aprender React y Next.js para crear proyectos personales",
  "startDate": "2026-07-01T00:00:00.000Z",
  "targetDate": "2026-12-31T00:00:00.000Z",
  "completed": false
}
```

### Campos

| Campo         | Tipo    | Requerido | Descripción                       |
| ------------- | ------- | --------- | --------------------------------- |
| `name`        | string  | Sí        | Nombre de la meta                 |
| `description` | string  | No        | Descripción de la meta            |
| `startDate`   | string  | Sí        | Fecha de inicio en formato ISO    |
| `targetDate`  | string  | Sí        | Fecha objetivo en formato ISO     |
| `completed`   | boolean | Sí        | Indica si la meta está completada |

### Response

#### `200 OK`

```json
{
  "id": 1,
  "name": "Aprender React y Next.js",
  "description": "Aprender React y Next.js para crear proyectos personales",
  "start_date": "2026-07-01T00:00:00.000Z",
  "target_date": "2026-12-31T00:00:00.000Z",
  "completed": 0,
  "created_at": "2026-07-31T20:00:00.000Z",
  "updated_at": "2026-07-31T21:00:00.000Z"
}
```

#### `400 Bad Request`

Falta uno de los campos requeridos.

```json
{
  "message": "Name, start date, target date and completed are required"
}
```

#### `404 Not Found`

La meta no existe, fue eliminada o no pertenece al usuario indicado.

```json
{
  "message": "Goal not found"
}
```

#### `500 Internal Server Error`

```json
{
  "message": "Internal server error"
}
```

---

## Eliminar una meta

Realiza un **borrado lógico (soft delete)** de una meta.

La meta no se elimina físicamente de la base de datos. Se actualiza el campo `deleted_at` con la fecha y hora actual.

### Request

```http
DELETE /users/:username/goals/:id
```

### Ejemplo

```http
DELETE /users/johan/goals/1
```

### Responses

#### `204 No Content`

La meta fue eliminada correctamente.

No se devuelve ningún body.

#### `404 Not Found`

La meta no existe, ya fue eliminada o no pertenece al usuario indicado.

```json
{
  "message": "Goal not found"
}
```

#### `500 Internal Server Error`

```json
{
  "message": "Internal server error"
}
```

---

# Resumen de endpoints

| Método   | Endpoint                     | Descripción                     |
| -------- | ---------------------------- | ------------------------------- |
| `POST`   | `/users`                     | Crear o obtener un usuario      |
| `GET`    | `/users/:username`           | Obtener un usuario              |
| `GET`    | `/users/:username/goals`     | Obtener todas las metas activas |
| `GET`    | `/users/:username/goals/:id` | Obtener una meta específica     |
| `POST`   | `/users/:username/goals`     | Crear una meta                  |
| `PATCH`  | `/users/:username/goals/:id` | Actualizar una meta             |
| `DELETE` | `/users/:username/goals/:id` | Borrado lógico de una meta      |

---

# Data Flow

## Crear o identificar usuario

```text
Frontend
    │
    │ POST /users
    │ { username }
    ▼
User Controller
    │
    ▼
User Model
    │
    ├── Usuario existe → Devuelve usuario
    │
    └── Usuario no existe
            │
            ▼
       Crea usuario
            │
            ▼
       Devuelve usuario
```

## Obtener metas

```text
Frontend
    │
    │ GET /users/:username/goals
    ▼
Goal Controller
    │
    ▼
Goal Model
    │
    ▼
Busca user_id mediante username
    │
    ▼
Busca goals mediante user_id
    │
    ▼
Filtra deleted_at IS NULL
    │
    ▼
Devuelve metas
```

## Contador de tiempo

La API almacena las fechas `startDate` y `targetDate`.

El cálculo del tiempo restante se realiza en el frontend utilizando la fecha objetivo:

```text
targetDate - currentDate
```

El contador se actualiza en tiempo real en el cliente y no requiere que el backend realice cálculos periódicos.

---

# Notas

* La API utiliza `username` para identificar al usuario en las rutas.
* La relación entre `users` y `goals` se mantiene mediante `user_id` en la base de datos.
* Las metas utilizan borrado lógico mediante `deleted_at`.
* Las metas eliminadas no aparecen en las consultas normales.
* Actualmente no existe autenticación mediante contraseña o tokens.
* La privacidad de los usuarios depende de que el `username` sea conocido y no existe un sistema de autenticación real.
* Las fechas deben enviarse preferiblemente como strings en formato ISO 8601.
* El backend utiliza MySQL como base de datos.
* El frontend es responsable de calcular y actualizar el contador de tiempo restante.
