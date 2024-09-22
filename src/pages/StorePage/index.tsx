import { useEffect, useState } from "react";
import { CategoryDrawer } from "../../components/organisms/CategoryDrawer";
import ProductList from "../../components/organisms/ProductList";
import styles from './StorePage.module.css';
import { Cities, getCities, getProducts, Products } from "../../api";
import CartModal from "../../components/organisms/CartModal";

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
  
  return (
    <div className={styles.container}>
      <CategoryDrawer cities={cities} selectedCity={selectedCity} setSelectedCity={setSelectedCity} >
        <ProductList products={products} selectedCity={selectedCity} />
      </CategoryDrawer>
    </div>
  )
}