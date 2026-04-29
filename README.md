# 🥋 DojoManager API

API backend para la gestión de un dojo de artes marciales, desarrollada con **NestJS**, **PostgreSQL** y **Docker**.

Este sistema permite administrar alumnos, instructores, clases, asistencia y pagos mensuales, aplicando reglas de negocio reales como validación de pagos activos, control de cupos y permisos por roles.

---

## 🚀 Características principales

- 🔐 Autenticación con JWT
- 👤 Gestión de usuarios y roles (`admin`, `instructor`, `student`)
- 🥋 Gestión de clases y horarios
- 📝 Inscripción de alumnos a múltiples clases
- ✅ Registro de asistencia por fecha
- 💰 Control de pagos mensuales
- 🐳 Contenedorización con Docker
- 📄 Documentación con Swagger

---

## 🧠 Lógica de negocio

El sistema implementa las siguientes reglas:

- Un alumno puede estar inscrito en varias clases
- Un alumno no puede inscribirse dos veces a la misma clase
- Un alumno debe tener un pago activo para asistir
- Solo los instructores pueden registrar asistencia
- Las clases tienen una capacidad máxima
- No se permite inscripción cuando una clase está llena

Estas reglas buscan simular un escenario real de gestión de un dojo.

---

## 🧩 Modelo del sistema

### User

Representa a todos los usuarios del sistema.

Campos principales:

- `id`
- `name`
- `email`
- `password`
- `role`

Roles disponibles:

- `admin`
- `instructor`
- `student`

---

### Class

Representa las clases del dojo.

Campos principales:

- `id`
- `name`
- `schedule`
- `capacity`
- `instructorId`

---

### Enrollment

Relaciona alumnos con clases.

Campos principales:

- `id`
- `studentId`
- `classId`

---

### Attendance

Registro de asistencia.

Campos principales:

- `id`
- `studentId`
- `classId`
- `date`
- `status`

---

### Payment

Controla el pago mensual de cada alumno.

Campos principales:

- `id`
- `studentId`
- `amount`
- `startDate`
- `endDate`

---

## 🛠️ Tecnologías utilizadas

- NestJS
- TypeScript
- PostgreSQL
- Docker
- JWT
- Git / GitHub

---

## 📌 Endpoints principales

### Auth

```http
POST /auth/register
POST /auth/login
```

### Users

```http
GET /users
PATCH /users/:id/role
```

### Classes

```http
POST /classes
GET /classes
PATCH /classes/:id
```

### Enrollments

```http
POST /enrollments
GET /students/:id/classes
```

### Attendance

```http
POST /attendance
GET /attendance/class/:id
```

### Payments

```http
POST /payments
GET /payments/student/:id
```

---

## 🐳 Ejecutar con Docker

```bash
docker-compose up --build
```

La API estará disponible en:

```http
http://localhost:3000
```

---

## 📈 Futuras mejoras

- Dashboard administrativo
- Recordatorios automáticos de pago
- Reportes de asistencia mensual
- Notificaciones por correo
- Historial de pagos

---

## 🎯 Objetivo del proyecto

Este proyecto fue desarrollado como parte de mi portafolio para demostrar conocimientos en desarrollo backend, diseño de APIs REST, lógica de negocio, seguridad y despliegue con contenedores.
