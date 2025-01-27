const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const clienteRoutes = require('./routes/clienteRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Conectar a la base de datos
connectDB();

// Usar las rutas
app.use('/clientes', clienteRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});