import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../providers/AuthContext';

const Layout = ({ children, menu_active }) => {
  const [loading, setLoading] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const { userAuth, logout } = useAuth();

  const url_base = 'http://localhost:4000/v1/soft-inventarios/';

  const location = useLocation();

  // Cargar proveedores
  const cargarProveedores = async () => {
    let data = await fetch(`${url_base}proveedor`)
      .then(data => data.json())
      .then(res => res)
    setProveedores(data);
  }

  // Cargar articulos
  const cargarArticulos = async () => {
    let data = await fetch(`${url_base}articulos`)
      .then(data => data.json())
      .then(res => res)
    setArticulos(data);
  }
  // Cargar categorias
  const cargarCategorias = async () => {
    let data = await fetch(`${url_base}categorias`)
      .then(data => data.json())
      .then(res => res)
    setCategorias(data);
  }



  useEffect(() => {

    cargarProveedores();
    cargarArticulos();
    cargarCategorias();

    console.log('----------------');
    console.log('----------------');

    // Activar el loader al cambiar de ruta
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // ajusta este tiempo según la necesidad

    return () => clearTimeout(timer); // Limpieza del timer
  }, [location.pathname]); // Depende del cambio de ruta

  return (
    <div>
      {/* Loader */}
      {loading && (
        <div className="loader">
          <div className="inner one"></div>
          <div className="inner two"></div>
          <div className="inner three"></div>
        </div>
      )}

      {/* Header */}
      <header id="header" className="header fixed">
        <div className="navbar-top">
          <div className="curren-menu info-left">
            <div className="logo">
              <a href="index.html" title="">
                {/* <img src="images/logo.png" alt="One Admin" /> */}
              </a>
            </div>
            <div className="top-button">
              <span></span>
            </div>
          </div>
          <ul className="info-right">
            <li className="user">
              <div className="avatar">
                <img src="images/avatar/01.png" alt="" />
              </div>
              <div className="info">
                {/* <p className="name">{userAuth.nombres} {userAuth.apellidos}</p>
                <p className="address">{userAuth.correo_electronico}</p> */}
              </div>
              <div className="arrow-down">
                <i className="fa fa-angle-down" aria-hidden="true"></i>
                <i className="fa fa-angle-up" aria-hidden="true"></i>
              </div>
              <div className="clearfix"></div>
            </li>
          </ul>
          <div className="clearfix"></div>
        </div>
      </header>

      {/* Vertical Navigation */}
      <section className="vertical-navigation left">
        <div className="user-profile">
          <div className="user-img">
            <a href="#" title="">
              <div className="img">
                <img src="images/avatar/avatar-dashboard.png" alt="" />
              </div>
              {/* <div className="status-color blue heartbit style1"></div> */}
            </a>
          </div>
          <ul className="user-options">
            {/* <li className="name"><a href="#" title="">{userAuth.nombres.toUpperCase()} {userAuth.apellidos.toUpperCase()}</a></li>
            <li className="options">{userAuth.rol.nombre}</li> */}
          </ul>
        </div>
        <ul className="sidebar-nav">
          <li className={`dashboard waves-effect waves-teal ${menu_active == 'inicio' ? 'active' : ''}`}>
            <div className="img-nav">
              <img src="images/icon/monitor.png" alt="" />
            </div>
            <Link to="/dashboard">
              <span>DASHBOARD</span>
            </Link>
          </li>

          <li className={`dashboard waves-effect waves-teal ${menu_active == 'inventario' ? 'active' : ''}`}>
            <div className="img-nav">
              <img src="images/icon/message.png" alt="" />
              {/* <span></span> */}
            </div>
            <Link to="/inventario">
              <span>INVENTARIO</span>
            </Link>
          </li>
          <li className={`dashboard waves-effect waves-teal ${menu_active == 'articulos' ? 'active' : ''}`}>
            <div className="img-nav">
              <img src="images/icon/message.png" alt="" />
              <span>{articulos.length}</span>
            </div>
            <Link to="/articulos">
              <span>  ARTICULOS  </span>
            </Link>
          </li>
          {/* <li className={`dashboard waves-effect waves-teal ${menu_active == 'categorias' ? 'active' : ''}`}>
            <div className="img-nav">
              <img src="images/icon/message.png" alt="" />
              <span>{categorias.length}</span>
            </div>
            <Link to="/categorias">
              <span>  CATEGORIAS  </span>
            </Link>

          </li> */}
    
          <li className={`dashboard waves-effect waves-teal ${menu_active == 'proveedor' ? 'active' : ''}`}>
            <div className="img-nav">
              <img src="images/icon/message.png" alt="" />
              <span>{proveedores.length}</span>
            </div>
            <Link to="/proveedores">
              <span>  PROVEEDORES  </span>
            </Link>
          </li>
          <li className={`dashboard waves-effect waves-teal ${menu_active == 'usuarios' ? 'active' : ''}`}>
            <div className="img-nav">
              <img src="images/icon/message.png" alt="" />
              <span>{proveedores.length}</span>
            </div>
            <Link to="/usuarios">
              <span>  USUARIOS  </span>
            </Link>
          </li>
        </ul>
      </section>

      {/* Main */}
      <main className='open'>
        <div className="d-flex div">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;