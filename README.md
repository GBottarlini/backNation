# 📦 Backend - Gestión de Clientes - Concesionario Nation

Este es el servidor backend del sistema de gestión de clientes desarrollado para la campaña de marketing del concesionario Nation. Permite consultar, filtrar y sincronizar en tiempo real la visualización de clientes en función de datos útiles como patente, kilómetros recorridos, sucursal, entre otros.

---

## 🚀 Características principales

- API REST con Node.js y Express
- Base de datos MongoDB con Mongoose
- WebSocket con Socket.io para sincronización en tiempo real entre usuarios
- Filtros dinámicos por campos como patente, sucursal, y kilometraje
- Organización modular con patrón MVC

---

## 🛠️ Tecnologías utilizadas

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **Socket.io**
- **dotenv**
- **cors**
- **mongoose-paginate-v2**

---

## 📂 Estructura del proyecto
```bash
Copiar
Editar
backNation-main/
├── config/              # Conexión a la base de datos
├── controllers/         # Lógica del negocio
├── models/              # Esquemas de Mongoose
├── routes/              # Endpoints de la API
├── .env                 # Variables de entorno
├── server.js            # Punto de entrada
```

---

## ⚙️ Instalación y uso
1. Clona el repositorio y entra en la carpeta:

```bash

git clone https://github.com/tu-usuario/backNation.git
cd backNation-main
```

2. Instala dependencias:

```bash
npm install
```

3. Crea un archivo .env en la raíz con las siguientes variables:
```bash
env

MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<bd>
PORT=5000
```

4. Inicia el servidor:

```bash
npm start
```

El servidor estará corriendo en http://localhost:5000


---

## 📡 WebSocket
Cuando un cliente es consultado, se emite un evento a través de WebSocket para bloquear su visualización simultánea por otros usuarios, evitando duplicación de atención.

---

## 🧠 Notas del desarrollador
Este proyecto fue desarrollado 100% por mí, desde cero. Fue creado para el concesionario Nation con el objetivo de apoyar una campaña real de marketing de neumáticos.

Tuve que resolver desafíos complejos (como la comunicación en tiempo real y los filtros dinámicos) que me hicieron crecer como desarrollador. Estoy orgulloso del resultado final y del valor que aporta esta solución.
