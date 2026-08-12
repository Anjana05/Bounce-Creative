import { useCallback, useEffect, useRef, useState } from 'react'
import asset from '../asset.js'
import { useVat } from '../VatContext.jsx'

export default function ProductCarousel({ products }) {
  const track = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const { incVat, withVat } = useVat()

  const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })

  const sync = useCallback(() => {
    const el = track.current
    if (!el) return
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2)
  }, [])

  useEffect(() => {
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [sync])

  const page = (dir) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' })
  }

  if (!products.length) return null

  return (
    <section className="sec sec--alt" id="carousel">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 className="h-sec">Best sellers this month</h2>
            <p className="sub-sec">
              Prices shown from, {incVat ? 'including' : 'excluding'} VAT, based on the lowest quantity break.
            </p>
          </div>
          <div className="carousel__nav">
            <button className="cbtn" onClick={() => page(-1)} disabled={atStart} aria-label="Previous products">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 5-7 7 7 7" strokeLinecap="round" /></svg>
            </button>
            <button className="cbtn" onClick={() => page(1)} disabled={atEnd} aria-label="Next products">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 5 7 7-7 7" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>

        <div className="carousel">
          <div className="carousel__track" ref={track} onScroll={sync} tabIndex={0} role="group"
               aria-label="Best selling products"
               onKeyDown={(e) => {
                 if (e.key === 'ArrowRight') { e.preventDefault(); page(1) }
                 if (e.key === 'ArrowLeft') { e.preventDefault(); page(-1) }
               }}>
            {products.map((p) => (
              <a className={`card${p.eta ? '' : ' card--nolead'}`} href={p.url} target="_blank" rel="noreferrer" key={p.sku}>
                <div className="card__img">
                  <img src={asset(p.img)} alt={p.name} loading="lazy" width="560" height="560" />
                  {p.flag && <span className="card__flag card__flag--eco">{p.flag}</span>}
                </div>
                <div className="card__body">
                  <p className="card__name">{p.name}</p>
                  <div className="card__price">
                    <span className="from">from</span>
                    <b>{gbp.format(withVat(p.price))}</b>
                    <span className="vatnote">{incVat ? 'inc VAT' : 'ex VAT'} · {p.sku}</span>
                  </div>
                  <div className="card__meta">
                    {(p.swatches.length > 0 || p.variants > 1) && (
                      <div className="swatches">
                        {p.swatches.map((h) => (
                          <i className="sw" style={{ background: h }} key={h} />
                        ))}
                        {p.variants > 1
                          ? <em>+{p.variants - 1} more</em>
                          : p.colour ? <em>{p.colour}</em> : null}
                      </div>
                    )}
                    {p.eta && <div className="lead">Est. delivery {p.eta}</div>}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
