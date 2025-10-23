import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Box,
  FileText,
  Settings,
  X,
  ChevronRight,
} from "lucide-react";

const nav = [
  {
    name: "Sản phẩm",
    to: "/admin",
    icon: <Box className="w-5 h-5" />,
    badge: "12",
  },
  {
    name: "Đơn hàng",
    to: "/admin/orders",
    icon: <FileText className="w-5 h-5" />,
    badge: "5",
    badgeColor: "bg-red-500",
  },
  {
    name: "Cài đặt",
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 flex flex-col shadow-lg lg:shadow-none`}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-gray-900">Menu</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/50 transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <div className="mb-2">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Menu chính
            </p>
          </div>
          {nav.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={() => onClose()}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3 flex-1">
                    <span className={isActive ? "scale-110" : ""}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : item.badgeColor
                            ? `${item.badgeColor} text-white`
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
