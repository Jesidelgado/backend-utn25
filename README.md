# 🚗 API de Tienda de Repuestos Automotrices

API REST desarrollada con Node.js y Express para gestionar una tienda de repuestos automotrices. 
Incluye sistema de autenticación, gestión de productos, categorías y usuarios con roles de administrador y cliente.

## 📋 Características

- ✅ **Gestión de Productos**: CRUD completo de productos con categorías, precios, stock e imágenes
- ✅ **Gestión de Categorías**: Organización de productos por categorías (filtros y aceites, encendido, suspensión y frenos, luminaria)
- ✅ **Gestión de Usuarios**: Sistema de registro y gestión de usuarios
- ✅ **Autenticación JWT**: Sistema seguro de autenticación con tokens JWT
- ✅ **Roles de Usuario**: Diferenciación entre usuarios administradores y clientes
- ✅ **Base de Datos MongoDB**: Persistencia de datos con Mongoose
- ✅ **Seed de Datos**: Script para poblar la base de datos con datos de prueba
- ✅ **Validación de Datos**: Validación de esquemas y middleware de seguridad

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución JavaScript
- **Express.js**: Framework web para Node.js
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT (JSON Web Tokens)**: Autenticación basada en tokens
- **bcryptjs**: Encriptación de contraseñas
- **CORS**: Configuración de políticas de origen cruzado
- **dotenv**: Gestión de variables de entorno

## 📦 Requisitos Previos

- Node.js (versión 14 o superior)
- MongoDB (local o remoto)
- npm o yarn

