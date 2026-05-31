import './ItemCard.css'

function ItemCard({ name, link, imageUrl, onClick }) {
  // Use imageUrl if available, otherwise fall back to link
  const imageSrc = imageUrl || link;
  
  return (
    <section className="item-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <img src={imageSrc} alt={name} className="item-card__image" />
      <h3 className="item-card__name">{name}</h3>
    </section>
  )
}

export default ItemCard














