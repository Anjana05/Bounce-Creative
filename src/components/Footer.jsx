import asset from '../asset.js'

export default function Footer({ content }) {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div>
            <a className="logo" href="#top">
              <img src={asset('img/logo/bounce-logo.png')} width="240" height="71"
                   alt="Bounce Creative Designs | Promotional Products" />
            </a>
            <p>{content.about.body[0]}</p>
          </div>
          <div>
            <h4>About</h4>
            <ul>{content.about.links.map((l) => <li key={l.t}><a href={l.h}>{l.t}</a></li>)}</ul>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>{content.nav.slice(0, 5).map((n) => <li key={n.label}><a href={n.href}>{n.label}</a></li>)}</ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li><a href={content.hero.catalogue} target="_blank" rel="noreferrer">View &amp; download our catalogue</a></li>
              <li><a href={content.reviews.url} target="_blank" rel="noreferrer">Customer reviews</a></li>
            </ul>
          </div>
        </div>
        <div className="ftr__bottom">
          <span>© 2026 — Bounce creative designs</span>
          <span>Prototype — not the live site</span>
        </div>
      </div>
    </footer>
  )
}
