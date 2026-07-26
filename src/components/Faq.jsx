import { useState } from 'react'
import { faqs } from '../data/workshops.js'
import './Faq.css'

export default function Faq() {
  const [open, setOpen] = useState(0) // index of the expanded item, or null

  return (
    <section className="section faq" id="faq">
      <div className="shell faq__inner">
        <div className="faq__aside">
          <p className="eyebrow">Questions</p>
          <h2 className="h1">
            The things clients
            <br />
            ask first.
          </h2>
          <p className="lede">
            Usually about the preparation. It is the honest answer that decides
            whether this is the right programme for your plant.
          </p>
          <a className="btn btn--ghost" href="#contact">
            Ask something else
          </a>
        </div>

        <div className="faq__list">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div className={`faq__item${isOpen ? ' is-open' : ''}`} key={f.q}>
                <h3>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq__sign" aria-hidden="true" />
                  </button>
                </h3>
                {isOpen && <p className="faq__a">{f.a}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
