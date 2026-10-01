import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProyectosPage from './pages/ProyectosPage'
import ProyectoDetalle from './pages/ProyectoDetalle'
import ClientesTecnologiasPage from './pages/ClientesTecnologiasPage'
import ContactoPage from './pages/ContactoPage'
import CotizacionPage from './pages/CotizacionPage'

function Inicio() {
  return (
    <>
      <Hero />
      <ProyectosPage />
    </>
  )
}

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/proyectos" element={<ProyectosPage />} />
          <Route path="/proyectos/:slug" element={<ProyectoDetalle />} />
          <Route path="/clientes-tecnologias" element={<ClientesTecnologiasPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/cotizacion" element={<CotizacionPage />} />
          <Route path="*" element={<Inicio />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} DevPortfolio · Desarrollo de sitios web con Laravel y React
        </div>
      </footer>
    </div>
  )
}