import asset from '../asset.js'

const fmt = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

export default function Articles({ articles }) {
  if (!articles.length) return null
  return (
    <section className="sec sec--alt">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 className="h-sec">Ideas and guides</h2>
            <p className="sub-sec">The latest from the Bounce Creative Designs blog.</p>
          </div>
          <a className="link-more" href="https://www.bouncecreativedesigns.co.uk/blog">All articles →</a>
        </div>
        <div className="posts">
          {articles.slice(0, 3).map((a) => (
            <a className="post" href={a.url} target="_blank" rel="noreferrer" key={a.url}>
              <div className="post__img">
                {a.img && <img src={asset(a.img)} alt="" loading="lazy" />}
              </div>
              <div className="post__body">
                <time dateTime={a.date}>{fmt(a.date)}</time>
                <h3>{a.title}</h3>
                {a.excerpt && <p>{a.excerpt}</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
