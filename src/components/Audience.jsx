import { DEPARTMENTS } from '../data/workshops.js'
import './Audience.css'

const TOOLS = [
  { name: 'ChatGPT Enterprise', use: 'Drafting, review, structured thinking, prompt practice' },
  { name: 'Copilot in Word', use: 'SOPs, policies, work instructions, reports' },
  { name: 'Copilot in Excel', use: 'KPIs, formulas, trends, variance summaries' },
  { name: 'Copilot in Outlook', use: 'Customer replies, supplier follow-ups, announcements' },
  { name: 'Copilot in Teams', use: 'Meeting summaries, actions, escalation notes' },
  { name: 'Copilot in PowerPoint', use: 'Training decks, management updates' },
  { name: 'SharePoint + Copilot', use: 'Finding, summarizing and comparing internal documents' },
]

export default function Audience() {
  return (
    <section className="section aud">
      <div className="shell aud__inner">
        <div className="aud__col">
          <p className="eyebrow">Who sits in the room</p>
          <h2 className="h1">Eleven departments. No technical background required.</h2>
          <p className="lede">
            If someone can write an email and read a spreadsheet, they can finish
            every exercise. Cohorts of 8–16, mixed across two or three departments
            — that mix is where the useful arguments happen.
          </p>
          <ul className="aud__deps">
            {DEPARTMENTS.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>

        <div className="aud__col">
          <p className="eyebrow">Tools</p>
          <h2 className="h2 aud__toolsTitle">
            We work inside the licences you already pay for.
          </h2>
          <p className="lede aud__toolsLede">
            Nothing to procure, nothing to install, no new vendor in your data
            path. Your IT rules are the boundary of every exercise.
          </p>
          <ul className="aud__tools">
            {TOOLS.map((t) => (
              <li key={t.name}>
                <span className="aud__toolName">{t.name}</span>
                <span className="aud__toolUse">{t.use}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
