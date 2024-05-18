import React, { useEffect, useState } from 'react'
import Layout from '../../components/plantilla/Layout'
import Modal from '../../components/plantilla/Modal';
import Swal from 'sweetalert2'

export const Articulos = () => {

    // Definicion de hooks
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalOpenCategoria, setModalOpenCategoria] = useState(false);

    const [proveedores, setProveedores] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [articulos, setArticulos] = useState([]);
    const url_base = 'http://localhost:4000/v1/soft-inventarios/';

    const [method, setMethod] = useState('')
    const [tituloModal, setTituloModal] = useState('')
    const [urlEnviar, setUrlEnviar] = useState('');

    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [existencias, setExistencias] = useState('');
    const [existenciasMinima, setExistenciasMinima] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [unidadMedida, setUnidadMedida] = useState('');

    const [nombreCategoria, setNombreCategoria] = useState('')
    const [descripcionCategoria, setDescripcionCategoria] = useState('')

    const [proveedorId, setProveedorId] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [proveedorNombre, setProveedorNombre] = useState('');
    const [categoriaNombre, setCategoriaNombre] = useState('');


    //funciones
    const toggleModal = () => { setModalOpen(!isModalOpen); };
    const toggleModalCategoria = () => { setModalOpenCategoria(!isModalOpenCategoria); };

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'codigo':
                setCodigo(value);
                break;
            case 'descripcion':
                setDescripcion(value);
                break;
            case 'existencias':
                setExistencias(value);
                break;
            case 'existencias_minima':
                setExistenciasMinima(value);
                break;
            case 'precio_compra':
                setPrecioCompra(value);
                break;
            case 'precio_venta':
                setPrecioVenta(value);
                break;
            case 'unidad_medida':
                setUnidadMedida(value);
                break;
            case 'categoria':
                setCategoria(value);
                break;
            case 'proveedor':
                setProveedor(value);
                break;
            default:
                break;
        }
    };

    const agregarArticulo = () => {
        setTituloModal("Agregar Nuevo Artículo");
        setMethod('POST')
        setUrlEnviar(`${url_base}articulos/guardar`)
        toggleModal()
    }

    const actualizarArticulo = async (articulo) => {

        setCodigo(articulo.codigo)
        setDescripcion(articulo.descripcion)
        setExistencias(articulo.existencias)
        setExistenciasMinima(articulo.existencias_minima)
        setPrecioCompra(articulo.precio_compra)
        setPrecioVenta(articulo.precio_venta)
        setUnidadMedida(articulo.unidad_medida)


        setProveedorId(articulo.proveedor._id);
        setProveedorNombre(articulo.proveedor.nombre);

        setCategoriaId(articulo.categoria._id);
        setCategoriaNombre(articulo.categoria.nombre);

        setUrlEnviar(`${url_base}articulos/actualizar/${articulo._id}`)
        setTituloModal('Actualizar Articulo')
        setMethod('PUT')
        toggleModal();
    }

    const seleccionarProveedor = (e) => {
        const nombre = e.target.value;
        const proveedor = proveedores.find(p => p.nombre === nombre);
        if (proveedor) {
            setProveedorId(proveedor._id);
            setProveedorNombre(proveedor.nombre);
        } else {
            setProveedorId('');
            setProveedorNombre(nombre);
        }
    }

    const seleccionarCategoria = (e) => {
        const nombre = e.target.value;
        const categoria = categorias.find(c => c.nombre === nombre);
        if (categoria) {
            setCategoriaId(categoria._id);
            setCategoriaNombre(categoria.nombre);
        } else {
            setCategoriaId('');
            setCategoriaNombre(nombre);
        }
    }

    // Cargar articulos
    const cargarArticulos = async () => {
        let data = await fetch(`${url_base}articulos`)
            .then(data => data.json())
            .then(res => res)
        setArticulos(data);
    }
    // Cargar proveedores
    const cargarProveedores = async () => {
        let data = await fetch(`${url_base}proveedores`)
            .then(data => data.json())
            .then(res => res)
        setProveedores(data);
    }

    //Cargar categorias
    const cargarCategorias = async () => {
        let data = await fetch(`${url_base}categorias`)
            .then(data => data.json())
            .then(res => res)
        setCategorias(data);
    }

    const guardarInformacion = async (e) => {
        e.preventDefault();

        let datos = {
            codigo: codigo,
            descripcion: descripcion,
            // existencias: existencias,
            existencias_minima: existenciasMinima,
            precio_compra: precioCompra,
            precio_venta: precioVenta,
            unidad_medida: unidadMedida,
            proveedor_id: proveedorId,
            categoria_id: categoriaId
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
            cargarArticulos();
            toggleModal()
        });
    }

    const limpiarCampos = () => { 
        setCodigo('')
        setDescripcion('')
        setExistencias('')
        setExistenciasMinima('')
        setPrecioCompra('')
        setPrecioVenta('')
        setUnidadMedida('')

        //categoria
        setNombreCategoria('')
        setDescripcionCategoria('')

        setUrlEnviar('')
        setTituloModal('')
        setMethod('')
    }


    //Categorias 
    const agregarCategoria = () => { 
        toggleModalCategoria()
    }

    const guardarInformacionCategoria = async (e) => {
        e.preventDefault();

        let datos = {
            nombre: nombreCategoria,
            descripcion: descripcionCategoria
        }

     
        fetch(`${url_base}categorias/guardar`, {
            'method': 'POST', 
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
            cargarCategorias();
            toggleModalCategoria()
        });
    }

    useEffect(() => {
        cargarArticulos();
        cargarProveedores();
        cargarCategorias();
    }, [])

    return (

        <Layout menu_active="articulos">
            <div className="rows col-md-12 col-xl-12">
                <div className="box box-danger">
                    <div className="box-content">

                        <div className='row mb-5'>
                            <div className="col-md-3">
                                <button onClick={agregarArticulo} className='btn btn-primary'>
                                    <i className="zmdi zmdi-collection-plus mr-2"></i>
                                    Agregar Articulo
                                </button>
                            </div>
                            <div className="col">
                                <button onClick={agregarCategoria} className='btn btn-primary'>
                                    <i className="zmdi zmdi-collection-plus mr-3"></i>
                                    Agregar Categoria
                                </button>
                            </div>
                        </div>


                        <table className="" width="100%">
                            <thead>
                                <tr>
                                    <th className='text-center'>Codigo</th>
                                    <th className='text-center'>Descripcion</th>
                                    <th className='text-center'>Existencias</th>
                                    <th className='text-center'>Existencias Minimas</th>
                                    <th className='text-center'>P. Compra</th>
                                    <th className='text-center'>P. Venta</th>
                                    <th className='text-center'>Proveedor</th>
                                    <th className='text-center'>Categoria</th>
                                    <th className='text-center'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {articulos.map((articulo, i) =>
                                    <tr key={i}>
                                        <td>{articulo.codigo}</td>
                                        <td>{articulo.descripcion}</td>
                                        <td>{articulo.existencias}</td>
                                        <td>{articulo.existencias_minima}</td>
                                        <td>{articulo.precio_compra}</td>
                                        <td>{articulo.precio_venta}</td>
                                        <td>{articulo.categoria.nombre}</td>
                                        <td>{articulo.proveedor.nombre}</td>
                                        <td className="text-center">
                                            <div className="btn-group">
                                                <button
                                                    type='button'
                                                    className='btn btn-info pt-0 pb-0 px-1 text-white'
                                                    onClick={() => actualizarArticulo(articulo)}
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
                    <div className="row my-1">
                        <div className='col-md-12'>
                            <label className='form-label'>Código</label>
                            <input
                                type="text"
                                name="codigo"
                                value={codigo}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className="">
                            <label>Descripción</label>
                            <textarea
                                type="text"
                                name="descripcion"
                                value={descripcion}
                                onChange={handleChange}
                                className='form-control'

                            >
                            </textarea>
                        </div>
                    </div>

                    <div className="row my-1">
                        {/* <div className="col-md-6">
                            <label>Existencias</label>
                            <input
                                type="number"
                                name="existencias"
                                value={existencias}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </div> */}

                        <div className="col-md-12">
                            <label>Existencias Mínimas</label>
                            <input
                                type="number"
                                name="existencias_minima"
                                value={existenciasMinima}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className="col-md-6">
                            <label>Precio de Compra</label>
                            <input
                                type="number"
                                name="precio_compra"
                                value={precioCompra}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </div>

                        <div className="col-md-6">
                            <label>Precio de Venta</label>
                            <input
                                type="number"
                                name="precio_venta"
                                value={precioVenta}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className="">
                            <label>Unidad de Medida</label>
                            <input
                                type="text"
                                name="unidad_medida"
                                value={unidadMedida}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className="col-md-12">
                            <label>Proveedor</label>
                            <input
                                type="text"
                                name="proveedor"
                                className='form-control'
                                list="proveedores_list"
                                value={proveedorNombre}
                                onChange={seleccionarProveedor}
                                required
                            />
                            <datalist id="proveedores_list">
                                {proveedores.map((proveedor) => (
                                    <option key={proveedor._id} value={proveedor.nombre} />
                                ))}
                            </datalist>
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className="col-md-12">
                            <label>Categoría</label>
                            <input
                                type="text"
                                name="categoria"
                                className='form-control'
                                list="categorias_list"
                                value={categoriaNombre}
                                onChange={seleccionarCategoria}
                                required
                            />
                            <datalist id="categorias_list">
                                {categorias.map((cat) => (
                                    <option key={cat._id} value={cat.nombre}>{cat.nombre}</option>
                                ))}
                            </datalist>
                        </div>
                    </div>


                    <div className="row justify-content-center">
                        <div>
                            <button type="submit" className="btn btn-primary my-2">Guardar Artículo</button>
                        </div>
                    </div>
                </form>

            </Modal>

            <Modal isOpen={isModalOpenCategoria} onClose={toggleModalCategoria} title="Agregar categorria">
                <form onSubmit={guardarInformacionCategoria} className="form">
                    <div className="row my-1">
                        <div className='col-md-12'>
                            <label className='form-label'>Código</label>
                            <input
                                type="text"
                                name="nombreCategoria"
                                value={nombreCategoria}
                                onChange={(e) => setNombreCategoria(e.target.value)}
                                required
                                className='form-control'
                            />
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className="">
                            <label>Descripción</label>
                            <textarea
                                type="text"
                                name="descripcionCategoria"
                                value={descripcionCategoria}
                                onChange={(e) => setDescripcionCategoria(e.target.value)}
                                className='form-control'
                            >
                            </textarea>
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
