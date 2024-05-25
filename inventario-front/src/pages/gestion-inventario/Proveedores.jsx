import React, { useEffect, useState } from "react";
import Layout from "../../components/plantilla/Layout";
import Modal from "../../components/plantilla/Modal";
import Swal from "sweetalert2";

const Proveedores = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [proveedores, setProveedores] = useState([]);
  const url_base = "http://localhost:4000/v1/soft-inventarios/";

  const [nit, setNit] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");

  const [tituloModal, setTituloModal] = useState("");
  const [urlEnviar, setUrlEnviar] = useState("");
  const [method, setMethod] = useState("");

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const cargarProveedores = async () => {
    let data = await fetch(`${url_base}proveedor`)
      .then((data) => data.json())
      .then((res) => res);
    setProveedores(data);
  };

  const crearProveedor = () => {
    setTituloModal("Agregar Nuevo Proveedor");
    setMethod("POST");
    setUrlEnviar(`${url_base}proveedor/crear`);
    toggleModal();
  };

  const actualizarProveedor = async (proveedor) => {
    setNit(proveedor.nit);
    setRazonSocial(proveedor.razon_social);
    setCorreoElectronico(proveedor.correo_electronico);
    setTelefono(proveedor.telefono);
    setDireccion(proveedor.direccion);
    setCiudad(proveedor.ciudad);

    setUrlEnviar(`${url_base}proveedor/actualizar/${proveedor._id}`);
    setTituloModal("Actualizar proveedor");
    setMethod("PUT");
    toggleModal();
  };

  const guardarInformacion = async (e) => {
    e.preventDefault();

    let datos = {
      nit: nit,
      razon_social: razonSocial,
      correo_electronico: correoElectronico,
      telefono: telefono,
      direccion: direccion,
      ciudad: ciudad,
    };

    console.log(datos)
    console.log(urlEnviar)
    console.log(method)

    fetch(`${urlEnviar}`, {
      method: method,
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        Swal.fire({
          title: "",
          text: `ha ocurrrido un error ${error}`,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      })
      .then((response) => {
        Swal.fire({
          title: "",
          text: `${response.mensaje}`,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        limpiarCampos();
        cargarProveedores();
        toggleModal();
      });
  };

  const limpiarCampos = () => {
    setNit("");
    setRazonSocial("");
    setCorreoElectronico("");
    setTelefono("");
    setDireccion("");
    setCiudad("");

    setUrlEnviar("");
    setTituloModal("");
    setMethod("");
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  return (
    <Layout menu_active="proveedor">
      <div className="rows col-md-12 col-xl-12">
        <div className="box box-danger">
          <div className="box-content">
            <div className="row mb-5">
              <div className="col-md-3">
                <button onClick={crearProveedor} className="btn btn-primary">
                  <i className="zmdi zmdi-collection-plus mr-2"></i>
                  Crear Proveedor
                </button>
              </div>
            </div>

            <table className="" width="100%">
              <thead>
                <tr>
                  <th className="text-center">Nit</th>
                  <th className="text-center">Razon Social</th>
                  <th className="text-center">Correo electronico</th>
                  <th className="text-center">Telefono</th>
                  <th className="text-center">Direccion</th>
                  <th className="text-center">Ciudad</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.map((proveedor, index) => (
                  <tr key={index}>
                    <td className="text-center">{proveedor.nit}</td>
                    <td className="text-center">{proveedor.razon_social}</td>
                    <td className="text-center">{proveedor.correo_electronico}</td>
                    <td className="text-center">{proveedor.telefono}</td>
                    <td className="text-center">{proveedor.direccion}</td>
                    <td className="text-center">{proveedor.ciudad}</td>
                    <td className="text-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-info pt-0 pb-0 px-1 text-white"
                          onClick={() => actualizarProveedor(proveedor)}
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modales */}
      <Modal isOpen={isModalOpen} onClose={toggleModal} title={tituloModal}>
        <form onSubmit={guardarInformacion} className="form">
          <div className="row my-1">
            <div className="col-md-12">
              <label className="form-label">nit</label>
              <input
                type="text"
                name="nit"
                value={nit}
                onChange={(e) => setNit(e.target.value)}
                required
                className="form-control"
              />
            </div>
          </div>
          <div className="row my-1">
            <div className="col-md-12">
              <label className="form-label">razon social</label>
              <input
                type="text"
                name="razon_social"
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                required
                className="form-control"
              />
            </div>
          </div>
          <div className="row my-1">
            <div className="col-md-12">
              <label className="form-label">correo electronico</label>
              <input
                type="text"
                name="correo electronico"
                value={correoElectronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
                required
                className="form-control"
              />
            </div>
          </div>

          <div className="row my-1">
            <div className="col-md-12">
              <label className="form-label">telefono</label>
              <input
                type="text"
                name="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
                className="form-control"
              />
            </div>
          </div>

          <div className="row my-1">
            <div className="col-md-12">
              <label className="form-label">direccion</label>
              <input
                type="text"
                name="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
                className="form-control"
              />
            </div>
          </div>

          <div className="row my-1">
            <div className="col-md-12">
              <label className="form-label">ciudad</label>
              <input
                type="text"
                name="ciudad"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                required
                className="form-control"
              />
            </div>
          </div>
          
          <div className="row justify-content-center">
                        <div>
                            <button type="submit" className="btn btn-primary my-2">Crear Proveedor</button>
                        </div>
                    </div>
        </form>
      </Modal>
    </Layout>
  );
};


export default Proveedores;