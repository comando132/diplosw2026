import { useState } from 'react'
import { enviarContacto } from '../api/portafolio'

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus({ type: '', message: '' })
    try {
      await enviarContacto(form)
      setStatus({ type: 'success', message: '¡Mensaje enviado! Te responderé a la brevedad.' })
      setForm({ nombre: '', email: '', asunto: '', mensaje: '' })
    } catch (err) {
      const msg = err.response?.data?.message
        ? Object.values(err.response.data.message).flat().join(' · ')
        : 'Ocurrió un error al enviar el mensaje.'
      setStatus({ type: 'error', message: msg })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Contacto</h2>
        <p className="section-subtitle">
          ¿Tienes una idea o pregunta? Escríbeme y te responderé lo antes posible.
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
          <div className="field">
            <label>Asunto</label>
            <input name="asunto" value={form.asunto} onChange={update} maxLength={200} />
          </div>
          <div className="field">
            <label>Mensaje *</label>
            <textarea name="mensaje" value={form.mensaje} onChange={update} required maxLength={5000} />
          </div>
          <div>
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? 'Enviando…' : 'Enviar mensaje'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}