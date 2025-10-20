import { Outlet } from "react-router-dom";
import "../styles/Layout.scss";
export default function UserLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
