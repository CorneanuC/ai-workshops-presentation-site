import './Prep.css'

const RULES = [
  {
    keep: 'The structure',
    drop: 'The names',
    note: 'Same headings, same fields, same order. Employee and customer names replaced.',
  },
  {
    keep: 'The mess',
    drop: 'The identifiers',
    note: 'Do not tidy it up first. The mess is the exercise. IDs, order and invoice numbers go.',
  },
  {
    keep: 'The volume',
    drop: 'Commercial detail',
    note: 'Nine pages should stay nine pages. Prices, margins and supplier terms get masked.',
  },
  {
    keep: 'The real problem',
    drop: 'Anything under NDA',
    note: 'Bring the document people complain about. If in doubt, leave it out and tell us.',
  },
]

export default function Prep() {
  return (
    <section className="section section--paper prep" id="prep">
      <div className="shell prep__inner">
        <div className="prep__lead">
          <p className="eyebrow">Before workshop one</p>
          <h2 className="h1">
            This only works if you
            <br />
            do some homework.
          </h2>
          <p className="lede">
            Every participant brings one or two <strong>anonymized real documents</strong>
            {' '}from their own desk. Budget <strong>30–60 minutes per person</strong>.
            We send a substitution checklist, review a sample with you, and coach the
            first pass on the scoping call.
          </p>
          <p className="lede">
            We are explicit about this because it is the part clients underestimate.
            Teams that prepare walk out with a filled prompt library and a rewritten
            SOP. Teams that skip it get an interesting hour and nothing to file.
          </p>
          <div className="btn-row">
            <a className="btn btn--dark" href="#contact">
              Get the anonymization checklist
            </a>
          </div>
        </div>

        <div className="prep__card">
          <div className="prep__cardHead">
            <span className="mono">anonymization_rules.md</span>
            <span className="prep__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
          <ul className="prep__rules">
            {RULES.map((r) => (
              <li key={r.keep}>
                <div className="prep__pair">
                  <span className="prep__keep">Keep — {r.keep}</span>
                  <span className="prep__drop">Remove — {r.drop}</span>
                </div>
                <p>{r.note}</p>
              </li>
            ))}
          </ul>
          <p className="prep__foot mono">
            Nothing leaves your environment. All work happens in the AI tools your
            company has already approved.
          </p>
        </div>
      </div>
    </section>
  )
}
