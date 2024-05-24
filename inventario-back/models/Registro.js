const mongoose = require('mongoose');

const registroSchema = new mongoose.Schema({
  articulos: [{
    articulo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Articulo',
      required: true
    },
    cantidad: {
      type: Number,
      required: true
    }
  }],
  tipo_movimiento: {
    type: String,
    enum: ['entrada', 'salida'],
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
  if (registro.isModified('articulos')) {
    try {
      for (let i = 0; i < registro.articulos.length; i++) {
        const item = registro.articulos[i];
        const articulo = await mongoose.model('Articulo').findById(item.articulo);
        if (!articulo) throw new Error(`Artículo no encontrado para el ID: ${item.articulo}`);

        // Actualiza el stock según si el movimiento es de entrada o salida
        if (registro.tipo_movimiento === 'entrada') {
          articulo.existencias += item.cantidad;
        } else if (registro.tipo_movimiento === 'salida') {
          articulo.existencias -= item.cantidad;
          if (articulo.existencias < 0) throw new Error('No hay suficiente stock para la salida');
        }

        await articulo.save();
      }
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
