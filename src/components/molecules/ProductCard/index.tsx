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

            {!product.isAvailable ? (
              <div role="alert" className="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{product.notAvailableMessage || 'Vagas esgotadas.'}</span>
              </div>
            ) : (
              <div role="alert" className="alert alert-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Disponível!</span>
              </div>
            )}
          </div>
        </div>
      </span>
    </>

  )
}