import React, { useEffect, useState } from 'react';
import Layout from '../../components/plantilla/Layout';
import Modal from '../../components/plantilla/Modal';
import Swal from 'sweetalert2';

const Inventario = () => {

    // Definicion de hooks
    const [isModalOpen, setModalOpen] = useState(false);
    const [articulos, setArticulos] = useState([]);
    const [registros, setRegistros] = useState([]);
    const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);
    const url_base = 'http://localhost:4000/v1/soft-inventarios/';

    const [method, setMethod] = useState('');
    const [tituloModal, setTituloModal] = useState('');
    const [urlEnviar, setUrlEnviar] = useState('');

    const [tipoMovimiento, setTipoMovimiento] = useState('entrada');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');

    //funciones
    const toggleModal = () => { 
        setModalOpen(!isModalOpen); 
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'tipo_movimiento':
                setTipoMovimiento(value);
                break;
            case 'fecha':
                setFecha(value);
                break;
            case 'descripcion':
                setDescripcion(value);
                break;
            default:
                break;
        }
    };

    const agregarRegistro = () => {
        setTituloModal("Agregar Nuevo Registro");
        setMethod('POST');
        setUrlEnviar(`${url_base}registros/guardar`);
        toggleModal();
    };

    const actualizarRegistro = async (registro) => {
        setTipoMovimiento(registro.tipo_movimiento);
        setFecha(new Date(registro.fecha).toISOString().split('T')[0]);
        setDescripcion(registro.descripcion);
        setArticulosSeleccionados(registro.articulos.map(item => ({
            articulo: item.articulo._id,
            cantidad: item.cantidad
        })));

        setUrlEnviar(`${url_base}registros/${registro._id}`);
        setTituloModal('Actualizar Registro');
        setMethod('PUT');
        toggleModal();
    };

    // Cargar registros
    const cargarRegistros = async () => {
        let data = await fetch(`${url_base}registros`)
            .then(data => data.json())
            .then(res => res);
        setRegistros(data);
    };

    // Cargar artículos
    const cargarArticulos = async () => {
        let data = await fetch(`${url_base}articulos`)
            .then(data => data.json())
            .then(res => res);
        setArticulos(data);
    };

    const agregarArticuloSeleccionado = () => {
        setArticulosSeleccionados([...articulosSeleccionados, { articulo: '', cantidad: 0 }]);
    };

    const handleArticuloSeleccionadoChange = (index, field, value) => {
        const nuevosArticulosSeleccionados = [...articulosSeleccionados];
        nuevosArticulosSeleccionados[index][field] = value;
        setArticulosSeleccionados(nuevosArticulosSeleccionados);
    };

    const guardarInformacion = async (e) => {
        e.preventDefault();

        let datos = {
            articulos: articulosSeleccionados,
            tipo_movimiento: tipoMovimiento,
            fecha: fecha,
            descripcion: descripcion
        };

        fetch(urlEnviar, {
            method: method,
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch((error) => {
                Swal.fire({
                    title: '',
                    text: `Ha ocurrido un error ${error}`,
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                });
            })
            .then((response) => {
                Swal.fire({
                    title: '',
                    text: `${response.mensaje}`,
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                });
                limpiarCampos();
                cargarRegistros();
                toggleModal();
            });
    };

    const limpiarCampos = () => {
        setArticulosSeleccionados([]);
        setTipoMovimiento('entrada');
        setFecha('');
        setDescripcion('');

        setUrlEnviar('');
        setTituloModal('');
        setMethod('');
    };

    useEffect(() => {
        cargarRegistros();
        cargarArticulos();
    }, []);

    return (
        <Layout menu_active="registros">
            <div className="rows col-md-12 col-xl-12">
                <div className="box box-danger">
                    <div className="box-content">

                        <div className='row mb-5'>
                            <div className="col-md-3">
                                <button onClick={agregarRegistro} className='btn btn-primary'>
                                    <i className="zmdi zmdi-collection-plus mr-2"></i>
                                    Agregar Registro
                                </button>
                            </div>
                        </div>

                        <table className="" width="100%">
                            <thead>
                                <tr>
                                    <th className='text-left pb-2'>Artículos</th>
                                    <th className='text-left pb-2'>Tipo Movimiento</th>
                                    <th className='text-left pb-2'>Fecha</th>
                                    <th className='text-left pb-2'>Descripción</th>
                                    <th className='text-left pb-2'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {registros.map((registro, i) =>
                                    <tr key={i}>
                                        <td className='border-bottom pt-0 pb-2'>
                                            {registro.articulos.map((item, idx) => (
                                                <div key={idx}>{item.articulo.codigo} - Cantidad: {item.cantidad}</div>
                                            ))}
                                        </td>
                                        <td className='border-bottom pt-0 pb-2'>{registro.tipo_movimiento}</td>
                                        <td className='border-bottom pt-0 pb-2'>{new Date(registro.fecha).toLocaleDateString()}</td>
                                        <td className='border-bottom pt-0 pb-2'>{registro.descripcion}</td>
                                        <td className="text-center border-bottom pt-0 pb-2">
                                            <div className="btn-group">
                                                <button
                                                    type='button'
                                                    className='btn btn-info pt-0 pb-0 px-1 text-white'
                                                    onClick={() => actualizarRegistro(registro)}
                                                >
                                                    <i className="fa-regular fa-pen-to-square"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modales */}
            <Modal isOpen={isModalOpen} onClose={toggleModal} title={tituloModal}>
                <form onSubmit={guardarInformacion} className="form">
                    {articulosSeleccionados.map((item, index) => (
                        <div key={index} className="row my-2">
                            <div className="col-md-6">
                                <label>Artículo</label>
                                <select
                                    name="articulo"
                                    value={item.articulo}
                                    onChange={(e) => handleArticuloSeleccionadoChange(index, 'articulo', e.target.value)}
                                    required
                                    className='form-control'
                                >
                                    <option value="">Seleccione un artículo</option>
                                    {articulos.map((articulo) => (
                                        <option key={articulo._id} value={articulo._id}>{articulo.descripcion}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label>Cantidad</label>
                                <input
                                    type="number"
                                    name="cantidad"
                                    value={item.cantidad}
                                    onChange={(e) => handleArticuloSeleccionadoChange(index, 'cantidad', e.target.value)}
                                    required
                                    className='form-control'
                                />
                            </div>
                        </div>
                    ))}
                    <div className="row my-3">
                        <div className="col-md-12">
                            <button type="button" className="btn btn-secondary" onClick={agregarArticuloSeleccionado}>Agregar Artículo</button>
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className="col-md-12">
                            <label>Tipo de Movimiento</label>
                            <select
                                name="tipo_movimiento"
                                value={tipoMovimiento}
                                onChange={handleChange}
                                required
                                className='form-control'
                            >
                                <option value="entrada">Entrada</option>
                                <option value="salida">Salida</option>
                            </select>
                        </div>
                    </div>

                    <div className="row my-2">
                        <div className="col-md-12">
                            <label>Fecha</label>
                            <input
                                type="date"
                                name="fecha"
                                value={fecha}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className="col-md-12">
                            <label>Descripción</label>
                            <textarea
                                name="descripcion"
                                value={descripcion}
                                onChange={handleChange}
                                className='form-control'
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div>
                            <button type="submit" className="btn btn-primary my-2">Guardar Registro</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};

export default Inventario;
