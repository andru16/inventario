const Articulo = require('../../models/Articulo')
const Categoria = require('../../models/Categoria')
const Inventario = require('../../models/Inventario')
const Registro = require('../../models/Registro')

const getArticulos = async (req,res) => {
  try {
    const articulos = await Articulo.find({}).populate('proveedor').populate('categoria');
    res.status(200).json(articulos);
  } catch (error) {
    res.status(500).send({mensaje: error});
  }
}


const  getArticulo = async (req,res) => {
  const {id} = req.body;
  try {
    const articulo = await Articulo.findById(id);
    res.status(200).json(articulo);
  } catch (error) {
    res.status(500).send({mensaje: error});
  }
}

const storeArticulo = async () => {
  const {codigo,descripcion,existencias,existencias_minima,precio_compra,precio_venta,unidad_medida,proveedor_id,categoria_id} = req.body;

  try {
    const categoria = await Categoria.findById(categoria_id);
    const proveedor = await Proveedor.findById(proveedor_id);

    const articulo = new Articulo({codigo,descripcion,existencias,existencias_minima,precio_compra,precio_venta,unidad_medida,proveedor: proveedor._id, categoria: categoria._id });
    await articulo.save();

    res.status(200).json({mensaje: "Articulo creado correctamente"});
  } catch (error) {
    res.status(500).send({mensaje: error});
  }
}

const updateArticulo = async (req,res) => {
  const { id } = req.params;
  const {codigo,descripcion,existencias,existencias_minima,precio_compra,precio_venta,unidad_medida,proveedor_id,categoria_id} = req.body;

  try {
    const articulo = Articulo.findById(id);

    if(!articulo){
      return res.status(404).json({mensaje: "Articulo no encontrado!"});
    }

    if (codigo) articulo.codigo = codigo;
    if (descripcion) articulo.descripcion = descripcion;
    if (existencias) articulo.existencias = existencias;
    if (existencias_minima) articulo.existencias_minima = existencias_minima;
    if (precio_compra) articulo.precio_compra = precio_compra;
    if (precio_venta) articulo.precio_venta = precio_venta;
    if (unidad_medida) articulo.unidad_medida = unidad_medida;
    if (proveedor_id) articulo.proveedor_id = proveedor_id;
    if (categoria_id) articulo.categoria_id = categoria_id;
    await articulo.save();

    res.status(200).json({mensaje: "Articulo actualizado correctamente"});
  } catch (error) {
    res.status(500).send({mensaje: error});
  }
}

const updateExistenciaArticulo = async () => {
  const { id } = req.params;
  const {existencias} = req.body;

  try {
    const articulo = Articulo.findById(id);

    if(!articulo){
      return res.status(400).json({mensaje: "Articulo no encontrado!"});
    }

    if (existencias) articulo.existencias = existencias;
    await articulo.save();

    res.status(200).json({mensaje: "Existencias Articulo actualizadas correctamente"});
  } catch (error) {
    res.status(500).send({mensaje: error});
  }
}

module.exports = {
  getArticulos,
  getArticulo,
  storeArticulo,
  updateArticulo,
  updateExistenciaArticulo
}
