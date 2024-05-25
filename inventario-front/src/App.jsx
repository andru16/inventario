import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Categorias from './pages/gestion-inventario/Categorias';
import { Articulos } from './pages/gestion-inventario/Articulos';
import NoFound from './pages/NoFound';
import Login from './pages/Login';
import Layout from './components/plantilla/Layout';
import DashBoard from './pages/Dashboard';
// import { Proveedores } from './pages/gestion-inventario/Proveedores';
import Inventario from './pages/gestion-inventario/Inventario';
import Usuario from './pages/gestion-inventario/Usuarios';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />

        <Route path="/dashboard" element={<DashBoard />} />

        {/* <Route path="administrador" element={<AdminPage />} /> */}
        {/* <Route path="usuarios" element={<Usuarios />} /> */}
        {/* <Route path="roles" element={<Roles />} /> */}
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/articulos" element={<Articulos />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/usuarios" element={<Usuario />} />

        <Route path="*" element={<NoFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
