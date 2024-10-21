import { createBrowserRouter } from "react-router-dom";
import HeroTemplate from "../pages/templates/HeroTemplate";
import HeroPage from "../pages/Totem/HeroPage";
import StoreTemplate from "../pages/templates/StoreTemplate";
import StorePage from "../pages/Totem/StorePage";
import CheckoutPage from "../pages/Totem/CheckoutPage";
import AdminTemplate from "../pages/templates/AdminTemplate";
import DashboardPage from "../pages/admin/DashboardPage";
import ProductsPage from "../pages/admin/Products/ProductsPage";
import PurchasesPage from "../pages/admin/Purchases/PurchasesPage";
import CitiesPage from "../pages/admin/CitiesPage";
import AddEditProductPage from "../pages/admin/Products/AddEditProductPage";
import PosPage from "../pages/admin/PosPage";
import EditCompanyPage from "../pages/admin/EditCompanyPage";
import AvailabilitiesPage from "../pages/admin/AvailabilitiesPage";
import TotemsPage from "../pages/admin/Totems/TotemsPage";
import AddEditTotemPage from "../pages/admin/Totems/AddEditTotemPage";
import AddEditPurchasePage from "../pages/admin/Purchases/AddEditPurchasePage";
import UsersPage from "../pages/admin/users/UsersPage";
import AddEditUserPage from "../pages/admin/users/AddEditUserPage";


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
    path: "/totem/test",
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
        element: <PurchasesPage />,
      },
      {
        path: '/admin/dashboard',
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
        path: '/admin/purchases/:id',
        element: <AddEditPurchasePage />,
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
        path: '/admin/totems',
        element: <TotemsPage />,
      },
      {
        path: '/admin/totems/:id',
        element: <AddEditTotemPage />,
      },
      {
        path: '/admin/users',
        element: <UsersPage />,
      },
      {
        path: '/admin/users/:id',
        element: <AddEditUserPage />,
      },
      {
        path: '/admin/totems/add',
        element: <AddEditTotemPage />,
      },
      {
        path: '/admin/totem-tour',
        element: <EditCompanyPage />,
      },
    ],
  },
]

export const routes = createBrowserRouter(rawRoutes);