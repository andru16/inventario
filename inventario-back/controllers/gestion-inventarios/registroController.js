const Registro = require('../../models/Registro');

// Obtener todos los registros
const getRegistros = async (req, res) => {
  try {
    const registros = await Registro.find().populate('articulo');
    res.status(200).json(registros);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los registros: " + error.message });
  }
};

// Obtener un registro específico por ID
const getRegistro = async (req, res) => {
  const { id } = req.params;
  try {
    const registro = await Registro.findById(id).populate('articulo');
    if (!registro) {
      return res.status(404).json({ mensaje: "Registro no encontrado." });
    }
    res.status(200).json(registro);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el registro: " + error.message });
  }
};

// Crear un nuevo registro
const storeRegistro = async (req, res) => {
  const { articulo, tipo_movimiento, cantidad, descripcion } = req.body;
  try {
    const nuevoRegistro = new Registro({
      articulo,
      tipo_movimiento,
      cantidad,
      descripcion
    });
    await nuevoRegistro.save();
    res.status(201).json({ mensaje: "Registro creado correctamente", data: nuevoRegistro });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el registro: " + error.message });
  }
};

// Actualizar un registro existente
const updateRegistro = async (req, res) => {
  const { id } = req.params;
  const { tipo_movimiento, cantidad, descripcion } = req.body;

  try {
    const registro = await Registro.findById(id);
    if (!registro) {
      return res.status(404).json({ mensaje: "Registro no encontrado." });
    }

    registro.tipo_movimiento = tipo_movimiento || registro.tipo_movimiento;
    registro.cantidad = cantidad || registro.cantidad;
    registro.descripcion = descripcion || registro.descripcion;

    await registro.save();
    res.status(200).json({ mensaje: "Registro actualizado correctamente", data: registro });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el registro: " + error.message });
  }
};

module.exports = {
  getRegistros,
  getRegistro,
  storeRegistro,
  updateRegistro
};
