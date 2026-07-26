import { programs } from '../data/workshops.js'
import './Programs.css'

export default function Programs() {
  return (
    <section className="section prog" id="programs">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">Three ways in</p>
          <h2 className="h1">Start free. Pay when you have seen it work.</h2>
          <p className="lede">
            The scoping call and two workshops cost nothing — deliberately, because
            the format only convinces people once it is applied to their own
            documents. Paid programmes are quoted per cohort or per plant, based on
            department count and how much anonymization coaching you want.
          </p>
        </div>

        <div className="prog__grid">
          {programs.map((p) => (
            <article
              className={`prog__card${p.highlight ? ' prog__card--hot' : ''}`}
              key={p.id}
            >
              {p.badge && <span className="prog__badge">{p.badge}</span>}
              <header className="prog__head">
                <h3 className="prog__name">{p.name}</h3>
                <p className="prog__pitch">{p.pitch}</p>
              </header>

              <div className="prog__price">
                <span className="prog__priceValue">{p.price}</span>
                <span className="prog__priceNote">{p.priceNote}</span>
              </div>

              <span className="prog__length mono">{p.length}</span>

              <ul className="prog__features">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <a
                className={`btn ${
                  p.highlight ? 'btn--primary' : 'btn--ghost'
                } prog__cta`}
                href="#contact"
              >
                {p.cta}
              </a>
            </article>
          ))}
        </div>

        <p className="prog__note">
          Prefer to test the shape first? The five-workshop{' '}
          <strong>Fast Pilot</strong> — Discovery Sprint, Prompt-a-thon, SOPs,
          Verification Lab, Champions — is the shortest route to something a plant
          manager can see.
        </p>
      </div>
    </section>
  )
}
