const Registro = require('../../models/Registro');
const Articulo = require('../../models/Articulo');

// Obtener todos los registros
const getRegistros = async (req, res) => {
  try {
    const registros = await Registro.find({}).populate('articulos.articulo');
    res.status(200).json(registros);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al obtener registros: " + error.message });
  }
};

// Obtener un registro específico
const getRegistro = async (req, res) => {
  const { id } = req.params;
  try {
    const registro = await Registro.findById(id).populate('articulos.articulo');
    if (!registro) {
      return res.status(404).send({ mensaje: "Registro no encontrado." });
    }
    res.status(200).json(registro);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al obtener el registro: " + error.message });
  }
};

// Crear un nuevo registro
const storeRegistro = async (req, res) => {
  const { articulos, tipo_movimiento, descripcion } = req.body;
  res
  try {
    const nuevoRegistro = new Registro({
      articulos,
      tipo_movimiento,
      descripcion
    });
    await nuevoRegistro.save();
    res.status(200).json({ mensaje: "Registro creado correctamente", data: nuevoRegistro });
  } catch (error) {
    res.status(500).send({ mensaje: "Error al crear el registro: " + error.message });
  }
};

// Actualizar un registro
const updateRegistro = async (req, res) => {
  const { id } = req.params;
  const { articulos, tipo_movimiento, descripcion } = req.body;

  try {
    const registro = await Registro.findById(id);
    if (!registro) {
      return res.status(404).send({ mensaje: "Registro no encontrado." });
    }

    registro.articulos = articulos || registro.articulos;
    registro.tipo_movimiento = tipo_movimiento || registro.tipo_movimiento;
    registro.descripcion = descripcion || registro.descripcion;

    await registro.save();
    res.status(200).json({ mensaje: "Registro actualizado correctamente", data: registro });
  } catch (error) {
    res.status(500).send({ mensaje: "Error al actualizar el registro: " + error.message });
  }
};

module.exports = {
  getRegistros,
  getRegistro,
  storeRegistro,
  updateRegistro
};
