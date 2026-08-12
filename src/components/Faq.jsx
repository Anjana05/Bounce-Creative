import { useState } from 'react'

export default function Faq({ faq }) {
  const [open, setOpen] = useState(0)
  if (!faq.length) return null
  return (
    <section className="band">
      <div className="wrap">
        <div className="secline">
          <h2 className="h2">Promotional products by Bounce Creative Designs</h2>
        </div>
        <div className="faq">
          {faq.map((f, i) => (
            <div className="qa" key={f.q}>
              <h3>
                <button
                  className="qa__q"
                  aria-expanded={open === i}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </button>
              </h3>
              <div className="qa__a" id={`faq-${i}`} hidden={open !== i}>
                {f.a.map((p, j) => <p key={j}>{p}</p>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
