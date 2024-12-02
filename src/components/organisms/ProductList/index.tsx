import { useLocation } from "react-router-dom";
import { Product, Products } from "../../../api/products/types";
import CardSkeleton from "../../atoms/CardSkeleton"
import ProductCard from "../../molecules/ProductCard"
import styles from './ProductList.module.css'
import { useEffect } from "react";
import { logEvents } from "../../../firebase";
import { useTotem } from "../../../context/TotemContext";
import ProductFetchError from "../../cells/ProductFetchError";

export default function ProductList({
  products,
  selectedCity,
  setCartOpen,
  isLoading,
  isError,
}: {
  products: Products,
  selectedCity: string,
  setCartOpen: (value: boolean) => void,
  isLoading: boolean,
  isError: boolean,
}) {
  const location = useLocation();
  // @ts-expect-error: TODO: fix type of context
  const [totem, ] = useTotem();

  let showTest = false;
  if (location.pathname === '/totem/test'){
    showTest = true;
  }

  const handleShowTest = (show: boolean, product: Product) => {
    if (show) {
      if (product.isTest) {
        return true
      }
      return false
    } else {
      if (!product.isTest) {
        return true
      }
      return false
    }
  }

  const availableProducts = products
    .filter((prod) => prod.cityId === selectedCity)
    .filter((prod) => prod.showDisplay)
    .filter((prod) => prod.isAvailable)
    .filter((prod) => handleShowTest(showTest, prod))
    .sort((a, b) => a.priority - b.priority)

  const unavailableProducts = products
    .filter((prod) => prod.cityId === selectedCity)
    .filter((prod) => prod.showDisplay)
    .filter((prod) => !prod.isAvailable)
    .filter((prod) => handleShowTest(showTest, prod))
    .sort((a, b) => a.priority - b.priority)

  useEffect(() => {
    if (totem?.nickName) {
      logEvents("product_list", {totemNickName: totem?.nickName})
    }
  }, [totem])

  return (
    <div className={`bg-white ${styles.container}`}>
      <div className="flex justify-center">
        
        <div className="flex flex-wrap justify-start itens-start gap-6 p-6">
          {isError && <ProductFetchError />}
          {isLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ): (
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
          )}
        </div>
      </div>
    </div>
  )
}
