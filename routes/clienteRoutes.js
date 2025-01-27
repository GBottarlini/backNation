const express = require('express');
const { getClientes, getClienteById } = require('../controllers/clienteController');

const router = express.Router();

// Ruta para obtener todos los clientes
router.get('/', getClientes);

// Ruta para obtener un cliente por su número de orden
router.get('/:numeroOrden', getClienteById);

module.exports = router;