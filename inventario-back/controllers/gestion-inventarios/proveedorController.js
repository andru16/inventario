// controllers/proveedorController.js
const Proveedor = require('../../models/Proveedor');

const storeProveedor = async (req, res) => {
  try {
    const nuevoProveedor = new Proveedor(req.body);
    await nuevoProveedor.save();
    res.status(200).json({ mensaje: "Proveedor creado correctamente" });
  } catch (error) {
    res.status(500).send({ mensaje: error });
  }
};

const getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).send({ mensaje: error });
  }
};

const getProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) {
      return res.status(404).json({mensaje: "Proveedor no encontrado!"});
    }
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ mensaje: error });
  }
};

const updateProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!proveedor) {
      return res.status(404).json({mensaje: "Proveedor no encontrado!"});
    }
    res.status(200).json({mensaje: "Proveedor actualizado correctamente"});
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
    if (!proveedor) {
      return res.status(404).json({mensaje: "Proveedor no encontrado!"});
    }
    res.json(proveedor);
  } catch (error) {
    res.status(500).send({ mensaje: error });
  }
};


module.exports = {
  storeProveedor,
  getProveedores,
  getProveedor,
  updateProveedor,
  deleteProveedor,
}
