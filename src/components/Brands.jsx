import asset from '../asset.js'

export default function Brands({ brands }) {
  if (!brands.length) return null
  return (
    <section className="band" aria-label="Brands we supply">
      <div className="wrap">
        <div className="secline">
          <h2 className="h2">Supplying amazing brands</h2>
          <span className="secline__n">{brands.length} brands</span>
        </div>
        <ul className="brands">
          {brands.map((b) => (
            <li key={b.name}>
              <img src={asset(b.img)} alt={b.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
