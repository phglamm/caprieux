import { NavLink } from "react-router-dom";
import {
  Home,
  Box,
  Users,
  Settings,
  FileText,
  HelpCircle,
  X,
} from "lucide-react";

const nav = [
  {
    name: "Dashboard",
    to: "/admin",
    icon: <Home className="w-5 h-5" />,
  },
  {
    name: "Products",
    to: "/admin/products",
    icon: <Box className="w-5 h-5" />,
  },
  {
    name: "Orders",
    to: "/admin/orders",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    name: "Users",
    to: "/admin/users",
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: "Settings",
    to: "/admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50 overflow-y-auto transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 flex flex-col`}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <span className="font-semibold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={() => onClose()}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <HelpCircle className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Need Help?
                </p>
                <p className="text-xs text-gray-600 mb-3">
                  Get support from our team
                </p>
                <button className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
