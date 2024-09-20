import { createBrowserRouter } from "react-router-dom";
import HeroTemplate from "../pages/templates/HeroTemplate";
import HeroPage from "../pages/HeroPage";
import StoreTemplate from "../pages/templates/StoreTemplate";
import StorePage from "../pages/StorePage";


export const rawRoutes = [
  {
    path: "/",
    element: <HeroTemplate />,
    children: [
      {
        index: true,
        element: <HeroPage />,
      },
    ],
    
  },
  {
    path: '/store',
    element: <StoreTemplate />,
    children: [
      {
        index: true,
        element: <StorePage />
      }
    ]
  }
]

export const routes = createBrowserRouter(rawRoutes);