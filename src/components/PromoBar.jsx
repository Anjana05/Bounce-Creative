export default function PromoBar({ promo }) {
  return (
    <div className="promo">
      {promo.text} <strong>{promo.code}</strong>
    </div>
  )
}
