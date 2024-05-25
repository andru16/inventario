import React, { useEffect, useState } from 'react';
import Layout from '../../components/plantilla/Layout';
import Modal from '../../components/plantilla/Modal';
import Swal from 'sweetalert2';

const Usuario = () => {

    const [isModalOpen, setModalOpen] = useState(false);

    const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);
    const url_base = 'http://localhost:4000/v1/soft-inventarios/';

    const [usuarios, setUsuarios] = useState([]);

    const [method, setMethod] = useState('');
    const [tituloModal, setTituloModal] = useState('');
    const [urlEnviar, setUrlEnviar] = useState('');

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rol, setRol] = useState('');

    const toggleModal = () => { 
        setModalOpen(!isModalOpen); 

    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'nombres':
                setNombres(value);
                break;
            case 'apellidos':
                setApellidos(value);
                break;
            case 'correo':
                setCorreo(value);
                break;
            case 'contraseña':
                setContraseña(value);
                break;
            case 'rol':
                setRol(value);
                break;
            default:
                break;
        }
    };

    const agregarRegistro = () => {
        setTituloModal("Agregar Nuevo Usuario");
        setMethod('POST');
        setUrlEnviar(`${url_base}usuario/crear-usuario`);
        toggleModal();
    };

    const actualizarRegistro = async (registro) => {
        setNombres(registro.nombres);
        setApellidos(registro.apellidos);
        setCorreo(registro.correo_electronico);
        setContraseña('');
        setRol(registro.rol)

        setUrlEnviar(`${url_base}usuario/editar-usuario/${registro._id}`);
        setTituloModal('Actualizar Usuario');
        setMethod('PUT');
        toggleModal();
    };

    // Cargar registros
    const cargarRegistros = async () => {
        let data = await fetch(`${url_base}usuario`)
            .then(data => data.json())
            .then(res => res);
        setUsuarios(data);
    };

    const guardarInformacion = async (e) => {
        e.preventDefault();

        let datos = {
            nombres: nombres,
            apellidos: apellidos,
            correo_electronico: correo,
            contraseña: contraseña,
            rol: rol,
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
        setNombres('');
        setApellidos('');
        setCorreo('');
        setContraseña('');
        setRol('');

        setUrlEnviar('');
        setTituloModal('');
        setMethod('');
    };

    useEffect(() => {
        cargarRegistros();
    }, []);

    return (
        <Layout menu_active="usuarios">
            <div className="rows col-md-12 col-xl-12">
                <div className="card bg-dark text-white">
                    <div className="card-body">

                        <div className='row mb-5'>
                            <div className="col-md-3">
                                <button onClick={agregarRegistro} className='btn btn-primary'>
                                    <i className="zmdi zmdi-collection-plus mr-2"></i>
                                    Agregar Usuario
                                </button>
                            </div>
                        </div>

                        <table className="table table-dark table-hover" width="100%">
                            <thead>
                                <tr>
                                    <th className=''>Usuario</th>
                                    <th className=''>Correo electrónico</th>
                                    <th className=''>Rol</th>
                                    <th className='text-center'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario, i) =>
                                    <tr className='' key={i}>
                                        <td>
                                            {usuario.nombres}  {usuario.apellidos}
                                        </td>
                                        <td>{usuario.correo_electronico}</td>
                                        <td>{usuario.rol}</td>
                                        <td className="text-center">
                                            <div className="btn-group">
                                                <button
                                                    type='button'
                                                    className='btn btn-info pt-0 pb-0 px-1 text-white'
                                                    onClick={() => actualizarRegistro(usuario)}
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
                
                    <div className="row my-2">
                        <div className="col-md-12">
                            <label>Nombres</label>
                            <input
                                type="text"
                                name="nombres"
                                value={nombres}
                                 onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-md-12">
                            <label>Apellidos</label>
                            <input
                                type="text"
                                name="apellidos"
                                value={apellidos}
                                 onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-md-12">
                            <label>Correo electrónico</label>
                            <input
                                id='email'
                                type="text"
                                name="correo"
                                value={correo}
                                 onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-md-12">
                            <label>Contraseña</label>
                            <input
                                id='email'
                                type="password"
                                name="contraseña"
                                value={contraseña}
                                 onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className="col-md-12">
                            <label>Rol</label>
                            <select
                                name="rol"
                                value={rol}
                                onChange={handleChange}
                                required
                                className='form-control'
                            >
                                <option value="admin">Administrador</option>
                                <option value="almacen">Almacén</option>
                            </select>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div>
                            <button type="submit" className="btn btn-primary my-2">Guardar Usuario</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};

export default Usuario;
