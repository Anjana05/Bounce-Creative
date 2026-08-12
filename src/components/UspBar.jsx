import asset from '../asset.js'

// The live site publishes three USPs in the `sets_us_apart` CMS block, with
// icons but no supporting copy. Design A's fourth item and its sub-lines were
// invented, so they are not reproduced here.
const SUB = {
  'HIGH-QUALITY PRODUCTS': 'Quality over quantity, from trusted suppliers',
  'ONLINE ORDERING': 'Live stock and instant prices, 24/7',
  '100% COMPLIANT': 'Certified and audited supply chain',
}

export default function UspBar({ usps }) {
  if (!usps.length) return null
  return (
    <section className="usp" aria-label="What sets us apart">
      <div className="wrap">
        <div className="usp__grid">
          {usps.map((u) => (
            <div className="usp__item" key={u.title}>
              <span className="usp__ico">
                {u.img && <img src={asset(u.img)} alt="" width="34" height="34" />}
              </span>
              <span>
                <b>{u.title}</b>
                {SUB[u.title] && <small>{SUB[u.title]}</small>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
