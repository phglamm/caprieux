import { NavLink } from "react-router-dom";
import { route } from "../../router";
import { Home, Layers, Box, Users, Settings, FileText } from "lucide-react";

const nav = [
  { name: "Dashboard", to: route.admin, icon: <Home className="w-4 h-4" /> },
  {
    name: "Products",
    to: route.admin + "/products",
    icon: <Box className="w-4 h-4" />,
  },
  {
    name: "Orders",
    to: route.admin + "/orders",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    name: "Users",
    to: route.admin + "/users",
    icon: <Users className="w-4 h-4" />,
  },
  {
    name: "Settings",
    to: route.admin + "/settings",
    icon: <Settings className="w-4 h-4" />,
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden lg:block">
      <div className="px-4 py-6">
        <nav className="space-y-1">
          {nav.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-gray-50 ` +
                (isActive ? "bg-gray-100 font-semibold" : "text-gray-700")
              }
            >
              <span className="text-gray-500">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
