import React, { useEffect, useState } from 'react';
import Layout from '../../components/plantilla/Layout';
import Modal from '../../components/plantilla/Modal';
import Swal from 'sweetalert2';

export const Inventario = () => {
    const [inventarios, setInventarios] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [articulos, setArticulos] = useState([]);
    const [selectedArticulo, setSelectedArticulo] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [method, setMethod] = useState('POST');
    const url_base = 'http://localhost:4000/v1/soft-inventarios/inventarios/';

    const toggleModal = () => setModalOpen(!isModalOpen);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'selectedArticulo') setSelectedArticulo(value);
        else if (name === 'cantidad') setCantidad(value);
    };

    const cargarInventarios = async () => {
        try {
            const response = await fetch(`${url_base}`);
            const data = await response.json();
            setInventarios(data);
        } catch (error) {
            Swal.fire('Error', `Error al cargar los inventarios: ${error}`, 'error');
        }
    };

    const cargarArticulos = async () => {
        try {
            const response = await fetch('http://localhost:4000/v1/soft-inventarios/articulos');
            const data = await response.json();
            setArticulos(data);
        } catch (error) {
            Swal.fire('Error', `Error al cargar artículos: ${error}`, 'error');
        }
    };

    const guardarInventario = async (e) => {
        e.preventDefault();
        try {
            const body = JSON.stringify({
                articulos: [{ articulo: selectedArticulo, cantidad: parseInt(cantidad, 10) }]
            });
            const response = await fetch(`${url_base}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body,
            });
            const result = await response.json();
            Swal.fire('Éxito', result.mensaje, 'success');
            cargarInventarios();
            toggleModal();
        } catch (error) {
            Swal.fire('Error', `Error al guardar el inventario: ${error}`, 'error');
        }
    };

    useEffect(() => {
        cargarInventarios();
        cargarArticulos();
    }, []);

    return (
        <Layout menu_active="inventario">
            <div className="rows col-md-12">
                <div className="box box-danger">
                    <div className="box-content">
                        <button onClick={() => { setMethod('POST'); toggleModal(); }} className="btn btn-primary">
                            Agregar al Inventario
                        </button>
                        <table className="">
                            <thead>
                                <tr>
                                    <th>Artículo</th>
                                    <th>Cantidad</th>
                                    <th>Última Actualización</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventarios.map((inv) => (
                                    <tr key={inv._id}>
                                        <table>
                                            <tbody>
                                                {inv.articulos.map((art) =>
                                                    <tr>
                                                        <td key={art._id}>{art.articulo.descripcion} - {art.articulo.codigo}</td>
                                                        <td>{art.cantidad}</td>
                                                        <td>{new Date(inv.fecha_actualizacion).toLocaleDateString()}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={toggleModal} title={method === 'POST' ? 'Agregar Inventario' : 'Actualizar Inventario'}>
                <form onSubmit={guardarInventario}>
                    <div className="form-group">
                        <label htmlFor="selectedArticulo">Artículo</label>
                        <select className="form-control" name="selectedArticulo" value={selectedArticulo} onChange={handleInputChange} required>
                            {articulos.map((articulo) => (
                                <option key={articulo._id} value={articulo._id}>{articulo.descripcion}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cantidad">Cantidad</label>
                        <input type="number" className="form-control" name="cantidad" value={cantidad} onChange={handleInputChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
            </Modal>
        </Layout>
    );
};

export default Inventario;
