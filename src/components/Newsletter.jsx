import { useState } from 'react'

const VALID = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState(null)
  const [seen, setSeen] = useState([])

  const submit = (e) => {
    e.preventDefault()
    const v = email.trim().toLowerCase()
    if (!VALID.test(v)) {
      setMsg({ ok: false, text: 'Enter a valid email address, for example you@company.co.uk' })
      return
    }
    if (seen.includes(v)) {
      setMsg({ ok: false, text: 'This address is already subscribed.' })
      return
    }
    setSeen([...seen, v])
    setMsg({ ok: true, text: 'Thanks — check your inbox to confirm your subscription.' })
    setEmail('')
  }

  return (
    <section className="news">
      <div className="wrap">
        <div className="news__grid">
          <div>
            <h2 className="h2">Ideas, offers and new products</h2>
            <p>One email a month. Unsubscribe any time.</p>
          </div>
          <form className="news__form" onSubmit={submit} noValidate>
            <label className="sr-only" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.co.uk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={msg && !msg.ok ? 'true' : undefined}
            />
            <button className="btn btn--primary" type="submit">Subscribe</button>
            <p className={`news__msg${msg ? (msg.ok ? ' ok' : ' err') : ''}`} role="status" aria-live="polite">
              {msg?.text}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
