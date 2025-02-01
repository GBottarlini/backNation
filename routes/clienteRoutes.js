const express = require('express');
const { getClientes, getClienteById, updateConsultadoStatus } = require('../controllers/clienteController');

const router = express.Router();

module.exports = (io) => {
    // Ruta para obtener todos los clientes
    router.get('/', getClientes);

    // Ruta para obtener un cliente por su número de orden
    router.get('/:numeroOrden', getClienteById);

    // Ruta para mostrar clientes consultados
    router.put('/:numeroOrden/consultado', (req, res) => updateConsultadoStatus(req, res, io));

    return router;
};