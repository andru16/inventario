const mongoose = require('mongoose')

const permisoSchema = new mongoose.Schema({
  nombre:{
    type: String,
    required: true
  }
})

const Permiso = mongoose.model('Permiso', permisoSchema);

module.exports = Permiso;
