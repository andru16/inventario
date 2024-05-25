const Proveedor = require('../../models/Proveedor')


const listarProveedor = async (req, res) => {
  try {
    const proveedores = await Proveedor.find({});
    res.json(proveedores);
  } catch (error) {
    console.error("Error al cargar los proveedores:", error);
    res.status(500).json({ mensaje: "Error al cargar los proveedores" });
  }
};

const traerProveedor = async (req, res) => {
  const { id } = req.body;
  try {
    const proveedor = await Proveedor.findById(id);
    res.status(200).json(proveedor);
  } catch (error) {
    res.status(500).send({ mensaje: error });
  }
};

const crearProveedor = async (req, res) => {
  const { nit, razon_social, correo_electronico, telefono, direccion, ciudad } = req.body;
  try {
    const nuevoProveedor = new Proveedor({
      nit, razon_social, correo_electronico, telefono, direccion, ciudad
    });
    await nuevoProveedor.save();
    res.status(200).json({ mensaje: "Proveedor creado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el proveedor: " + error.message });
  }
};

const actualizarProveedor = async (req, res) => {
  const { id } = req.params;
  const { nit, razon_social, correo_electronico, telefono, direccion, ciudad } = req.body;

  try {

    const actProveedor = await Proveedor.findById(id)

    if (nit) actProveedor.nit = nit;
    if (razon_social) actProveedor.razon_social = razon_social;
    if (correo_electronico) actProveedor.correo_electronico = correo_electronico;
    if (telefono) actProveedor.telefono = telefono;
    if (direccion) actProveedor.direccion = direccion;
    if (ciudad) actProveedor.ciudad = ciudad;

    await actProveedor.save();

    res.json({ mensaje: "Proveedor actualizado", usuario: actProveedor });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: "Error al actualizar Proveedor" });
  }
};
module.exports = {
  listarProveedor,
  crearProveedor,
  actualizarProveedor,
  traerProveedor
};
