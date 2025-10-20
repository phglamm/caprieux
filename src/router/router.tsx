import { createBrowserRouter } from "react-router-dom";

import { route } from ".";
import HomeScreen from "../page/HomeScreen/HomeScreen";

export const router = createBrowserRouter([
  {
    path: route.home,
    element: <HomeScreen />,
  },
]);
