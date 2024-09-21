import { ReactElement } from "react"
import CategoryCard from "../../molecules/CategoryCard"

export function CategoryDrawer({
  children
}: {
  children: ReactElement
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
            <li><a><CategoryCard /></a></li>
            <li><a><CategoryCard /></a></li>
          </ul>
        </ul>
      </div>
    </div>
  )
}