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

Las metas se gestionan mediante su identificador único (`id`) y están asociadas a un usuario mediante el campo `user_id`.

Las metas eliminadas mediante `DELETE` no se eliminan físicamente de la base de datos. Se utiliza **soft delete** mediante el campo `deleted_at`.

Las consultas de metas solo devuelven registros cuyo:

```text
deleted_at IS NULL
```

---

## Obtener todas las metas

Obtiene todas las metas activas.

### Request

```http
GET /goals
```

### Response

#### `200 OK`

```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "Aprender React",
    "description": "Aprender React y crear un proyecto personal",
    "start_date": "2026-07-01T00:00:00.000Z",
    "target_date": "2026-12-31T00:00:00.000Z",
    "completed": 0,
    "created_at": "2026-07-31T20:00:00.000Z",
    "updated_at": "2026-07-31T20:00:00.000Z"
  }
]
```

Las metas se devuelven ordenadas por `target_date` ascendente.

#### `400 Bad Request`

El `userId` no fue enviado.

```json
{
  "message": "User ID is required"
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

Obtiene una meta específica perteneciente al usuario indicado mediante `userId`.

### Request

```http
GET /goals/:id?userId=1
```

### Ejemplo

```http
GET /goals/1?userId=1
```

### Response

#### `200 OK`

```json
{
  "id": 1,
  "user_id": 1,
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

```json
{
  "message": "User ID is required"
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

Crea una nueva meta asociada al usuario indicado mediante `userId`.

### Request

```http
POST /goals
```

### Body

```json
{
  "userId": 1,
  "name": "Aprender React",
  "description": "Aprender React y crear un proyecto personal",
  "startDate": "2026-07-01T00:00:00.000Z",
  "targetDate": "2026-12-31T00:00:00.000Z"
}
```

### Campos

| Campo         | Tipo   | Requerido | Descripción                    |
| ------------- | ------ | --------- | ------------------------------ |
| `userId`      | number | Sí        | ID del usuario propietario     |
| `name`        | string | Sí        | Nombre de la meta              |
| `description` | string | No        | Descripción de la meta         |
| `startDate`   | string | Sí        | Fecha de inicio en formato ISO |
| `targetDate`  | string | Sí        | Fecha objetivo en formato ISO  |

### Response

#### `201 Created`

```json
{
  "id": 1,
  "user_id": 1,
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

```json
{
  "message": "User ID, name, start date and target date are required"
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
PATCH /goals/:id
```

### Ejemplo

```http
PATCH /goals/1
```

### Body

```json
{
  "userId": 1,
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
| `userId`      | number  | Sí        | ID del usuario propietario        |
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
  "user_id": 1,
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

```json
{
  "message": "User ID, name, start date, target date and completed are required"
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
DELETE /goals/:id?userId=1
```

### Ejemplo

```http
DELETE /goals/1?userId=1
```

### Response

#### `204 No Content`

La meta fue eliminada correctamente.

No se devuelve ningún body.

#### `400 Bad Request`

```json
{
  "message": "User ID is required"
}
```

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

## Resumen de endpoints

| Método   | Endpoint              | Descripción                                 |
| -------- | --------------------- | ------------------------------------------- |
| `GET`    | `/goals?userId=1`     | Obtener todas las metas activas del usuario |
| `GET`    | `/goals/:id?userId=1` | Obtener una meta específica                 |
| `POST`   | `/goals`              | Crear una meta                              |
| `PATCH`  | `/goals/:id`          | Actualizar una meta                         |
| `DELETE` | `/goals/:id?userId=1` | Borrado lógico de una meta                  |

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
    │ GET /goals?userId=1
    ▼
Goal Controller
    │
    ▼
Goal Model
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

## Obtener una meta específica

```text
Frontend
    │
    │ GET /goals/:id?userId=1
    ▼
Goal Controller
    │
    ▼
Goal Model
    │
    ▼
Busca goal mediante id
    │
    ▼
Verifica que pertenezca al user_id
    │
    ▼
Filtra deleted_at IS NULL
    │
    ▼
Devuelve la meta
```

## Crear una meta

```text
Frontend
    │
    │ POST /goals
    │ { userId, name, description, startDate, targetDate }
    ▼
Goal Controller
    │
    ▼
Goal Model
    │
    ▼
Crea goal asociado al user_id
    │
    ▼
Devuelve la meta creada
```

## Actualizar una meta

```text
Frontend
    │
    │ PATCH /goals/:id
    │ { userId, name, description, startDate, targetDate, completed }
    ▼
Goal Controller
    │
    ▼
Goal Model
    │
    ▼
Verifica que la meta pertenezca al user_id
    │
    ▼
Actualiza la meta
    │
    ▼
Devuelve la meta actualizada
```

## Eliminar una meta

```text
Frontend
    │
    │ DELETE /goals/:id?userId=1
    ▼
Goal Controller
    │
    ▼
Goal Model
    │
    ▼
Verifica que la meta pertenezca al user_id
    │
    ▼
Actualiza deleted_at
    │
    ▼
Meta marcada como eliminada
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

* La API utiliza `userId` para identificar al usuario propietario de las metas.
* La relación entre `users` y `goals` se mantiene mediante `user_id` en la base de datos.
* Las metas utilizan borrado lógico mediante `deleted_at`.
* Las metas eliminadas no aparecen en las consultas normales.
* Actualmente no existe autenticación mediante contraseña o tokens.
* La API verifica que las metas consultadas, actualizadas o eliminadas pertenezcan al `userId` indicado.
* La privacidad de los usuarios es limitada debido a que actualmente no existe un sistema de autenticación real.
* Las fechas deben enviarse preferiblemente como strings en formato ISO 8601.
* El backend utiliza MySQL como base de datos.
* El frontend es responsable de calcular y actualizar el contador de tiempo restante.
