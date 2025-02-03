const Cliente = require("../models/cliente");

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
      consultado,
    } = req.query;
    const options = {
      page: page,
      limit: limit,
      sort: {},
    };

    // Configurar el orden
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
    if (consultado !== undefined) {
      filter.consultado = consultado === "true";
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
const updateConsultadoStatus = async (req, res, io) => {
  try {
    const { numeroOrden } = req.params;
    const { consultado } = req.body;

    console.log("Datos recibidos:", { numeroOrden, consultado }); // Depuración

    const cliente = await Cliente.findOneAndUpdate(
      { NumeroOrden: numeroOrden },
      { consultado },
      { new: true }
    );

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Emitir un evento a todos los clientes
    io.emit("cliente_actualizado", cliente);

    res.json(cliente);
  } catch (error) {
    console.error("Error al actualizar el estado de consultado:", error);
    res.status(500).json({
      message: "Hubo un error al actualizar el estado de consultado.",
    });
  }
};

// Función para agregar anotaciones
const addAnotacion = async (req, res, io) => {
  try {
    const { numeroOrden } = req.params;
    const { texto } = req.body;

    const cliente = await Cliente.findOneAndUpdate(
      { NumeroOrden: numeroOrden },
      { $push: { anotaciones: { texto } } },
      { new: true }
    );

    io.emit("cliente_actualizado", cliente); // Notificar a todos
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar anotación" });
  }
};

// // Funcion para eliminar anotaciones
const deleteAnotacion = async (req, res, io) => {
  try {
    const { numeroOrden, anotacionId } = req.params;

    const cliente = await Cliente.findOneAndUpdate(
      { NumeroOrden: numeroOrden },
      { $pull: { anotaciones: { _id: anotacionId } } },
      { new: true }
    );

    io.emit("cliente_actualizado", cliente);
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar anotación" });
  }
};

// Exportar las funciones
module.exports = {
  getClientes,
  getClienteById,
  updateConsultadoStatus,
  addAnotacion,
  deleteAnotacion,
};
