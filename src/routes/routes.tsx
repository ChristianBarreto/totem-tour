import { createBrowserRouter } from "react-router-dom";
import HeroTemplate from "../pages/templates/HeroTemplate";
import HeroPage from "../pages/Totem/HeroPage";
import StoreTemplate from "../pages/templates/StoreTemplate";
import StorePage from "../pages/Totem/StorePage";
import CheckoutPage from "../pages/Totem/CheckoutPage";
import AdminTemplate from "../pages/templates/AdminTemplate";
import DashboardPage from "../pages/admin/DashboardPage";
import ProductsPage from "../pages/admin/Products/ProductsPage";
import PurchasesPage from "../pages/admin/PurchasesPage";
import CitiesPage from "../pages/admin/CitiesPage";
import AddEditProductPage from "../pages/admin/Products/AddEditProductPage";
import PosPage from "../pages/admin/PosPage";
import EditCompanyPage from "../pages/admin/EditCompanyPage";
import AvailabilitiesPage from "../pages/admin/AvailabilitiesPage";


export const rawRoutes = [
  {
    path: '/',
    element: <StorePage />
  },
  {
    path: "/totem",
    element: <HeroTemplate />,
    children: [
      {
        index: true,
        element: <HeroPage />,
      },
    ],
  },
  {
    path: "/totem/store",
    element: <StoreTemplate />,
    children: [
      {
        index: true,
        element: <StorePage />
      }
    ]
  },
  {
    path: "/totem/checkout",
    element: <CheckoutPage />,
    
  },
  {
    path: "/admin",
    element: <AdminTemplate />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: '/admin/availabilities',
        element: <AvailabilitiesPage />,
      },
      {
        path: '/admin/products',
        element: <ProductsPage />,
      },
      {
        path: '/admin/products/:id',
        element: <AddEditProductPage />,
      },
      {
        path: '/admin/products/add',
        element: <AddEditProductPage   />,
      },
      {
        path: '/admin/purchases',
        element: <PurchasesPage />,
      },
      {
        path: '/admin/cities',
        element: <CitiesPage />,
      },
      {
        path: '/admin/pos',
        element: <PosPage />,
      },
      {
        path: '/admin/totem-tour',
        element: <EditCompanyPage />,
      },
    ],
  },
]

export const routes = createBrowserRouter(rawRoutes);