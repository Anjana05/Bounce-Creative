import asset from '../asset.js'

const fmt = new Intl.NumberFormat('en-GB')

export default function CategoryTiles({ categories }) {
  if (!categories.length) return null
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 className="h-sec">Shop by category</h2>
            <p className="sub-sec">Every range printed, embroidered or engraved with your brand.</p>
          </div>
          <a className="link-more" href="https://www.bouncecreativedesigns.co.uk/">All categories →</a>
        </div>
        <div className="tiles">
          {categories.map((c) => (
            <a className="tile" href={c.href} key={c.title}>
              <div className="tile__img">
                <img src={asset(c.img)} alt={c.title} loading="lazy" width="700" height="900" />
                {c.count ? <span>{fmt.format(c.count)} products</span> : null}
              </div>
              <div className="tile__body">
                <b>{c.title}</b>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
