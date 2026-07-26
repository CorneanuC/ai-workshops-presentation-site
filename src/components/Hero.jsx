import { stats } from '../data/workshops.js'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid-lines" aria-hidden="true" />

      <div className="shell hero__inner">
        <p className="eyebrow">17 workshops · 60 minutes each · your documents</p>

        <h1 className="h-display hero__title">
          Your team does not need
          <br />
          an AI presentation.
          <br />
          <span className="grad-text">They need one hour and a real document.</span>
        </h1>

        <p className="lede hero__lede">
          Hands-on AI workshops for factory teams — HR, Production, Quality,
          Maintenance, Logistics, Finance. Half of every session is your people
          working on <strong>their own anonymized documents</strong>. They walk out
          with artifacts, not notes.
        </p>

        <div className="btn-row hero__cta">
          <a className="btn btn--primary" href="#contact">
            Start free — 2 workshops, 0 invoice
          </a>
          <a className="btn btn--ghost" href="#catalog">
            See the 17 workshops
          </a>
        </div>

        <p className="hero__fineprint mono">
          Free: scoping call + Workshop 01 + Workshop 09. Everything else is
          quoted per cohort.
        </p>

        <div className="hero__stats">
          {stats.map((s) => (
            <div className="hero__stat" key={s.label}>
              <span className="hero__statValue">{s.value}</span>
              <span className="hero__statLabel">{s.label}</span>
              <span className="hero__statSub">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
