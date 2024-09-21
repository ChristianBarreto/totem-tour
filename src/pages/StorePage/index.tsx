import { CategoryDrawer } from "../../components/organisms/CategoryDrawer";
import ProductList from "../../components/organisms/ProductList";
import styles from './StorePage.module.css';

export default function HeroPage() {
  return (
    <div className={styles.container}>
      <CategoryDrawer>
        <ProductList />
      </CategoryDrawer>
      {/* <ChartModal /> */}
    </div>
  )
}