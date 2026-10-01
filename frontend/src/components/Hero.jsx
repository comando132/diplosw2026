export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <h1>
          Sitios web a medida con <span className="grad">Laravel y React</span>
        </h1>
        <p>
          Desarrollo de sitios web profesionales, e-commerce y aplicaciones web:
          diseños modernos, rápidos y mantenibles. Conoce mis proyectos y solicita tu cotización.
        </p>
        <div className="hero-actions">
          <a href="/proyectos" className="btn btn-primary">Ver proyectos</a>
          <a href="/cotizacion" className="btn btn-ghost">Pedir cotización</a>
        </div>
      </div>
    </section>
  )
}