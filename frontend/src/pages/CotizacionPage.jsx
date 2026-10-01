import { useState } from 'react'
import { enviarCotizacion } from '../api/portafolio'

const TIPOS_SITIO = ['Sitio informativo', 'Landing page', 'E-commerce', 'Web app', 'Blog', 'Otro']
const PRESUPUESTOS = ['Menos de 1.000', '1.000 - 3.000', '3.000 - 5.000', '5.000 - 10.000', 'Más de 10.000']
const FUNCIONALIDADES = ['Diseño responsive', 'Catálogo de productos', 'Pasarela de pago', 'Blog', 'Formularios', 'Panel de administración', 'Multiidioma', 'SEO', 'Integración con CRM', 'Reservas/Citas']

export default function CotizacionPage() {
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '', empresa: '',
    tipo_sitio: 'Sitio informativo', presupuesto: '', plazo: '',
    funcionalidades: [], mensaje: '',
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const toggleFunc = (f) => {
    setForm((prev) => ({
      ...prev,
      funcionalidades: prev.funcionalidades.includes(f)
        ? prev.funcionalidades.filter((x) => x !== f)
        : [...prev.funcionalidades, f],
    }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus({ type: '', message: '' })
    try {
      await enviarCotizacion(form)
      setStatus({ type: 'success', message: '¡Cotización enviada! Te contactaremos pronto con una propuesta.' })
      setForm({
        nombre: '', email: '', telefono: '', empresa: '',
        tipo_sitio: 'Sitio informativo', presupuesto: '', plazo: '',
        funcionalidades: [], mensaje: '',
      })
    } catch (err) {
      const msg = err.response?.data?.message
        ? Object.values(err.response.data.message).flat().join(' · ')
        : 'Ocurrió un error al enviar la cotización.'
      setStatus({ type: 'error', message: msg })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Solicitar cotización</h2>
        <p className="section-subtitle">
          Cuéntanos sobre tu proyecto de sitio web y recibe una propuesta personalizada.
        </p>

        <form className="form" onSubmit={submit}>
          {status.message && (
            <div className={`alert alert-${status.type === 'success' ? 'success' : 'error'}`}>
              {status.message}
            </div>
          )}
          <div className="form-row">
            <div className="field">
              <label>Nombre *</label>
              <input name="nombre" value={form.nombre} onChange={update} required maxLength={120} />
            </div>
            <div className="field">
              <label>Email *</label>
              <input type="email" name="email" value={form.email} onChange={update} required maxLength={180} />
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label>Teléfono</label>
              <input name="telefono" value={form.telefono} onChange={update} maxLength={60} />
            </div>
            <div className="field">
              <label>Empresa</label>
              <input name="empresa" value={form.empresa} onChange={update} maxLength={180} />
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label>Tipo de sitio *</label>
              <select name="tipo_sitio" value={form.tipo_sitio} onChange={update} required>
                {TIPOS_SITIO.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Presupuesto (€)</label>
              <select name="presupuesto" value={form.presupuesto} onChange={update}>
                <option value="">Sin definir</option>
                {PRESUPUESTOS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div className="field">
            <label>Plazo deseado</label>
            <input type="date" name="plazo" value={form.plazo} onChange={update} />
          </div>
          <div className="field">
            <label>Funcionalidades</label>
            <div className="checkbox-group">
              {FUNCIONALIDADES.map((f) => (
                <label key={f}>
                  <input
                    type="checkbox"
                    checked={form.funcionalidades.includes(f)}
                    onChange={() => toggleFunc(f)}
                  />
                  {f}
                </label>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Detalles adicionales</label>
            <textarea name="mensaje" value={form.mensaje} onChange={update} maxLength={5000}
              placeholder="Describe tu proyecto, objetivos, referencias…" />
          </div>
          <div>
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? 'Enviando…' : 'Enviar cotización'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}