const Usuario = require('../../models/Usuario');
const Role = require('../../models/Role');

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({});
    res.json(usuarios);
  } catch (error) {
    console.error('Error al cargar los usuarios:', error);
    res.status(500).json({ mensaje: 'Error al cargar los usuarios' });
  }
};

const traerUsuario = async (req, res) => {
  const { id } = req.body;
  try {
    const usuario = await Usuario.findById(id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).send({ mensaje: error });
  }
};

const crearUsuario = async (req, res) => {
  const { nombres, apellidos, correo_electronico, contraseña, rol } = req.body;
  try {
    const nuevoUsuario = new Usuario({
      nombres,
      apellidos,
      correo_electronico,
      contraseña,
      rol,
    });
    await nuevoUsuario.save();
    res
      .status(201)
      .json({ mensaje: 'Usuario creado correctamente', data: nuevoUsuario });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al crear el usuario: ' + error.message });
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, correo_electronico, contraseña, rol } = req.body;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: 'el ID de usuario no es válido' });
    }

    const actUsuario = await Usuario.findById(id);

    if (!actUsuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (nombres) actUsuario.nombres = nombres;
    if (apellidos) actUsuario.apellidos = apellidos;
    if (correo_electronico) actUsuario.correo_eletronico = correo_electronico;
    if (contraseña) actUsuario.contraseña = contraseña;
    if (rol) actUsuario.rol = rol;

    await actUsuario.save();
    res.json({ mensaje: 'Usuario actualizado', usuario: actUsuario });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
  }
};

module.exports = {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  traerUsuario,
};
