import { useEffect, useRef, useState } from "react";
import { CategoryDrawer } from "../../../components/organisms/CategoryDrawer";
import ProductList from "../../../components/organisms/ProductList";
import styles from './StorePage.module.css';
import { Cities } from "../../../api/cities/types";
import { getCities } from "../../../api/cities/api";
import { getProducts } from "../../../api/products/api";
import { Products } from "../../../api/products/types";
import CartModal from "../../../components/organisms/CartModal";
import Header from "../../../components/organisms/Header";
import Footer from "../../../components/organisms/Footer";
import { useCounter } from "../../../context/CounterContext";
import CitySelect from "../../../components/cells/CitySelect";

export default function StorePage() {
  const [products, setProducts] = useState<Products>([]);
  const [cities, setCities] = useState<Cities>([]);
  const [selectedCity, setSelectedCity] = useState('');

  // @ts-expect-error: TODO: fix type of context
  const [, dispatch] = useCounter();
  const appRef = useRef()as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    appRef.current?.addEventListener("mousedown", () => {
      dispatch({type: 'res_redirectToInit'})
    });

    getProducts().then((productsResp) => {
      getCities().then((citiesResp) => {
        setCities(citiesResp as Cities);
        setProducts(productsResp as Products);
      })
    })
  }, []);

  useEffect(() => {
    if (cities.length) {
      setSelectedCity(cities[0].id);
    }
  }, [cities]);

  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className={styles.container} ref={appRef}>
      <Header setCartOpen={setCartOpen} />
      <CartModal cartOpen={cartOpen} setCartOpen={setCartOpen} products={products} />
      <CitySelect
        cities={cities}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}      
      />
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