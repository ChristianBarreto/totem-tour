import { Products } from "../../../api"
import CardSkeleton from "../../atoms/CardSkeleton"
import ProductCard from "../../molecules/ProductCard"
import styles from './ProductList.module.css'

export default function ProductList({
  products,
  selectedCity,
  setCartOpen,
}: {
  products: Products,
  selectedCity: string,
  setCartOpen: (value: boolean) => void,
}) {

  return (
    <div className={`bg-white ${styles.container}`}>
      <div className="flex justify-center">
        
        <div className="flex flex-wrap justify-start itens-start gap-6 p-6">
          {!products.length && (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}
          {products
            .filter((prod) => prod.cityId === selectedCity)
            .filter((prod) => prod.showDisplay)
            .sort((a, b) => a.priority - b.priority)
            .map((product) => (
              <ProductCard key={product.id} product={product} setCartOpen={setCartOpen}/>
            ))}
        </div>
      </div>
    </div>
  )
}
