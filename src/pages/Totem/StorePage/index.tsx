import { useEffect, useRef, useState } from "react";
import { CategoryDrawer } from "../../../components/organisms/CategoryDrawer";
import ProductList from "../../../components/organisms/ProductList";
import styles from './StorePage.module.css';
import { CitiesResp } from "../../../api/cities/types";
import { getCities } from "../../../api/cities/api";
import { getProducts } from "../../../api/products/api";
import { Products } from "../../../api/products/types";
import CartModal from "../../../components/organisms/CartModal";
import Header from "../../../components/organisms/Header";
import Footer from "../../../components/organisms/Footer";
import { useCounter } from "../../../context/CounterContext";
import { useTotem } from "../../../context/TotemContext";
import CitySelect from "../../../components/cells/CitySelect";

export default function StorePage() {
  const [products, setProducts] = useState<Products>([]);
  const [cities, setCities] = useState<CitiesResp>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  // @ts-expect-error: TODO: fix type of context
  const [, dispatch] = useCounter();
  // @ts-expect-error: TODO: fix type of context
  const [totem, ] = useTotem();
  const appRef = useRef()as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    appRef.current?.addEventListener("mousedown", () => {
      dispatch({type: 'res_redirectToInit'})
    });
    setIsLoading(true);

    getProducts({
      regionId: {eq: {str: totem?.regionId}},
      orderBy: {asc: "priority"},
    }).then((productsResp) => {
      getCities({
        regionId: {eq: {str: totem?.regionId}},
        active: {eq: {boo: true}},
        orderBy: {asc: "name"}
      }).then((citiesResp) => {
        setCities(citiesResp as CitiesResp);
        setProducts(productsResp as Products);
        setIsLoading(false);
      }).catch((res) => {
        console.log("Error getting cities", res);
        setIsLoading(false);
        setIsError(true);
      })
    }).catch((res) => {
      console.log("Error getting products", res);
      setIsLoading(false);
      setIsError(true);
    })
  }, [totem]);

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
          isLoading={isLoading}
          isError={isError}
        >
          <ProductList
            isLoading={isLoading}
            isError={isError}
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