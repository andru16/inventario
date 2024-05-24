import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/plantilla/Layout";
import { useAuth } from "../providers/AuthContext";
import Swal from "sweetalert2";

const DashBoard = () => {
    const { userAuth, logout } = useAuth();

    const [articulos, setArticulos] = useState([]);
    const [registros, setRegistros] = useState([]);
    const [estadisticas, setEstadisticas] = useState({ totalArticulos: 0, totalRegistros: 0 });

    const url_base = 'http://localhost:4000/v1/soft-inventarios/';

    const cargarArticulos = async () => {
        try {
            const data = await fetch(`${url_base}articulos`)
                .then(response => response.json());
            setArticulos(data);
            setEstadisticas(prev => ({ ...prev, totalArticulos: data.length }));
        } catch (error) {
            Swal.fire({
                title: '',
                text: `Error al cargar artículos: ${error}`,
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        }
    };

    const cargarRegistros = async () => {
        try {
            const data = await fetch(`${url_base}registros`)
                .then(response => response.json());
            setRegistros(data);
            setEstadisticas(prev => ({ ...prev, totalRegistros: data.length }));
        } catch (error) {
            Swal.fire({
                title: '',
                text: `Error al cargar registros: ${error}`,
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        }
    };

    useEffect(() => {
        cargarArticulos();
        cargarRegistros();
    }, []);

    return (
        <Layout menu_active="inicio">
            <div className="rows col-md-12 col-xl-12">
                <div className="box box-danger">
                    <div className="box-content">

                        <div className="row">
                            <div className="col-md-6 col-xl-4">
                                <div className="card shadow-sm mb-4 border">
                                    <div className="card-body d-flex align-items-center">
                                        <i className="fa-solid fa-boxes-stacked fa-3x me-3"></i>
                                        <div>
                                            <h5 className="card-title">Total de Artículos</h5>
                                            <p className="card-text">{estadisticas.totalArticulos}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card shadow-sm mb-4 border">
                                    <div className="card-body d-flex align-items-center">
                                        <i className="fa-solid fa-file-invoice-dollar fa-3x me-3"></i>
                                        <div>
                                            <h5 className="card-title">Total de Registros</h5>
                                            <p className="card-text">{estadisticas.totalRegistros}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-6">
                                <h3>Artículos Recientes</h3>
                                <table className="">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Código</th>
                                            <th className="text-center">Descripción</th>
                                            <th className="text-center">Existencias</th>
                                            <th className="text-center">Precio Venta</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {articulos.slice(0, 5).map((articulo) => (
                                            <tr key={articulo._id}>
                                                <td className="text-center">{articulo.codigo}</td>
                                                <td className="text-center">{articulo.descripcion}</td>
                                                <td className="text-center">{articulo.existencias}</td>
                                                <td className="text-center">{articulo.precio_venta}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-6">
                                <h3>Registros Recientes</h3>
                                <table className="">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Fecha</th>
                                            <th className="text-center">Tipo Movimiento</th>
                                            <th className="text-center">Artículos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {registros.slice(0, 5).map((registro) => (
                                            <tr key={registro._id}>
                                                <td className="text-center">{new Date(registro.fecha).toLocaleDateString()}</td>
                                                <td className="text-center">{registro.tipo_movimiento}</td>
                                                <td className="text-center">
                                                    {registro.articulos.map((item, idx) => (
                                                        <div key={idx}>cod: {item.articulo.codigo} - Cantidad: {item.cantidad}</div>
                                                    ))}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DashBoard;
