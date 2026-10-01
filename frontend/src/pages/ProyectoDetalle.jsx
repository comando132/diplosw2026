import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProyecto } from '../api/portafolio'

export default function ProyectoDetalle() {
  const { slug } = useParams()
  const [proyecto, setProyecto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    fetchProyecto(slug)
      .then(({ data }) => setProyecto(data))
      .catch(() => setError('Proyecto no encontrado.'))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <p className="muted container section">Cargando…</p>
  if (error) return (
    <div className="container section">
      <p className="error">{error}</p>
      <Link to="/proyectos" className="btn btn-ghost" style={{ marginTop: '1rem' }}>← Volver a proyectos</Link>
    </div>
  )

  return (
    <section className="section">
      <div className="container">
        <Link to="/proyectos" className="btn btn-ghost" style={{ marginBottom: '1.5rem' }}>← Volver</Link>
        <div className="project-img" style={{ height: 320, marginBottom: '2rem' }} />
        <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1rem' }}>
          <span className="badge">{proyecto.categoria ?? 'Sitio Web'}</span>
          <span className="badge">{proyecto.fecha ? new Date(proyecto.fecha).getFullYear() : ''}</span>
          {proyecto.cliente && <span className="badge">Cliente: {proyecto.cliente.nombre}</span>}
        </div>
        <h2 className="section-title">{proyecto.titulo}</h2>
        {proyecto.url && (
          <p style={{ marginBottom: '1rem' }}>
            <a href={proyecto.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
              {proyecto.url} ↗
            </a>
          </p>
        )}
        <p className="muted" style={{ marginBottom: '1.5rem' }}>{proyecto.descripcion_corta}</p>
        {proyecto.descripcion && (
          <div style={{ maxWidth: '70ch', marginBottom: '1.5rem' }}>
            {proyecto.descripcion.split('\n').map((line, i) => <p key={i} style={{ marginBottom: '.75rem' }}>{line}</p>)}
          </div>
        )}
        <h3 style={{ marginBottom: '.75rem' }}>Tecnologías utilizadas</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
          {proyecto.tecnologias?.map((t) => (
            <span key={t.id} className="tech-chip">
              <span className="tech-dot" style={{ background: t.color ?? '#6366f1' }} />
              {t.nombre}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}