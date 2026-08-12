import asset from '../asset.js'

export default function Accreditations({ awards }) {
  if (!awards.length) return null
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 className="h-sec">Certified and accountable</h2>
            <p className="sub-sec">we’re really proud — our awards and accreditations.</p>
          </div>
        </div>
        <div className="accred">
          {awards.map((a) => (
            <span key={a.name}>
              <span className="mark"><img src={asset(a.img)} alt="" loading="lazy" /></span>
              {a.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
