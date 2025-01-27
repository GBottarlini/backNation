const Cliente = require('../models/cliente');

// Obtener todos los clientes
const getClientes = async (req, res) => {
    try {
        const { page = 1, limit = 10, nombre, sucursal, odometro, patente, vin, totalVenta, modelo, marca, ordenar } = req.query;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { TotalVenta: ordenar === 'desc' ? -1 : 1 } // Ordenar por TotalVenta
        };
        
        const filter = {};
        if (nombre) {
            filter.Nombre = { $regex: nombre, $options: 'i' }; // Filtrar por nombre (case insensitive)
        }
        if (sucursal) {
            filter.Sucursal = { $regex: sucursal, $options: 'i' }; // Filtrar por sucursal (case insensitive)
        }
        if (odometro) {
            filter.OdometroValor = { $gte: parseInt(odometro) }; // Filtrar por odómetro mayor o igual
        }
        if (patente) {
            filter.Patente = { $regex: patente, $options: 'i' }; // Filtrar por patente (case insensitive)
        }
        if (vin) {
            filter.VIN = { $regex: vin, $options: 'i' }; // Filtrar por VIN (case insensitive)
        }
        if (totalVenta) {
            filter.TotalVenta = { $gte: parseInt(totalVenta) }; // Filtrar por total de ventas mayor o igual
        }
        if (modelo) {
            filter.Modelo = { $regex: modelo, $options: 'i' }; // Filtrar por modelo (case insensitive)
        }
        if (marca) {
            filter.Marca = { $regex: marca, $options: 'i' }; // Filtrar por marca (case insensitive)
        }

        const result = await Cliente.paginate(filter, options);
        res.json(result);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ message: "Hubo un error al obtener los clientes." });
    }
};

const getClienteById = async (req, res) => {
    try {
        const { numeroOrden } = req.params;
        const cliente = await Cliente.findOne({ NumeroOrden: numeroOrden });
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json(cliente);
    } catch (error) {
        console.error('Error al obtener el cliente:', error);
        res.status(500).json({ message: "Hubo un error al obtener el cliente." });
    }
};

// Exportar las funciones
module.exports = {
    getClientes,
    getClienteById,
};