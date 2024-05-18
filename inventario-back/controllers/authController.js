const Usuario = require('../models/Usuario');
const Role = require('../models/Role');
const mongoose = require('../db/dbmongo');
// const { logOther } = require('../traits/activityTraits');

const login = async (req, res) => {
  const { correo_electronico, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo_electronico }).populate('rol').exec();

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    // Comparar la contraseña con el hash almacenado
    const isMatch = await usuario.comparePassword(contraseña);  // Modificado para usar async/await
    if (!isMatch) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const userToReturn = {
      ...usuario.toObject(),
      password: undefined
    };


    res.json(userToReturn);
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  login
}
