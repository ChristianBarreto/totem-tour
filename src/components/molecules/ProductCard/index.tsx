import { Product } from "../../../api"
import { useState } from "react"
import ProductModal from "../../organisms/ProductModal";

export default function ProductCard({
  product,
  setCartOpen,
}: {
  product: Product,
  setCartOpen: (value: boolean) => void,
}) {
  const [productModalOpen, setProductModalOpen] = useState(false)

  return (
    <>
      {productModalOpen && <ProductModal product={product} open={productModalOpen} setOpen={setProductModalOpen} setCartOpen={setCartOpen}/>}
      <span>
        <div className="card card-compact bg-base-100 shadow-xl w-full md:w-80" onClick={() => setProductModalOpen(true)}>
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
      </span>
    </>

  )
}