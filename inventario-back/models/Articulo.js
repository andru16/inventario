const mongoose = require('mongoose')


const articuloSchema = new mongoose.Schema({
  codigo:{
    type:String,
    required: true,
    lower: true,
    unique:true,
  },
  descripcion:{
    type:String,
    required:false
  },
  existencias:{
    type:Number,
    required:true,
    default:0
  },
  existencias_minima:{
    type:Number,
    required:true,
    default:5
  },
  precio_compra:{
    type: String,
    required:true
  },
  precio_venta:{
    type: String,
    required:true
  },
  unidad_medida:{
    type:String,
    required: true,
  },
  proveedor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Proveedor'
  },
  categoria:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Categoria'
  }
});


const Articulo = mongoose.model('Articulo', articuloSchema);
module.exports = Articulo;
