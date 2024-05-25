const mongoose = require('mongoose')

const proveedorSchema = new mongoose.Schema({
  nit:{
    type: String,
    required: true,
  },
  razon_social:{
    type: String,
    required: true,
  },
  correo_electronico:{
    type: String,
    required: true,
  },
  telefono:{
    type: String,
    required: true,
  },
  direccion:{
    type: String,
    required: true,
  },
  ciudad:{
    type: String,
    required: true,
  }
})



const Proveedor = mongoose.model('Proveedor', proveedorSchema);

module.exports = Proveedor;