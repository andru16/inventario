const mongoose = require('mongoose');

const inventarioSchema = new mongoose.Schema({
  articulos: [{
    articulo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Articulo'
    },
    cantidad: {
      type: Number,
      required: true
    }
  }],
  fecha_actualizacion: {
    type: Date,
    default: Date.now
  }
});

const Inventario = mongoose.model('Inventario', inventarioSchema);
module.exports = Inventario;
