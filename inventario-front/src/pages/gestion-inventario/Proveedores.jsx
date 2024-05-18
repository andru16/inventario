import React, { useEffect, useState } from 'react'
import Layout from '../../components/plantilla/Layout'
import Modal from '../../components/plantilla/Modal';
import Swal from 'sweetalert2'

export const Proveedores = () => {

    // Definicion de hooks
    const [isModalOpen, setModalOpen] = useState(false);
    const [proveedores, setProveedores] = useState([]);
    const url_base = 'http://localhost:4000/v1/soft-inventarios/';

    const [method, setMethod] = useState('')
    const [tituloModal, setTituloModal] = useState('')
    const [urlEnviar, setUrlEnviar] = useState('');
    const [nombre, setNombre] = useState('');
    const [nit, setNit] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    


    //funciones
    const toggleModal = () => { setModalOpen(!isModalOpen); };

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'nombre':
                setNombre(value);
                break;
            case 'nit':
                setNit(value);
                break;
            case 'direccion':
                setDireccion(value);
                break;
            case 'telefono':
                setTelefono(value);
                break;
            case 'email':
                setEmail(value);
                break;
            default:
                break;
        }
    };

    // Cargar proveedores
    const cargarProveedores = async () => {
        let data = await fetch(`${url_base}proveedores`)
            .then(data => data.json())
            .then(res => res)
        setProveedores(data);
    }

    //guardar informacion
    const agregarProveedor = ()=> {
        setUrlEnviar(`${url_base}proveedores/guardar`)
        setTituloModal('Agregar Nuevo Proveedor')
        setMethod('POST')
        toggleModal();
    }



    const guardarInformacion = async (e) => {
        e.preventDefault();

        let datos = {
            nombre : nombre,
            nit : nit,
            direccion : direccion,
            telefono : telefono,
            email : email
        }

        fetch(urlEnviar, {
            'method': method, 
            'body': JSON.stringify(datos),
            'headers': {
            'Content-Type': 'application/json'
        }})
        .then((res) => res.json())
        .catch((error) => {
            Swal.fire({
                title: '',
                text: `ha ocurrrido un error ${error}`,
                icon: 'error',
                confirmButtonText: 'Cerrar'
            })
        })
        .then((response) => {
            Swal.fire({
                title: '',
                text: `${response.mensaje}`,
                icon: 'success',
                confirmButtonText: 'Cerrar'
            })
            limpiarCampos();
            cargarProveedores();
            toggleModal()
        });

    }


    const actualizarProveedor = async (proveedor) => {
       
        
        setNombre(proveedor.nombre);
        setNit(proveedor.nit);
        setDireccion(proveedor.direccion);
        setTelefono(proveedor.telefono);
        setEmail(proveedor.email);
        
        setUrlEnviar(`${url_base}proveedores/actualizar/${proveedor._id}`)
        setTituloModal('Actualizar Proveedor')
        setMethod('PUT')
        toggleModal();
    }

    const limpiarCampos = () => {
        setNombre('');
        setNit('');
        setDireccion('');
        setTelefono('');
        setEmail('');
    }

    useEffect(() => {
        cargarProveedores();
    }, [])

    return (
        <Layout menu_active="proveedores">
            <div className="rows col-12">
                <div className="box box-danger">
                    <div className="box-content">

                        <div className='row mb-5'>
                            <div className="col-md-12">
                                <button onClick={agregarProveedor} className='btn btn-primary'>
                                    <i className="zmdi zmdi-collection-plus mr-2"></i>
                                    Agregar Proveedor
                                </button>
                            </div>
                        </div>


                        <table className="" width="100%">
                            <thead>
                                <tr>
                                    <th>Razón social</th>
                                    <th>Nit</th>
                                    <th>Direcciónn</th>
                                    <th>Telefono</th>
                                    <th>Correo electronico</th>
                                    <th className='text-center'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proveedores.map((proveedor,i) =>
                                    <tr key={i} className="developing">
                                        <td>{proveedor.nombre} </td>
                                        <td>{proveedor.nit} </td>
                                        <td>{proveedor.direccion} </td>
                                        <td>{proveedor.telefono} </td>
                                        <td>{proveedor.email} </td>
                                        <td className="text-center">
                                            <div className="btn-group">
                                                <button 
                                                    type='button' 
                                                    className='btn btn-info pt-0 pb-0 px-1 text-white'
                                                    onClick={() =>actualizarProveedor(proveedor)}
                                                >
                                                    <i class="fa-regular fa-pen-to-square"></i>
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
            <Modal isOpen={isModalOpen} onClose={toggleModal} size="md" title={tituloModal}>
                <form onSubmit={guardarInformacion} className="form">

                    <div className="row my-1">
                        <div className="">
                            <label>Razón social</label>
                            <input
                                type="text"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className='col-md-12'>
                            <label className='form-label'>Nit</label>
                            <input
                                type="text"
                                name="nit"
                                value={nit}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className="col-md-12">
                            <label>Direccion</label>
                            <input
                                type="text"
                                name="direccion"
                                value={direccion}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </div>
                    </div>
                    <div className="row my-1">
                        <div className="col-md-12">
                            <label>Telefono</label>
                            <input
                                type="number"
                                name="telefono"
                                value={telefono}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className="col-md-12">
                            <label>Correo electronico</label>
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div>
                            <button type="submit" className="btn btn-primary my-2">Guardar</button>
                        </div>
                    </div>
                </form>

            </Modal>
        </Layout>

    )
}
