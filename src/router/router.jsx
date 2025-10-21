import { createBrowserRouter } from "react-router-dom";

import HomeScreen from "../pages/HomeScreen/HomeScreen";
import { route } from ".";
import Layout from "../layouts/Layout";
import PolicyScreen from "../pages/PolicyScreen/PolicyScreen";
import BstScreen from "../pages/BstScreen/BstScreen";
import ProductDetailScreen from "../pages/ProductDetailScreen/ProductDetailScreen";
import PaymentScreen from "../pages/PaymentScreen/PaymentScreen";
import OrderSuccessScreen from "../pages/OrderSuccessScreen/OrderSuccessScreen";
import OrderFailedScreen from "../pages/OrderFailedScreen/OrderFailedScreen";

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
    ],
  },
]);
