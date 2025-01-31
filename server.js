const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const clienteRoutes = require('./routes/clienteRoutes');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cors());

// Conectar a la base de datos
connectDB();

// Usar las rutas
app.use('/clientes', clienteRoutes);

// Configurar WebSockets
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado:', socket.id);

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado:', socket.id);
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Exportar io para usarlo en otros archivos
module.exports = io;