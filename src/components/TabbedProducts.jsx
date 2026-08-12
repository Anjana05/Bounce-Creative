import { useState } from 'react'
import asset from '../asset.js'
import { useVat } from '../VatContext.jsx'

const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })

export default function TabbedProducts({ id, tabs, title, sub, tone = 'popular' }) {
  const [active, setActive] = useState(0)
  const { incVat, withVat } = useVat()

  if (!tabs || !tabs.length) return null
  const tab = tabs[Math.min(active, tabs.length - 1)]

  return (
    <section className={`sec tabsec tabsec--${tone}`} id={id}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 className="h-sec">{title}</h2>
            <p className="sub-sec">{sub}</p>
          </div>
        </div>

        <div className="tabsec__rail" role="tablist" aria-label={title}>
          {tabs.map((t, i) => (
            <button
              key={t.optionId}
              role="tab"
              id={`${id}-tab-${t.optionId}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel-${t.optionId}`}
              tabIndex={i === active ? 0 : -1}
              className={`tabpill${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') { e.preventDefault(); setActive((active + 1) % tabs.length) }
                if (e.key === 'ArrowLeft') { e.preventDefault(); setActive((active - 1 + tabs.length) % tabs.length) }
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          className="tabsec__grid"
          role="tabpanel"
          id={`${id}-panel-${tab.optionId}`}
          aria-labelledby={`${id}-tab-${tab.optionId}`}
        >
          {tab.products.map((p) => (
            <a className="card card--nolead" href={p.url} target="_blank" rel="noreferrer" key={p.sku}>
              <div className="card__img">
                <img src={asset(p.img)} alt={p.name} loading="lazy" width="560" height="560" />
                {p.badges.length > 0 && (
                  <div className="card__badges">
                    {p.badges.map((b) => (
                      <span className={`card__flag card__flag--${b.tone}`} key={b.text}>{b.text}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="card__body">
                <p className="card__name">{p.name}</p>
                <div className="card__price">
                  <span className="from">from</span>
                  <b>{gbp.format(withVat(p.price))}</b>
                  <span className="vatnote">{incVat ? 'inc VAT' : 'ex VAT'} · {p.sku}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
