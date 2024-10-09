import { ReactNode } from "react"
import { Link } from "react-router-dom"

export default function AdminDrawer({
  children,
}: {
  children: ReactNode
}) {

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-4">
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/availabilities">Disponibilidades</Link></li>
          <li><Link to="/admin/products">Produtos</Link></li>
          <li><Link to="/admin/purchases">Compras</Link></li>
          <li><Link to="/admin/cities">Cidades</Link></li>
          <li><Link to="/admin/pos">POS</Link></li>
          <li><Link to="/admin/totem-tour">Totem Tour</Link></li>
        </ul>
      </div>
    </div>
  )
}