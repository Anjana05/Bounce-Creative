import asset from '../asset.js'

export default function ClientLogos({ clients }) {
  if (!clients.length) return null

  // The marquee runs one full track width then resets, so the strip is
  // rendered twice — the duplicate is hidden from assistive tech.
  const strip = (dup) =>
    clients.map((c) => (
      <div className="logo-cell" key={`${dup}-${c.name}`}>
        <img src={asset(c.img)} alt={dup ? '' : c.name} loading="lazy" />
      </div>
    ))

  return (
    <section className="sec sec--alt">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 className="h-sec">Trusted by well known brands</h2>
            <p className="sub-sec">We’ve helped thousands of companies create perfect branded products.</p>
          </div>
        </div>
      </div>

      <div className="marquee" role="group" aria-label="Client brands">
        <div className="marquee__track">
          <div className="marquee__strip">{strip(0)}</div>
          <div className="marquee__strip" aria-hidden="true">{strip(1)}</div>
        </div>
      </div>
    </section>
  )
}
