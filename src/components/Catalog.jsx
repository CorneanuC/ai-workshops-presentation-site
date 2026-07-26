import { useMemo, useState } from 'react'
import { workshops, TRACKS } from '../data/workshops.js'
import './Catalog.css'

const PILOT = workshops.filter((w) => w.fastPilot).map((w) => w.n)

const FILTERS = [
  { id: 'all', label: `All ${workshops.length}` },
  { id: 'core', label: 'Core program' },
  { id: 'accelerator', label: 'Factory accelerator' },
  { id: 'free', label: 'Free' },
  { id: 'pilot', label: `Fast pilot (${PILOT.length})` },
]

export default function Catalog() {
  const [filter, setFilter] = useState('all')
  const [openSlug, setOpenSlug] = useState(null)

  const list = useMemo(() => {
    switch (filter) {
      case 'core':
      case 'accelerator':
        return workshops.filter((w) => w.track === filter)
      case 'free':
        return workshops.filter((w) => w.price === 'free')
      case 'pilot':
        return workshops.filter((w) => PILOT.includes(w.n))
      default:
        return workshops
    }
  }, [filter])

  return (
    <section className="section cat" id="catalog">
      <div className="shell">
        <div className="cat__head">
          <div className="section-head cat__headText">
            <p className="eyebrow">The catalogue</p>
            <h2 className="h1">
              Seventeen hours that each end
              <br />
              with something filed.
            </h2>
            <p className="lede">
              Every workshop is 60 minutes, built around one technique and one of
              your own documents. Below is what each session gives you — the
              exercises, facilitator prompts and answer keys stay in the workshop
              room.
            </p>
          </div>

          <div className="cat__tracks">
            {Object.values(TRACKS).map((t) => (
              <div className={`cat__track cat__track--${t.accent}`} key={t.id}>
                <span className="mono">{t.label}</span>
                <p>{t.blurb}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cat__filters">
          {/* Toggle buttons, not tabs — there are no tabpanels to own, and the
              tab pattern would promise arrow-key navigation we do not provide. */}
          <div className="cat__filterGroup" role="group" aria-label="Filter workshops">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                className={`cat__filter${filter === f.id ? ' is-on' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="cat__count mono" role="status">
            {list.length} shown
          </span>
        </div>

        <div className="cat__grid">
          {list.map((w) => {
            const open = openSlug === w.slug
            return (
              <article
                className={`wcard wcard--${TRACKS[w.track].accent}${
                  open ? ' is-open' : ''
                }`}
                key={w.slug}
              >
                <div className="wcard__top">
                  <span className="wcard__n mono">
                    {String(w.n).padStart(2, '0')}
                  </span>
                  <div className="wcard__chips">
                    {w.price === 'free' ? (
                      <span className="chip chip--free">Free</span>
                    ) : (
                      <span className="chip chip--paid">Billed</span>
                    )}
                    {w.tag && <span className="chip chip--tag">{w.tag}</span>}
                  </div>
                </div>

                <h3 className="wcard__title">{w.title}</h3>
                <p className="wcard__hook">“{w.hook}”</p>
                <p className="wcard__promise">{w.promise}</p>

                <button
                  type="button"
                  className="wcard__toggle"
                  aria-expanded={open}
                  onClick={() => setOpenSlug(open ? null : w.slug)}
                >
                  {open ? 'Hide details' : 'What you walk out with'}
                  <span className="wcard__caret" aria-hidden="true" />
                </button>

                {open && (
                  <div className="wcard__detail">
                    <div className="wcard__block">
                      <span className="wcard__label mono">You leave with</span>
                      <ul className="wcard__list">
                        {w.outcomes.map((o) => (
                          <li key={o}>{o}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="wcard__block">
                      <span className="wcard__label mono">Feeds deliverable</span>
                      <div className="wcard__artifacts">
                        {w.artifacts.map((a) => (
                          <span className="chip chip--accent" key={a}>
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="wcard__bring">
                      <span className="wcard__label mono">You bring</span>
                      <p>{w.bring}</p>
                    </div>

                    <p className="wcard__locked mono">
                      <span aria-hidden="true">▚</span> Full agenda, exercises and
                      facilitator prompts shared with booked cohorts.
                    </p>
                  </div>
                )}

                <div className="wcard__foot">
                  <span className="mono">{w.duration} min</span>
                  <span className="wcard__aud" title={w.audience.join(' · ')}>
                    {w.audience.join(' · ')}
                  </span>
                </div>
              </article>
            )
          })}
        </div>

        <div className="cat__cta">
          <p>
            Not sure which five to start with? The Fast Pilot exists for that
            exact question.
          </p>
          <a className="btn btn--primary" href="#contact">
            Ask for the recommended sequence
          </a>
        </div>
      </div>
    </section>
  )
}
