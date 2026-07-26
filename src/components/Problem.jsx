import './Problem.css'

const ROWS = [
  {
    bad: 'A two-hour AI demo everyone enjoyed',
    good: 'Thirty minutes of your team rewriting their own SOP',
  },
  {
    bad: 'Slides about prompt engineering',
    good: 'Four tested prompts filed in your department library',
  },
  {
    bad: '"Be careful with data" as a bullet point',
    good: 'A one-page policy naming what may be pasted, and who approves',
  },
  {
    bad: 'Enthusiasm that fades in three weeks',
    good: 'Named champions, a monthly rhythm, a 30-day plan',
  },
]

export default function Problem() {
  return (
    <section className="section prob">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">Why most AI training does nothing</p>
          <h2 className="h1">
            Everybody has been to the AI session.
            <br />
            <span className="prob__dim">Almost nobody changed how they work.</span>
          </h2>
          <p className="lede">
            The reason is boringly consistent: the exercises used somebody else's
            example. Techniques learned on a generic case do not survive contact
            with your SOP, your handover notes, your KPI table. So we do it the
            other way around.
          </p>
        </div>

        <div className="prob__table">
          <div className="prob__thead">
            <span>Typical AI training</span>
            <span>This program</span>
          </div>
          {ROWS.map((r) => (
            <div className="prob__row" key={r.bad}>
              <div className="prob__cell prob__cell--bad">
                <span className="prob__icon" aria-hidden="true">
                  ✕
                </span>
                {r.bad}
              </div>
              <div className="prob__cell prob__cell--good">
                <span className="prob__icon prob__icon--ok" aria-hidden="true">
                  →
                </span>
                {r.good}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
