const Country = require('../models/Country')
const Reservation = require('../models/Reservation')
const { startOfDay, endOfDay } = require('date-fns');

const fs = require('fs/promises');
const path = require('path');
const rutaArchivo = path.join(__dirname, '../db/Countries.json');



const loadPaises = async (req, res) => {
  try {
    const contenido = await fs.readFile(rutaArchivo, 'utf-8');
    const data = JSON.parse(contenido);
    await Country.insertMany(data.countries);
    res.status(200).json({ mensaje: 'Paises insertados con éxito' });
  } catch (error) {
    console.error('Error al cargar los paises:', error);
    res.status(500).json({ mensaje: 'ha ocurrido un error', error: error });
  }
}


const getPaises = async (req, res) => {
  try {
    const paises = await Country.find({});
    res.status(200).json(paises);
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ mensaje: 'ha ocurrido un error', error: error });
  }
}

const getReservas = async (req, res) => {
  try {
    const reservas = await Reservation.find({}).populate('pais_origen').populate('pais_destino');
    res.status(200).json(reservas);
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ mensaje: 'ha ocurrido un error', error: error });
  }
}

const searchPaises = async (req, res) => {

  const searchTerm = req.query.term; // Obtener el término de búsqueda de la consulta

  try {
    // Si no se proporciona un término de búsqueda, buscar todos los países
    const countries = searchTerm
     ? await Country.find({ nombre: { $regex: searchTerm, $options: 'i' } }) // Filtrar por nombre con regex
      : await Country.find({});

    res.status(200).json(countries);
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ mensaje: 'Ha ocurrido un error', error: error });
  }
}

const storeReserva = async (req, res) => {
  const { pais_origen_id, pais_destino_id, fecha } = req.body;

  if (await validarReserva(pais_origen_id, pais_destino_id, fecha)) {
    res.status(200).json({ mensaje: 'Ya se encuentra registrada una reserva',icon:'warning' })
  } else {
    try {
      const reservation = new Reservation(
        {
          pais_origen: pais_origen_id,
          pais_destino: pais_destino_id,
          fecha: fecha
        }
      );
      await reservation.save();
      res.status(200).json({ mensaje: 'Reserva registrada exitosamente',icon:'success' });
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ mensaje: 'ha ocurrido un error', error: error });
    }
  }

}

// Validar si ya existe reserva
const validarReserva = async (origen, destino, fecha, res) => {
  try {
    const fechaInicio = startOfDay(new Date(fecha));
    const fechaFin = endOfDay(new Date(fecha));

    const reservas = await Reservation.find({
      pais_origen: origen,
      pais_destino: destino,
      fecha: fecha
    });

    const validacion_1= await Reservation.find({pais_origen: origen});
    const validacion_2= await Reservation.find({pais_destino: destino});
    const validacion_3= await Reservation.find({ fecha: { $gte: fechaInicio, $lte: fechaFin } });

    if (reservas.length > 0 || validacion_1.length > 0 || validacion_2.length > 0 || validacion_3.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error durante la búsqueda:', error);
    return false;
  }
}


module.exports = {
  getPaises,
  loadPaises,
  searchPaises,
  getReservas,
  storeReserva,
}
