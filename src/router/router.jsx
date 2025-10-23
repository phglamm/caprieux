import { createBrowserRouter, Navigate } from "react-router-dom";

import HomeScreen from "../pages/HomeScreen/HomeScreen";
import { route } from ".";
import Layout from "../layouts/Layout";
import ServicesScreen from "../pages/ServicesScreen/ServicesScreen";
import AdminLayout from "../layouts/AdminLayout";
import PolicyScreen from "../pages/PolicyScreen/PolicyScreen";
import BstScreen from "../pages/BstScreen/BstScreen";
import ProductDetailScreen from "../pages/ProductDetailScreen/ProductDetailScreen";
import PaymentScreen from "../pages/PaymentScreen/PaymentScreen";
import OrderSuccessScreen from "../pages/OrderSuccessScreen/OrderSuccessScreen";
import OrderFailedScreen from "../pages/OrderFailedScreen/OrderFailedScreen";
import AboutUsScreen from "../pages/AboutUsScreen/AboutUsScreen";
import AdminOrderScreen from "../pages/AdminOrderScreen/AdminOrderScreen";
import AdminProducts from "../pages/AdminProducts/AdminProducts";
import LoginScreen from "../pages/LoginScreen/LoginScreen";
import CartScreen from "../pages/CartScreen/CartScreen";
import RegisterScreen from "../pages/RegisterScreen/RegisterScreen";

export const router = createBrowserRouter([
  {
    path: route.home,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: route.policy,
        element: <PolicyScreen />,
      },
      {
        path: route.bst,
        element: <BstScreen />,
      },
      {
        path: route.productDetail,
        element: <ProductDetailScreen />,
      },
      {
        path: route.payment,
        element: <PaymentScreen />,
      },
      {
        path: route.orderSuccess,
        element: <OrderSuccessScreen />,
      },
      {
        path: route.orderFailed,
        element: <OrderFailedScreen />,
      },
      {
        path: route.aboutUs,
        element: <AboutUsScreen />,
      },
      {
        path: route.service,
        element: <ServicesScreen />,
      },
      {
        path: route.cart,
        element: <CartScreen />,
      },
      {
        path: route.login,
        element: <LoginScreen />,
      },
      {
        path: route.register,
        element: <RegisterScreen />,
      },
    ],
  },

  {
    path: route.admin,
    element: <AdminLayout />,
    children: [
      {
        path: route.adminProducts,
        element: <AdminProducts />,
      },
      {
        path: route.adminOrders,
        element: <AdminOrderScreen />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={route.home} />,
  },
]);
