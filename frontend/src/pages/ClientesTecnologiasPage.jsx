import { useEffect, useState } from 'react'
import { fetchClientes, fetchTecnologias } from '../api/portafolio'

export default function ClientesTecnologiasPage() {
  const [tab, setTab] = useState('clientes')
  const [clientes, setClientes] = useState([])
  const [tecnologias, setTecnologias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    Promise.all([fetchClientes(), fetchTecnologias()])
      .then(([{ data: c }, { data: t }]) => {
        setClientes(Array.isArray(c) ? c : c.data)
        setTecnologias(Array.isArray(t) ? t : t.data)
      })
      .catch(() => setError('No se pudo cargar la información.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Clientes y Tecnologías</h2>
        <p className="section-subtitle">
          Empresas que han confiado en mi trabajo y las herramientas que utilizo
          para construir sitios web modernos.
        </p>

        <div className="tabs">
          <button className={tab === 'clientes' ? 'active' : ''} onClick={() => setTab('clientes')}>
            Clientes
          </button>
          <button className={tab === 'tecnologias' ? 'active' : ''} onClick={() => setTab('tecnologias')}>
            Tecnologías
          </button>
        </div>

        {loading && <p className="muted">Cargando…</p>}
        {error && <p className="error">{error}</p>}

        {tab === 'clientes' && !loading && (
          <div className="grid grid-3">
            {clientes.map((c) => (
              <article key={c.id} className="card">
                <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center', marginBottom: '.75rem' }}>
                  <div className="client-logo">{c.nombre.charAt(0)}</div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem' }}>{c.nombre}</h3>
                    {c.sector && <span className="muted" style={{ fontSize: '.85rem' }}>{c.sector}</span>}
                  </div>
                </div>
                {c.testimonio && (
                  <blockquote style={{ fontStyle: 'italic', color: 'var(--text-muted)', borderLeft: '3px solid var(--primary)', paddingLeft: '.75rem', margin: '.75rem 0' }}>
                    "{c.testimonio}"
                  </blockquote>
                )}
                {c.sitio_web && (
                  <a href={c.sitio_web} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', fontSize: '.9rem' }}>
                    {c.sitio_web} ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        )}

        {tab === 'tecnologias' && !loading && (
          <>
            {['Frontend', 'Backend', 'Base de datos', 'DevOps', 'Lenguaje'].map((cat) => {
              const items = tecnologias.filter((t) => t.categoria === cat)
              if (items.length === 0) return null
              return (
                <div key={cat} style={{ marginBottom: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>{cat}</h3>
                  <div className="grid grid-4">
                    {items.map((t) => (
                      <div key={t.id} className="card" style={{ textAlign: 'center' }}>
                        <div
                          className="tech-dot"
                          style={{ width: 24, height: 24, margin: '0 auto .75rem', background: t.color ?? '#6366f1' }}
                        />
                        <div style={{ fontWeight: 600 }}>{t.nombre}</div>
                        {t.descripcion && (
                          <p className="muted" style={{ fontSize: '.8rem', marginTop: '.35rem' }}>{t.descripcion}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    </section>
  )
}