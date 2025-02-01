const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const clienteSchema = new mongoose.Schema({
    NumeroOrden: Number,
    Nombre: String,
    Sucursal: String,
    Apertura: Date,
    ServiciosVenta: Number,
    RepuestosVenta: Number,
    TercerosVenta: Number,
    TotalVenta: Number,
    Descripcion: String,
    Recepcionista: String,
    EMPRESA: String,
    Cierre: Date,
    Cargo: String,
    Modelo: String,
    Año: Number,
    Marca: String,
    VIN: String,
    Patente: String,
    OdometroValor: Number,
    IncidentesCliente: String,
    IncidentesRecepcionista: String,
    ResultadoTecnico: String,
    consultado: { type: Boolean, default: false },
});

// Usar el plugin de paginación
clienteSchema.plugin(mongoosePaginate);

const Cliente = mongoose.model('Cliente', clienteSchema, 'Clientes');

module.exports = Cliente;