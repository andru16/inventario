const mongoose = require('mongoose')


const categoriaSchema = new mongoose.Schema({
  nombre:{
    type:String,
    required:true
  },
  descripcion:{
    type:String,
    requirted:false
  }
})

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;
