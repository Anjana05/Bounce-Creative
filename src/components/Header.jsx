import { useEffect, useRef, useState } from 'react'
import asset from '../asset.js'

const fmt = new Intl.NumberFormat('en-GB')

export default function Header({ nav, suggestions }) {
  const [compact, setCompact] = useState(false)
  const [stuck, setStuck] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [query, setQuery] = useState('')
  const [suggOpen, setSuggOpen] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    let frame = null
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => { setStuck(window.scrollY > 4); setCompact(window.scrollY > 220); frame = null })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame) }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpenMenu(null); setDrawer(false); setSuggOpen(false)
    }
    const onClick = (e) => {
      if (!e.target.closest('[data-menu]')) setOpenMenu(null)
      if (searchRef.current && !searchRef.current.contains(e.target)) setSuggOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick) }
  }, [])

  const matches = suggestions.filter((s) => s.term.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <>
      <header className={`hdr${stuck ? ' is-stuck' : ''}${compact ? ' is-compact' : ''}`}>
        <div className="wrap">
          <div className="hdr__main">
            <button className="burger" aria-label="Open menu" aria-expanded={drawer} onClick={() => setDrawer(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            </button>

            <a className="logo" href="#top">
              <img src={asset('img/logo/bounce-logo-dark.png')} width="240" height="71"
                   alt="Bounce Creative Designs | Promotional Products" />
            </a>

            <div className="search" ref={searchRef}>
              <label className="sr-only" htmlFor="q">Search products</label>
              <div className="search__field">
                <svg className="search__ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round" /></svg>
                <input
                  id="q" type="search" autoComplete="off"
                  placeholder="Search product, brand, colour or code"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSuggOpen(e.target.value.trim().length >= 2) }}
                  onFocus={() => setSuggOpen(query.trim().length >= 2)}
                />
              </div>
              {suggOpen && matches.length > 0 && (
                <div className="sugg is-open" role="listbox" aria-label="Search suggestions">
                  {matches.map((s) => (
                    <a key={s.term} href={`/${s.term.toLowerCase()}`} role="option">
                      <span>{s.term}</span><em>{fmt.format(s.count)} products</em>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="hdr__tools">
              <a className="tool" href="#">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" strokeLinecap="round" /></svg>
                <span>Account</span>
              </a>
              <a className="tool" href="#">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9Z" strokeLinejoin="round" /></svg>
                <span>Wishlist</span>
              </a>
              <a className="tool" href="#">
                <span className="badge">3</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 7h12l-1 13H7L6 7Z" strokeLinejoin="round" /><path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" /></svg>
                <span>Basket</span>
              </a>
            </div>
          </div>
        </div>

        <nav className="nav" aria-label="Product categories">
          <div className="wrap">
            <ul className="nav__list">
              {nav.map((item) => {
                const open = openMenu === item.label
                if (!item.children.length) {
                  return (
                    <li className="nav__item" key={item.label}>
                      <a className="nav__btn" href={item.href}>{item.label}</a>
                    </li>
                  )
                }
                return (
                  <li className={`nav__item${open ? ' is-open' : ''}`} key={item.label} data-menu
                      onMouseEnter={() => setOpenMenu(item.label)}
                      onMouseLeave={() => setOpenMenu(null)}>
                    <button className="nav__btn" aria-expanded={open}
                            onClick={() => setOpenMenu(open ? null : item.label)}>
                      {item.label}
                      <svg className="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6" strokeLinecap="round" /></svg>
                    </button>
                    <div className="mega">
                      <div className="wrap">
                        <div className="mega__grid">
                          {chunk(item.children, 3).map((col, i) => (
                            <div key={i}>
                              <h4>{i === 0 ? item.label : ' '}</h4>
                              <ul>
                                {col.map((k) => (
                                  <li key={k.name}>
                                    <a href={k.href}>{k.name} <em>{fmt.format(k.count)}</em></a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <div className="mega__promo">
                            <div>
                              <b>All of {item.label}</b>
                              <p>Browse the full {item.label.toLowerCase()} range with live stock and instant prices.</p>
                            </div>
                            <a className="btn btn--primary" href={item.href}>Shop {item.label}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </header>

      {drawer && (
        <div className="drawer">
          <div className="drawer__scrim" onClick={() => setDrawer(false)} />
          <div className="drawer__panel" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="drawer__top">
              <b>Shop by category</b>
              <button onClick={() => setDrawer(false)} aria-label="Close menu">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>
            <div className="drawer__body">
              {nav.map((n) => (
                <a key={n.label} href={n.href} onClick={() => setDrawer(false)}>{n.label}</a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function chunk(arr, cols) {
  const per = Math.ceil(arr.length / cols)
  return Array.from({ length: cols }, (_, i) => arr.slice(i * per, (i + 1) * per)).filter((c) => c.length)
}
