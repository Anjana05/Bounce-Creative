import { useState } from 'react'

export default function Reviews({ reviews }) {
  const [i, setI] = useState(0)
  const t = reviews.testimonials
  if (!t.length) return null
  const cur = t[i]
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 className="h-sec">What our customers say</h2>
            <p className="sub-sec">Independently collected and verified by {reviews.source}.</p>
          </div>
        </div>
        <div className="reviews__grid">
          <div className="rating">
            <div className="rating__score">{reviews.score}</div>
            <div className="rating__stars stars">★★★★★</div>
            <div className="rating__count">Based on {reviews.total} reviews</div>
            <div className="rating__src">
              <b>{reviews.word}</b> on{' '}
              <a href={reviews.url} target="_blank" rel="noreferrer">{reviews.source}</a>
            </div>
          </div>
          <div>
            <figure className="quote is-active">
              <blockquote>{cur.text}</blockquote>
              <figcaption>
                <b>{cur.name}</b>
                {cur.date ? ` — ${cur.date}` : ''}
                {cur.verified && <span className="verified">✓ Verified buyer</span>}
              </figcaption>
            </figure>
            <div className="quotes__dots" role="tablist" aria-label="Customer reviews">
              {t.map((x, j) => (
                <button
                  key={x.name + j}
                  className="dot"
                  role="tab"
                  aria-current={i === j}
                  aria-label={`Review ${j + 1} of ${t.length}`}
                  onClick={() => setI(j)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
