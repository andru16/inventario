const Categoria = require('../../models/Categoria')


const getCategorias = async (req,res) => {
  try {
    const categorias = await Categoria.find({});
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({mensaje: error})
  }
}

const getCategoria = async (req,res) => {
  const {id} = req.params;
  try {
    const categoria = await Categoria.findById(id);
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({mensaje: error});
  }
}


const storeCategoria = async (req,res) => {
  const {nombre,descripcion} = req.body;
  try {
    const categoria = new Categoria({nombre, descripcion});
    await categoria.save();
    res.status(200).json({mensaje: 'Categoria creada correctamente'});
  } catch (error) {
    res.status(500).json({mensaje: error});
  }
}

const updateCategoria = async (req,res) => {
  const {id} = req.params;
  const {nombre,descripcion} = req.body;

  try {
    const categoria = Categoria.findById(id);

    if(!categoria) res.status(404).json({mensaje: 'Categoria no encontrada!'});

    if(nombre) categoria.nombre = nombre;
    if(nombre) categoria.descripcion = descripcion;
    await categoria.save();

  } catch (error) {
    res.status(500).json({mensaje: error});
  }
}

module.exports = {
  getCategorias,
  getCategoria,
  storeCategoria,
  updateCategoria
}
