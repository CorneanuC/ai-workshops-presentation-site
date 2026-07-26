import { deliverables } from '../data/workshops.js'
import './Deliverables.css'

export default function Deliverables() {
  return (
    <section className="section section--paper deliv" id="deliverables">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">What you keep</p>
          <h2 className="h1">
            Six assets with your name on them.
            <br />
            Not a certificate.
          </h2>
          <p className="lede">
            These are built during the sessions, from your own material, and
            handed over as editable files you own. If a programme ends without
            them, it did not work.
          </p>
        </div>

        <div className="deliv__grid">
          {deliverables.map((d) => (
            <article className="deliv__card" key={d.n}>
              <span className="deliv__n mono">{d.n}</span>
              <h3 className="h3">{d.title}</h3>
              <p>{d.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
