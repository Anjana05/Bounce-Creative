import asset from '../asset.js'

export default function ClientLogos({ clients }) {
  if (!clients.length) return null
  return (
    <section className="sec sec--alt">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 className="h-sec">Trusted by well known brands</h2>
            <p className="sub-sec">We’ve helped thousands of companies create perfect branded products.</p>
          </div>
        </div>
        <div className="logos">
          {clients.map((c) => (
            <div className="logo-cell" key={c.name}>
              <img src={asset(c.img)} alt={c.name} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
