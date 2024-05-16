const mongoose = require('mongoose');

const registroSchema = new mongoose.Schema({
  articulo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Articulo',
    required: true
  },
  tipo_movimiento: {
    type: String,
    enum: ['entrada', 'salida'],
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  descripcion: {
    type: String,
    required: false
  }
});

registroSchema.pre('save', async function(next) {
  const registro = this;
  if (registro.isModified('cantidad')) {
    try {
      const articulo = await mongoose.model('Articulo').findById(registro.articulo);
      if (!articulo) throw new Error('Artículo no encontrado');

      // Actualiza el stock según si el movimiento es de entrada o salida
      if (registro.tipo_movimiento === 'entrada') {
        articulo.stock += registro.cantidad;
      } else if (registro.tipo_movimiento === 'salida') {
        articulo.stock -= registro.cantidad;
        if (articulo.stock < 0) throw new Error('No hay suficiente stock para la salida');
      }

      await articulo.save();
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});


const Registro = mongoose.model('Registro', registroSchema);
module.exports = Registro;
