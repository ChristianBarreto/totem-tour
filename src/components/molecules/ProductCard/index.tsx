import { Link } from "react-router-dom"
import { Product } from "../../../api"

export default function ProductCard({
  product
}: {
  product: Product
}) {
  return (
    <Link to="#">
      <div className="card card-compact bg-base-100 w-80 shadow-xl">
        <figure>
          <img
            src={product.imgUrl}
            alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>{product.description}</p>
        </div>
      </div>
    </Link>
    
  )
}