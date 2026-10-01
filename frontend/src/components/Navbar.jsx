import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container inner">
        <NavLink to="/" className="brand">
          Dev<span>Portfolio</span>
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/proyectos" className={({ isActive }) => isActive ? 'active' : ''}>
            Proyectos
          </NavLink>
          <NavLink to="/clientes-tecnologias" className={({ isActive }) => isActive ? 'active' : ''}>
            Clientes y Tecnologías
          </NavLink>
          <NavLink to="/contacto" className={({ isActive }) => isActive ? 'active' : ''}>
            Contacto
          </NavLink>
          <NavLink to="/cotizacion" className="btn-cta">
            Solicitar cotización
          </NavLink>
        </nav>
      </div>
    </header>
  )
}