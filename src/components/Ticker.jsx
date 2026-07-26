import './Ticker.css'

const ITEMS = [
  'SOPs nobody follows',
  'Shift handovers lost between crews',
  'Nonconformity reports that need translating',
  'The two-day KPI pack',
  'Customer complaints answered twice',
  'Invoice disputes in a mailbox',
  'Audit evidence assembled in a panic',
  'Training material from 2017',
]

export default function Ticker() {
  return (
    <div className="tick">
      <div className="tick__track">
        {/* The second group only exists to make the marquee seamless — hide the
            duplicate from assistive tech, but let the first group be read. */}
        {[0, 1].map((dup) => (
          <div className="tick__group" key={dup} aria-hidden={dup === 1}>
            {ITEMS.map((i) => (
              <span className="tick__item" key={i}>
                <i className="tick__dot" aria-hidden="true" />
                {i}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
