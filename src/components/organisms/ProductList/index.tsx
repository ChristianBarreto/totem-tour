import { Products } from "../../../api"
import ProductCard from "../../molecules/ProductCard"
import styles from './ProductList.module.css'

export default function ProductList({
  products,
  selectedCity,
}: {
  products: Products,
  selectedCity: string,
}) {
  return (
    <div className={`bg-white ${styles.container}`}>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-start itens-start gap-6 p-6">
          {products.filter((prod) => prod.cityId === selectedCity).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
