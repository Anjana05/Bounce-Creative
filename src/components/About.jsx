export default function About({ about }) {
  return (
    <section className="band band--deep about">
      <div className="wrap">
        <div className="about__grid">
          <div>
            <span className="eyebrow">{about.eyebrow}</span>
            <h2 className="h2">{about.heading}</h2>
          </div>
          <div>
            {about.body.map((p, i) => (
              <p className="lede" key={i}>{p}</p>
            ))}
            <div className="about__links">
              {about.links.map((l) => (
                <a key={l.t} href={l.h}>{l.t}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
