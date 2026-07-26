import { steps } from '../data/workshops.js'
import './HowItWorks.css'

const MINUTES = [
  { span: '0–5', label: 'One technique', width: 8 },
  { span: '5–15', label: 'Facilitated demo on a factory example', width: 17 },
  { span: '15–45', label: 'Your team works on their own document', width: 50, hot: true },
  { span: '45–55', label: 'Peer review & accuracy check', width: 17 },
  { span: '55–60', label: 'File the artifact', width: 8 },
]

export default function HowItWorks() {
  return (
    <section className="section how" id="how">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">How it works</p>
          <h2 className="h1">Four steps. One of them is yours.</h2>
          <p className="lede">
            We facilitate three of these. Step two decides whether the programme
            produces something you can use — and only your team can do it.
          </p>
        </div>

        <ol className="how__steps">
          {steps.map((s) => (
            <li
              className={`how__step${s.emphasis ? ' how__step--hot' : ''}`}
              key={s.n}
            >
              <span className="how__n mono">{s.n}</span>
              <div className="how__body">
                <h3 className="h3">{s.title}</h3>
                <span className="how__time mono">{s.time}</span>
                <p>{s.body}</p>
                {s.emphasis && (
                  <span className="how__flag">
                    Your effort. Non-negotiable.
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="how__anatomy">
          <div className="how__anatomyHead">
            <h3 className="h2">Anatomy of one 60-minute workshop</h3>
            <p className="lede">
              Half the clock belongs to your people working on their own material.
              That ratio is the whole method.
            </p>
          </div>

          <div className="how__bar" role="img" aria-label="60-minute workshop timeline: 5 minutes technique, 10 minutes demo, 30 minutes hands-on work, 10 minutes peer review, 5 minutes filing">
            {MINUTES.map((m) => (
              <div
                className={`how__seg${m.hot ? ' how__seg--hot' : ''}`}
                key={m.span}
                style={{ flexGrow: m.width }}
              >
                <span className="how__segSpan mono">{m.span}</span>
                <span className="how__segLabel">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
