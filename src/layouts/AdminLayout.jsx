import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-6 lg:p-10 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
