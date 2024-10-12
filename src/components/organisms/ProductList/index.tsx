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

  const availableProducts = products
    .filter((prod) => prod.cityId === selectedCity)
    .filter((prod) => prod.showDisplay)
    .filter((prod) => prod.isAvailable)
    .sort((a, b) => a.priority - b.priority)

  const unavailableProducts = products
    .filter((prod) => prod.cityId === selectedCity)
    .filter((prod) => prod.showDisplay)
    .filter((prod) => !prod.isAvailable)
    .sort((a, b) => a.priority - b.priority)

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
          {
            <>
              {!!availableProducts.length && (
                <div className="w-full p-4 rounded text-center bg-green-400">
                  <p className="text-2xl text-white">Disponíveis</p>
                </div>
              )}
              {availableProducts
                .map((product) => (
                  <ProductCard key={product.id} product={product} setCartOpen={setCartOpen}/>
                ))}

              {!!unavailableProducts.length && (
                <div className="w-full p-4 rounded text-center bg-accent">
                  <p className="text-2xl text-white">Em breve!</p>
                </div>
              )}
              {unavailableProducts
                .map((product) => (
                  <ProductCard key={product.id} product={product} setCartOpen={setCartOpen}/>
                ))}
            </>
          }
        </div>
      </div>
    </div>
  )
}
