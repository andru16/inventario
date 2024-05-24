const mongoose = require('mongoose')

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const usuarioSchema = new mongoose.Schema({
  nombres:{
    type: String,
    required: true,
  },
  apellidos:{
    type: String,
    required: true,
  },
  correo_eletronico:{
    type: String,
    required: true,
  },
  contraseña:{
    type: String,
    required: true,
  },
  rol:{
    type: String,
    required: true,
  }
})


// Pre-save hook para hashear la contraseña
usuarioSchema.pre('save', function (next) {
  const usuario = this;

  // Solo hashear la contraseña si ha sido modificada (o es nueva)
  if (!usuario.isModified('contraseña')) return next();

  // Generar un "salt"
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // Hashear la contraseña usando el nuevo salt
    bcrypt.hash(usuario.contraseña, salt, function (err, hash) {
      if (err) return next(err);

      // Reemplazar la contraseña ingresada con el hash
      usuario.contraseña = hash;
      next();
    });
  });
});

// Método para comparar la contraseña ingresada con el hash almacenado
usuarioSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.contraseña, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};


const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
