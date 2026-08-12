import asset from '../asset.js'

export default function Accreditations({ awards }) {
  if (!awards.length) return null
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head sec-head--center">
          <div>
            <h2 className="h-sec">Certified and accountable</h2>
            <p className="sub-sec">we’re really proud — our awards and accreditations.</p>
          </div>
        </div>
        <ul className="accred">
          {awards.map((a) => (
            <li className="accred__item" key={a.name}>
              <span className="accred__mark"><img src={asset(a.img)} alt="" loading="lazy" /></span>
              <span className="accred__label">{a.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
