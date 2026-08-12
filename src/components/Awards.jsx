import asset from '../asset.js'

export default function Awards({ awards }) {
  if (!awards.length) return null
  return (
    <section className="band band--alt" aria-label="Our awards and accreditations">
      <div className="wrap">
        <span className="eyebrow">we’re really proud</span>
        <div className="secline">
          <h2 className="h2">Our Awards</h2>
        </div>
        <ul className="awards">
          {awards.map((a) => (
            <li key={a.name}>
              <img src={asset(a.img)} alt={a.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
