import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProyectos } from '../api/portafolio'

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [soloDestacados, setSoloDestacados] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchProyectos({ destacados: soloDestacados ? 1 : 0 })
      .then(({ data }) => setProyectos(data.data ?? data))
      .catch(() => setError('No se pudieron cargar los proyectos.'))
      .finally(() => setLoading(false))
  }, [soloDestacados])

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Proyectos</h2>
        <p className="section-subtitle">
          Una selección de sitios web y aplicaciones desarrollados para clientes reales.
        </p>

        <label className="checkbox-group" style={{ marginBottom: '1.5rem' }}>
          <label>
            <input
              type="checkbox"
              checked={soloDestacados}
              onChange={(e) => setSoloDestacados(e.target.checked)}
            />
            Mostrar solo destacados
          </label>
        </label>

        {loading && <p className="muted">Cargando proyectos…</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && proyectos.length === 0 && (
          <p className="empty">No hay proyectos para mostrar.</p>
        )}

        <div className="grid grid-3">
          {proyectos.map((p) => (
            <article key={p.id} className="card">
              <div className="project-img" />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem' }}>
                <span className="badge">{p.categoria ?? 'Sitio Web'}</span>
                <span className="muted">{p.fecha ? new Date(p.fecha).getFullYear() : ''}</span>
              </div>
              <h3 style={{ marginBottom: '.4rem' }}>{p.titulo}</h3>
              <p className="muted" style={{ marginBottom: '.75rem', fontSize: '.9rem' }}>
                {p.descripcion_corta}
              </p>
              <div style={{ marginBottom: '.75rem' }}>
                {p.tecnologias?.map((t) => (
                  <span key={t.id} className="tag">{t.nombre}</span>
                ))}
              </div>
              <Link to={`/proyectos/${p.slug}`} className="btn btn-ghost" style={{ padding: '.4rem .8rem' }}>
                Ver detalle
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}