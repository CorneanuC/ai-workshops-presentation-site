import { useState } from 'react'
import './Contact.css'

const CONTACT_EMAIL = 'hello@ai-workshops.example'

const INTERESTS = [
  'Free session (call + 2 workshops)',
  'Core Program (10 workshops)',
  'Factory Accelerator (17 workshops)',
  'Fast Pilot (5 workshops)',
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    people: '',
    interest: INTERESTS[0],
    note: '',
  })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const body = [
      `Name: ${form.name}`,
      `Company / plant: ${form.company}`,
      `Email: ${form.email}`,
      `Approx. participants: ${form.people}`,
      `Interested in: ${form.interest}`,
      '',
      'Notes:',
      form.note || '(none)',
    ].join('\n')

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `AI workshops enquiry — ${form.company || form.name || 'new enquiry'}`
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="section cta" id="contact">
      <div className="cta__beam" aria-hidden="true" />
      <div className="shell cta__inner">
        <div className="cta__copy">
          <p className="eyebrow">Next step</p>
          <h2 className="h-display cta__title">
            One call.
            <br />
            <span className="grad-text">Two free workshops.</span>
            <br />
            Then you decide.
          </h2>
          <p className="lede">
            Tell us the plant, the departments and roughly how many people. We come
            back with a recommended sequence, the anonymization checklist, and a
            date for the free session.
          </p>

          <ul className="cta__points">
            <li>No slide deck sent in advance. We look at your work instead.</li>
            <li>No procurement — we use the AI licences you already have.</li>
            <li>No commitment until you have seen the format on your documents.</li>
          </ul>
        </div>

        <form className="cta__form" onSubmit={onSubmit}>
          <div className="cta__row">
            <label className="cta__field">
              <span>Your name</span>
              <input
                required
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={set('name')}
                placeholder="Maria Ionescu"
              />
            </label>
            <label className="cta__field">
              <span>Company / plant</span>
              <input
                required
                name="company"
                autoComplete="organization"
                value={form.company}
                onChange={set('company')}
                placeholder="Plant, city"
              />
            </label>
          </div>

          <div className="cta__row">
            <label className="cta__field">
              <span>Work email</span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={set('email')}
                placeholder="you@company.com"
              />
            </label>
            <label className="cta__field">
              <span>Participants (approx.)</span>
              <input
                name="people"
                value={form.people}
                onChange={set('people')}
                inputMode="numeric"
                placeholder="12"
              />
            </label>
          </div>

          <label className="cta__field">
            <span>Interested in</span>
            <select
              name="interest"
              value={form.interest}
              onChange={set('interest')}
            >
              {INTERESTS.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </label>

          <label className="cta__field">
            <span>Which documents cause the most pain? (optional)</span>
            {/* Capped: several Windows mail handlers silently drop a mailto:
                URL once it grows past ~2000 characters. */}
            <textarea
              rows="3"
              name="note"
              maxLength={700}
              value={form.note}
              onChange={set('note')}
              placeholder="SOPs nobody follows, shift handovers, the monthly KPI pack…"
            />
          </label>

          <button className="btn btn--primary cta__submit" type="submit">
            Request the free session
          </button>
          <p className="cta__fine mono">
            Opens your mail client with the details filled in — nothing is stored
            by this page. Or write directly to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </form>
      </div>
    </section>
  )
}
