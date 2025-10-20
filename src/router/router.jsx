import { createBrowserRouter } from "react-router-dom";

import HomeScreen from "../pages/HomeScreen/HomeScreen";
import { route } from ".";
import Layout from "../layouts/Layout";

export const router = createBrowserRouter([
  {
    path: route.home,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
    ],
  },
]);
