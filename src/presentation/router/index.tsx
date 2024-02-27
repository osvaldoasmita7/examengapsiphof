import { Navigate, createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { WelcomePage } from "../pages/WelcomePage";
import { iOptionNavLink } from "../../interfaces";
import { RegisterPage } from "../pages/RegisterPage";
import { ListPage } from "../pages/ListPage";

export const menuRoutes: iOptionNavLink[] = [
  {
    to: "/",
    title: "Bienvenido",
    description: "Página de bienvenido",
    component: <WelcomePage />,
  },
  {
    to: "/register",
    title: "Registro de proveedores",
    description: "Página de registro",
    component: <RegisterPage />,
  },
  {
    to: "/providers",
    title: "Lista de proveedores",
    description: "Página de proveedores",
    component: <ListPage />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      ...menuRoutes.map((router) => ({
        path: router.to,
        element: router.component,
      })),
      {
        path: "",
        element: <Navigate to={menuRoutes[0].to}></Navigate>,
      },
    ],
  },
]);
