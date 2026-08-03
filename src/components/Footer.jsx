import './Footer.css'

//const CONTACT_EMAIL = 'contact@workshops-ai.eu'
const CONTACT_EMAIL = 'constantin@corneanu.eu'

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="shell ftr__inner">
        <div className="ftr__brand">
          <span className="ftr__mark" aria-hidden="true" />
          <div>
            <p className="ftr__name">AI Workshops for Factories</p>
            <p className="ftr__tagline">
              60-minute labs. Your documents. Artifacts you keep.
            </p>
          </div>
        </div>

        <nav className="ftr__cols" aria-label="Footer">
         
          <div>
            <span className="ftr__colTitle mono">SC QuanticTech SRL</span>
            <a href="#location1">Craiova, Timisoara</a>
            <a href="#location2">București, Constanta, Iasi</a>
            <a href="#email">{CONTACT_EMAIL}</a>
            <a href="#phone">+40 744 999 896</a>
          </div>
         
          <div>
            <span className="ftr__colTitle mono">Program</span>
            <a href="#how">How it works</a>
            <a href="#catalog">All 17 workshops</a>
            <a href="#deliverables">What you keep</a>
            <a href="#programs">Pricing</a>
          </div>
          <div>
            <span className="ftr__colTitle mono">Before you start</span>
            <a href="#prep">Anonymization</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Book a session</a>
          </div>
        </nav>
      </div>

      <div className="shell ftr__base">
        <p>© {new Date().getFullYear()} AI Workshops for Factories.</p>
        <p className="mono">
          Workshop agendas and exercise material are shared with booked cohorts.
        </p>
      </div>
    </footer>
  )
}
