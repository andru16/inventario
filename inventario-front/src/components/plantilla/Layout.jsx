import React, { useEffect } from 'react';
import '../../../public/recursos-plantilla/stylesheets/bootstrap4-alpha3.min.css';
import '../../../public/recursos-plantilla/stylesheets/style.css';
import '../../../public/recursos-plantilla/stylesheets/fullcalendar.min.css';
import '../../../public/recursos-plantilla/stylesheets/fullcalendar.print.min.css';
import '../../../public/recursos-plantilla/stylesheets/responsive.css';

const Layout = () => {

    useEffect(() => {
        const loadScript = (src) => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.body.appendChild(script);
          });
        };
    
        const scripts = [
          '../../../public/recursos-plantilla/javascript/jquery.min.js',
          '../../../public/recursos-plantilla/javascript/tether.min.js',
          '../../../public/recursos-plantilla/javascript/bootstrap4-alpha3.min.js',
          '../../../public/recursos-plantilla/javascript/ammap.js',
          '../../../public/recursos-plantilla/javascript/worldLow.js',
          '../../../public/recursos-plantilla/javascript/raphael.min.js',
          '../../../public/recursos-plantilla/javascript/morris.min.js',
          '../../../public/recursos-plantilla/javascript/Chart.min.js',
          '../../../public/recursos-plantilla/javascript/moment.min.js',
          '../../../public/recursos-plantilla/javascript/jquery-ui.js',
          '../../../public/recursos-plantilla/javascript/fullcalendar.min.js',
          '../../../public/recursos-plantilla/javascript/jquery.mCustomScrollbar.js',
          '../../../public/recursos-plantilla/javascript/smoothscroll.js',
          '../../../public/recursos-plantilla/javascript/waypoints.min.js',
          '../../../public/recursos-plantilla/javascript/jquery-countTo.js',
          '../../../public/recursos-plantilla/javascript/waves.min.js',
          '../../../public/recursos-plantilla/javascript/canvasjs.min.js',
          '../../../public/recursos-plantilla/javascript/main.js'
        ];
    
        scripts.forEach(src => loadScript(src));
      }, []);

  return (
    <div>
      {/* Loader */}
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>

      {/* Header */}
      <header id="header" className="header fixed">
        <div className="navbar-top">
          <div className="curren-menu info-left">
            <div className="logo">
              <a href="index.html" title="">
                <img src="images/logo.png" alt="One Admin" />
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
                <p className="name">STUARD ALEX</p>
                <p className="address">San Francisco, CA</p>
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
              <div className="status-color blue heartbit style1"></div>
            </a>
          </div>
          <ul className="user-options">
            <li className="name"><a href="#" title="">STUARD ALEX</a></li>
            <li className="options">ADMINISTRATOR</li>
          </ul>
        </div>
        <ul className="sidebar-nav">
          <li className="dashboard waves-effect waves-teal active">
            <div className="img-nav">
              <img src="images/icon/monitor.png" alt="" />
            </div>
            <span>DASHBOARD</span>
          </li>
          <li className="message waves-effect waves-teal">
            <div className="img-nav">
              <img src="images/icon/message.png" alt="" />
              <span>3</span>
            </div>
            <span>INVENTARIO</span>
          </li>
        </ul>
      </section>

      {/* Main */}
      <main>
        <div className="d-flex div"></div>
      </main>
    </div>
  );
};

export default Layout;