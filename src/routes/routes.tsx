import { createBrowserRouter } from "react-router-dom";
import HeroTemplate from "../pages/templates/HeroTemplate";
import HeroPage from "../pages/Totem/HeroPage";
import StoreTemplate from "../pages/templates/StoreTemplate";
import StorePage from "../pages/Totem/StorePage";
import CheckoutPage from "../pages/Totem/CheckoutPage";
import AdminTemplate from "../pages/templates/AdminTemplate";
import DashboardPage from "../pages/admin/DashboardPage";
import ProductsPage from "../pages/admin/ProductsPage";
import PurchasesPage from "../pages/admin/PurchasesPage";
import CitiesPage from "../pages/admin/CitiesPage";


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
        path: '/admin/products',
        element: <ProductsPage />,
      },
      {
        path: '/admin/purchases',
        element: <PurchasesPage />,
      },
      {
        path: '/admin/cities',
        element: <CitiesPage />,
      },
    ],
  },
]

export const routes = createBrowserRouter(rawRoutes);