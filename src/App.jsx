import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Ticker from './components/Ticker.jsx'
import Problem from './components/Problem.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Prep from './components/Prep.jsx'
import Catalog from './components/Catalog.jsx'
import Deliverables from './components/Deliverables.jsx'
import Audience from './components/Audience.jsx'
import Programs from './components/Programs.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <Problem />
        <HowItWorks />
        <Prep />
        <Catalog />
        <Deliverables />
        <Audience />
        <Programs />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