## 🚀 Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd tp-back
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto basándose en el archivo `.env.example`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017
DB=tienda_repuestos
JWT_SECRET=tu_secret_key_muy_segura_aqui
NODE_ENV=development
```

**Nota**: El archivo `.env.example` contiene un ejemplo de configuración. Copia ese archivo y renómbralo a `.env`, luego ajusta los valores según tu entorno.

4. Poblar la base de datos (opcional):
```bash
npm run seed
```

Este comando creará datos de prueba:
- 4 categorías de productos
- 23 productos de ejemplo
- 2 usuarios (1 administrador y 1 cliente)

Ver sección [Datos de Prueba](#-datos-de-prueba) para más detalles.

## 🏃 Ejecución

### Modo desarrollo (con nodemon):
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado en `.env`)

## 📁 Estructura del Proyecto

```
tp-back/
├── src/
│   ├── config/
│   │   ├── db.js              # Configuración de conexión a MongoDB
│   │   └── config.js          # Variables de configuración
│   ├── controllers/
│   │   ├── authController.js  # Controlador de autenticación
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   ├── registerController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── verifyToken.js     # Middleware de verificación JWT
│   ├── models/
│   │   ├── categoryModel.js   # Modelo de categoría
│   │   ├── productModel.js    # Modelo de producto
│   │   └── userModel.js       # Modelo de usuario
│   ├── routes/
│   │   ├── authRoute.js       # Rutas de autenticación
│   │   ├── categoryRoute.js
│   │   ├── productRoute.js
│   │   └── userRoute.js
│   └── services/
│       ├── authService.js
│       ├── categoryService.js
│       ├── productService.js
│       └── userService.js
├── index.js                    # Punto de entrada de la aplicación
├── seed.js                     # Script para poblar la base de datos
├── package.json
└── README.md
```

## 🔌 Endpoints de la API

### Autenticación

#### `POST /api/auth/register`
Registrar un nuevo usuario

**Datos Mock (JSON):**
```json
{
  "nombre": "maria garcia",
  "email": "maria.garcia@email.com",
  "contraseña": "123456",
  "rol": "cliente"
}
```

**Respuesta exitosa (201):**
```json
{
  "_id": "xyz789abc123def456ghi012",
  "nombre": "maria garcia",
  "email": "maria.garcia@email.com",
  "rol": "cliente",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### `POST /api/auth/login`
Iniciar sesión

**Datos Mock (JSON):**
```json
{
  "email": "admin@tiendarepuestos.com",
  "contraseña": "123456"
}
```

**Respuesta exitosa (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N...",
  "user": {
    "_id": "abc123def456ghi789jkl012",
    "nombre": "admin",
    "email": "admin@tiendarepuestos.com",
    "rol": "admin"
  }
}
```

**Nota**: El token JWT devuelto debe incluirse en el header `Authorization: Bearer <token>` para acceder a rutas protegidas.

### Productos

#### `GET /api/productos`
Obtener todos los productos (público)

#### `GET /api/productos/:id`
Obtener un producto por ID (público)

#### `GET /api/productos/categoria/:categoryId`
Obtener productos por categoría (público)

#### `POST /api/productos`
Crear un nuevo producto (requiere autenticación y rol admin)

**Datos Mock (JSON):**
```json
{
  "titulo": "Liqui Moly 0W-20 Molygen New Generation 4L",
  "descripcion": "Ideal para motores gasolina modernos del mercado asiáticos y americano con tecnología multiválvulas, con turbocompresión y con y sin refrigeración del aire de admisión (LLK).",
  "precio": 85400,
  "stock": 20,
  "categoria": "67890abcdef12345678901234",
  "imagen": "https://liqui-moly.com.ar/wp-content/uploads/2022/03/molygen-0w-20.jpg"
}
```

**Respuesta exitosa (201):**
```json
{
  "_id": "12345abcdef12345678901234",
  "titulo": "Liqui Moly 0W-20 Molygen New Generation 4L",
  "descripcion": "Ideal para motores gasolina modernos...",
  "precio": 85400,
  "stock": 20,
  "categoria": "67890abcdef12345678901234",
  "imagen": "https://liqui-moly.com.ar/wp-content/uploads/2022/03/molygen-0w-20.jpg",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### `PUT /api/productos/:id`
Actualizar un producto (requiere autenticación y rol admin)

**Datos Mock (JSON):**
```json
{
  "precio": 90000,
  "stock": 15
}
```

#### `DELETE /api/productos/:id`
Eliminar un producto (requiere autenticación y rol admin)

### Categorías

#### `GET /api/categorias`
Obtener todas las categorías (público)

#### `GET /api/categorias/:id`
Obtener una categoría por ID (público)

#### `POST /api/categorias`
Crear una nueva categoría (requiere autenticación y rol admin)

**Datos Mock (JSON):**
```json
{
  "nombre": "filtros y aceites",
  "descripcion": "Aceites lubricantes y filtros para motor"
}
```

**Respuesta exitosa (201):**
```json
{
  "_id": "67890abcdef12345678901234",
  "nombre": "filtros y aceites",
  "descripcion": "Aceites lubricantes y filtros para motor",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### `PUT /api/categorias/:id`
Actualizar una categoría (requiere autenticación y rol admin)

**Datos Mock (JSON):**
```json
{
  "descripcion": "Nueva descripción actualizada de la categoría"
}
```

#### `DELETE /api/categorias/:id`
Eliminar una categoría (requiere autenticación y rol admin)

### Usuarios

#### `POST /api/usuarios`
Registrar un nuevo usuario (público)

**Datos Mock (JSON):**
```json
{
  "nombre": "juan perez",
  "email": "juan.perez@email.com",
  "contraseña": "123456",
  "rol": "cliente"
}
```

**Respuesta exitosa (201):**
```json
{
  "_id": "abc123def456ghi789jkl012",
  "nombre": "juan perez",
  "email": "juan.perez@email.com",
  "contraseña": "$2a$10$hashedpassword...",
  "rol": "cliente",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### `PUT /api/usuarios/:id`
Actualizar un usuario (requiere autenticación)

**Datos Mock (JSON):**
```json
{
  "nombre": "juan carlos perez",
  "email": "juancarlos.perez@email.com"
}
```

#### `GET /api/usuarios`
Obtener todos los usuarios (requiere autenticación)

#### `GET /api/usuarios/:id`
Obtener un usuario por ID (requiere autenticación)

#### `PUT /api/usuarios/:id`
Actualizar un usuario (requiere autenticación)

#### `DELETE /api/usuarios/:id`
Eliminar un usuario (requiere autenticación)

## 🔐 Autenticación

Para acceder a las rutas protegidas, incluye el token JWT en el header de la petición:

```
Authorization: Bearer <tu_token_jwt>
```

### Roles de Usuario

- **cliente**: Puede ver productos y categorías, gestionar su propio perfil
- **admin**: Tiene acceso completo, puede crear, editar y eliminar productos y categorías

## 📊 Esquema de la Base de Datos

### Colección: `products`

| Campo | Tipo | Requerido | Validaciones | Descripción |
|-------|------|-----------|--------------|-------------|
| `titulo` | String | Sí | 3-100 caracteres | Nombre del producto |
| `descripcion` | String | Sí | 10-500 caracteres | Descripción detallada |
| `precio` | Number | Sí | Mínimo 0 | Precio en pesos argentinos |
| `stock` | Number | Sí | Mínimo 0, default: 0 | Cantidad disponible |
| `categoria` | ObjectId | Sí | Referencia a `Category` | ID de la categoría (usar populate) |
| `imagen` | String | Sí | URL válida | URL de la imagen del producto |
| `createdAt` | Date | Auto | - | Fecha de creación (automático) |
| `updatedAt` | Date | Auto | - | Fecha de actualización (automático) |

### Colección: `categories`

| Campo | Tipo | Requerido | Validaciones | Descripción |
|-------|------|-----------|--------------|-------------|
| `nombre` | String | Sí | 2-30 caracteres, único | Nombre de la categoría |
| `descripcion` | String | No | Máximo 200 caracteres | Descripción de la categoría |
| `createdAt` | Date | Auto | - | Fecha de creación (automático) |
| `updatedAt` | Date | Auto | - | Fecha de actualización (automático) |

### Colección: `users`

| Campo | Tipo | Requerido | Validaciones | Descripción |
|-------|------|-----------|--------------|-------------|
| `nombre` | String | Sí | 3-20 caracteres | Nombre del usuario |
| `email` | String | Sí | Formato válido, único | Email del usuario |
| `contraseña` | String | Sí | Mínimo 6 caracteres | Contraseña encriptada con bcrypt |
| `rol` | String | Sí | Enum: ['cliente', 'admin'] | Rol del usuario (default: 'cliente') |
| `createdAt` | Date | Auto | - | Fecha de creación (automático) |
| `updatedAt` | Date | Auto | - | Fecha de actualización (automático) |

### Relaciones

- **Producto → Categoría**: Relación de referencia (ObjectId) con populate para obtener datos completos de la categoría al consultar productos.

## 🧪 Datos de Prueba

Después de ejecutar `npm run seed`, se crean los siguientes datos:

### Categorías (4)
- **filtros y aceites**: Aceites lubricantes y filtros para motor
- **encendido**: Baterías, bujías y sistema de encendido
- **suspensión y frenos**: Pastillas, discos, amortiguadores y componentes de suspensión
- **luminaria**: Luces LED, halógenas y sistemas de iluminación

### Productos (23)
El seed crea 23 productos distribuidos en las categorías:
- **Filtros y aceites**: Aceites Liqui Moly (0W-20, 5W-30, 10W-40) y filtros de aceite para diferentes modelos
- **Encendido**: Baterías Mateo y bujías NGK para diversos modelos de vehículos
- **Suspensión y frenos**: Pastillas de freno Corven y kits de amortiguadores
- **Luminaria**: Lámparas halógenas H4, H7, H11 y kits LED

### Usuarios (2)

**Administrador:**
- Email: `admin@tiendarepuestos.com`
- Contraseña: `123456`
- Rol: `admin`

**Cliente:**
- Email: `cliente@email.com`
- Contraseña: `123456`
- Rol: `cliente`

## 📝 Scripts Disponibles

- `npm start`: Inicia el servidor en modo producción
- `npm run dev`: Inicia el servidor en modo desarrollo con nodemon
- `npm run seed`: Pobla la base de datos con datos de prueba
- `npm test`: Ejecuta los tests (por implementar)

## 🌐 CORS

La API está configurada para aceptar peticiones desde cualquier origen (`origin: '*'`). En producción, se recomienda restringir esto a los dominios específicos de tu frontend.

## 👤 Autor
** Jesica Delgado **
Trabajo práctico desarrollado para la UTN (Universidad Tecnológica Nacional).
Noviembre 2025
---

**Nota**: Asegúrate de configurar correctamente las variables de entorno antes de ejecutar la aplicación, especialmente `MONGODB_URI` y `JWT_SECRET`.
