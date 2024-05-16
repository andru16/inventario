const Inventario = require('../../models/Inventario');
const Articulo = require('../../models/Articulo');

// Obtener todos los registros de inventario
const getInventarios = async (req, res) => {
  try {
    const inventarios = await Inventario.find({}).populate({
      path: 'articulos.articulo',
      populate: { path: 'proveedor categoria' }
    });
    res.status(200).json(inventarios);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al obtener inventarios: " + error.message });
  }
};

// Obtener un registro de inventario específico
const getInventario = async (req, res) => {
  const { id } = req.params;
  try {
    const inventario = await Inventario.findById(id).populate({
      path: 'articulos.articulo',
      populate: { path: 'proveedor categoria' }
    });
    if (!inventario) {
      return res.status(404).send({ mensaje: "Inventario no encontrado." });
    }
    res.status(200).json(inventario);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al obtener el inventario: " + error.message });
  }
};

// Agregar un nuevo registro de inventario
const storeInventario = async (req, res) => {
  const { articulos } = req.body; // array de {articulo, cantidad}

  try {
    const nuevoInventario = new Inventario({
      articulos: articulos
    });
    await nuevoInventario.save();
    res.status(201).json({ mensaje: "Inventario creado correctamente", data: nuevoInventario });
  } catch (error) {
    res.status(500).send({ mensaje: "Error al crear el inventario: " + error.message });
  }
};

// Actualizar un registro de inventario
const updateInventario = async (req, res) => {
  const { id } = req.params;
  const { articulos } = req.body;

  try {
    const inventario = await Inventario.findById(id);
    if (!inventario) {
      return res.status(404).send({ mensaje: "Inventario no encontrado." });
    }

    inventario.articulos = articulos || inventario.articulos;
    await inventario.save();
    res.status(200).json({ mensaje: "Inventario actualizado correctamente", data: inventario });
  } catch (error) {
    res.status(500).send({ mensaje: "Error al actualizar el inventario: " + error.message });
  }
};

module.exports = {
  getInventarios,
  getInventario,
  storeInventario,
  updateInventario
};
