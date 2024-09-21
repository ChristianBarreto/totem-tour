import { ReactElement } from "react"
import CategoryCard from "../../molecules/CategoryCard"
import { Cities } from "../../../api"

export function CategoryDrawer({
  children,
  cities,
  selectedCity,
  setSelectedCity,
}: {
  children: ReactElement,
  cities: Cities,
  selectedCity: string,
  setSelectedCity: (id: string) => void,
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

      <div className="">      
        <ul className="menu text-base-content w-80 p-0">
          <div className="bg-neutral-content p-2 flex justify-center">
            <p className="text-4xl text-neutral-600">Escolha a cidade</p>
          </div>
          <ul className="p-4">
            {cities.map((city) => (
              <CategoryCard key={city.id} city={city} setSelectedCity={setSelectedCity} selectedCity={selectedCity} />
            ))}
          </ul>
        </ul>
      </div>
    </div>
  )
}