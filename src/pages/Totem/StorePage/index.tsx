import { useEffect, useRef, useState } from "react";
import { CategoryDrawer } from "../../../components/organisms/CategoryDrawer";
import ProductList from "../../../components/organisms/ProductList";
import styles from './StorePage.module.css';
import { Cities, getCities, getProducts, Products } from "../../../api";
import CartModal from "../../../components/organisms/CartModal";
import Header from "../../../components/organisms/Header";
import Footer from "../../../components/organisms/Footer";

export default function StorePage() {
  const [products, setProducts] = useState<Products>([]);
  const [cities, setCities] = useState<Cities>([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    getProducts().then((productsResp) => {
      getCities().then((citiesResp) => {
        setCities(citiesResp as Cities);
        setProducts(productsResp as Products);
      })
    })
  }, []);

  useEffect(() => {
    if (cities.length) {
      setSelectedCity(cities[0].id)
    }
  }, [cities])

  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className={styles.container}>
      <Header setCartOpen={setCartOpen} />
      <CartModal cartOpen={cartOpen} setCartOpen={setCartOpen} products={products} />
      <div >
        <CategoryDrawer
          cities={cities}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        >
          <ProductList
            products={products}
            selectedCity={selectedCity}
            setCartOpen={setCartOpen}
          />
        </CategoryDrawer>
        <Footer setCartOpen={setCartOpen} />
      </div>
    </div>
   
  )
}