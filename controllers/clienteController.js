const Cliente = require("../models/cliente");
const { io } = require("../server"); // Importar io desde server.js

// Obtener todos los clientes
const getClientes = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      nombre,
      sucursal,
      odometroMin,
      odometroMax,
      patente,
      vin,
      totalVenta,
      modelo,
      marca,
      ordenar,
      sortBy,
    } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: {},
    };

    // Configurar la ordenación
    if (sortBy && ordenar) {
      options.sort[sortBy] = ordenar === "desc" ? -1 : 1;
    } else {
      options.sort["OdometroValor"] = -1; // Default: ordenar por Odómetro de mayor a menor
    }

    const filter = {};
    if (nombre) {
      filter.Nombre = { $regex: nombre, $options: "i" };
    }
    if (sucursal) {
      filter.Sucursal = { $regex: sucursal, $options: "i" };
    }
    if (odometroMin || odometroMax) {
      filter.OdometroValor = {};
      if (odometroMin) filter.OdometroValor.$gte = parseInt(odometroMin);
      if (odometroMax) filter.OdometroValor.$lte = parseInt(odometroMax);
    }
    if (patente) {
      filter.Patente = { $regex: patente, $options: "i" };
    }
    if (vin) {
      filter.VIN = { $regex: vin, $options: "i" };
    }
    if (totalVenta) {
      filter.TotalVenta = { $gte: parseInt(totalVenta) };
    }
    if (modelo) {
      filter.Modelo = { $regex: modelo, $options: "i" };
    }
    if (marca) {
      filter.Marca = { $regex: marca, $options: "i" };
    }

    const result = await Cliente.paginate(filter, options);
    res.json(result);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
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
    console.error("Error al obtener el cliente:", error);
    res.status(500).json({ message: "Hubo un error al obtener el cliente." });
  }
};

// Actualizacion de clientes consultados
const updateConsultadoStatus = async (req, res) => {
  try {
      const { numeroOrden } = req.params;
      const { consultado } = req.body;

      // Buscar y actualizar por NumeroOrden (debe ser único)
      const cliente = await Cliente.findOneAndUpdate(
          { NumeroOrden: numeroOrden },  // <-- Usar NumeroOrden para la búsqueda
          { consultado: consultado },      // <-- Asignar el valor directamente
          { new: true }
      );

      if (!cliente) {
          return res.status(404).json({ message: "Cliente no encontrado" });
      }

      // Emitir el evento con el cliente actualizado (incluir NumeroOrden)
      io.emit("cliente_actualizado", cliente); // <-- Enviar el objeto cliente completo

      res.json(cliente);
  } catch (error) {
      console.error("Error al actualizar el estado de consultado:", error);
      res.status(500).json({
          message: "Hubo un error al actualizar el estado de consultado.",
      });
  }
};

// Exportar las funciones
module.exports = {
  getClientes,
  getClienteById,
  updateConsultadoStatus,
};

