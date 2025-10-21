import { createBrowserRouter } from "react-router-dom";

import HomeScreen from "../pages/HomeScreen/HomeScreen";
import { route } from ".";
import Layout from "../layouts/Layout";
import PolicyScreen from "../pages/PolicyScreen/PolicyScreen";
import BstScreen from "../pages/BstScreen/BstScreen";

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
    ],
  },
]);
