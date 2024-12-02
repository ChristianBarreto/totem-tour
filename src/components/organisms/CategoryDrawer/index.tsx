import { ReactElement } from "react"
import CategoryCard from "../../molecules/CategoryCard"
import { Cities } from "../../../api/cities/types";
import styles from './CategoryDrawer.module.css';
import CardSkeleton from "../../atoms/CardSkeleton";

export function CategoryDrawer({
  children,
  cities,
  selectedCity,
  setSelectedCity,
  isLoading,
  isError,
}: {
  children: ReactElement,
  cities: Cities,
  selectedCity: string,
  setSelectedCity: (id: string) => void,
  isLoading: boolean,
  isError: boolean,
}) {
  return (
    <div className="drawer lg:drawer-open h-full">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="bg-warning p-2 flex justify-center">
          <p className="text-4xl text-neutral-600">Escolha o passeio</p>
        </div>
        {children}
      </div>

      <div className={`hidden md:block bg-amber-100 ${styles.container}`}>      
        <ul className="menu text-base-content w-80 p-0">
          <div className="bg-amber-200 p-2 flex justify-center">
            <p className="text-4xl text-neutral-500">Escolha a cidade</p>
          </div>
          <ul className="p-4">
            {isError && <></>}
            {isLoading ? (
              <CardSkeleton width={65}/>
            ): (
              <>
                {cities.map((city) => (
                  <CategoryCard key={city.id} city={city} setSelectedCity={setSelectedCity} selectedCity={selectedCity} />
                ))}
              </>
            )}
          </ul>
        </ul>
      </div>
    </div>
  )
}