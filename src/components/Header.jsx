import { useEffect, useRef, useState } from 'react'
import './Header.css'

const NAV = [
  { href: '#how', label: 'How it works' },
  { href: '#catalog', label: 'Workshops' },
  { href: '#deliverables', label: 'What you keep' },
  { href: '#programs', label: 'Programs' },
  { href: '#faq', label: 'FAQ' },
]

// Keep in sync with the 1020px breakpoint in Header.css, where the burger and
// the sheet are both hidden.
const NAV_BREAKPOINT = 1020

export default function Header() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const burgerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Above the breakpoint neither the sheet nor the burger is rendered visibly,
  // so an open menu would leave the body scroll-locked with no way to release it.
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${NAV_BREAKPOINT + 1}px)`)
    const onChange = (e) => {
      if (e.matches) setOpen(false)
    }
    onChange(mq)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        burgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`hdr${stuck ? ' hdr--stuck' : ''}`}>
      <div className="hdr__bar shell">
        <a className="hdr__brand" href="#top" onClick={() => setOpen(false)}>
          <span className="hdr__mark" aria-hidden="true" />
          <span className="hdr__name">
            AI&nbsp;Workshops<span className="hdr__sub">for factories</span>
          </span>
        </a>

        <nav className="hdr__nav" aria-label="Primary">
          {NAV.map((i) => (
            <a key={i.href} href={i.href}>
              {i.label}
            </a>
          ))}
        </nav>

        <div className="hdr__actions">
          <a className="btn btn--primary btn--sm" href="#contact">
            Book the free session
          </a>
          <button
            ref={burgerRef}
            type="button"
            className={`hdr__burger${open ? ' is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="hdr-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <nav className="hdr__sheet" id="hdr-menu" aria-label="Primary, mobile">
          {NAV.map((i) => (
            <a key={i.href} href={i.href} onClick={() => setOpen(false)}>
              {i.label}
            </a>
          ))}
          <a
            className="btn btn--primary"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            Book the free session
          </a>
        </nav>
      )}
    </header>
  )
}
