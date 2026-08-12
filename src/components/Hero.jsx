import asset from '../asset.js'

export default function Hero({ hero, categories, reviews }) {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero__grid">
          <div>
            <h1>
              We’ve helped thousands of companies <em>create perfect branded products</em>
            </h1>
            <p className="lede">
              Over 3,000 branded products chosen for quality over quantity, from trusted suppliers
              aligned with sustainable production and ethical practice.
            </p>
            <div className="hero__cta">
              <a className="btn btn--primary" href="#ranges">Shop by category</a>
              <a className="btn btn--onDark" href={hero.catalogue} target="_blank" rel="noreferrer">
                View &amp; download our catalogue
              </a>
            </div>
            <div className="hero__proof">
              <a className="chip" href={reviews.url} target="_blank" rel="noreferrer">
                <span className="stars">★★★★★</span> {reviews.score} / 5 · {reviews.total} reviews
              </a>
              <span className="chip">{reviews.word} on {reviews.source}</span>
              <span className="chip">UK print &amp; despatch</span>
            </div>
          </div>
          <div className="hero__art">
            {categories.slice(0, 4).map((c) => (
              <div className="hero__card" key={c.title}>
                <img src={asset(c.img)} alt={c.title} width="512" height="760" />
                <span>{c.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
