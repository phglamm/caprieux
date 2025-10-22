import { useState } from "react";
import { Menu, LogOut, User, Bell, Search } from "lucide-react";
import logo from "../../assets/logo.png";
export default function AdminHeader({ onToggleSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-100 shadow-sm">
      <div className="max-w-full mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Toggle sidebar"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <img src={logo} alt="" />
            </div>
            <span className="font-semibold text-gray-900 text-lg hidden sm:block">
              The Caprieux
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowNotifications(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Thông báo</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[
                      { title: "Đơn hàng mới", time: "2 phút trước" },
                      { title: "Sản phẩm sắp hết hàng", time: "1 giờ trước" },
                      { title: "Người dùng mới đăng ký", time: "3 giờ trước" },
                    ].map((notif, i) => (
                      <div
                        key={i}
                        className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
                      >
                        <p className="text-sm text-gray-900 font-medium">
                          {notif.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notif.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Menu */}
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-700 font-medium hidden sm:block">
              Quản trị
            </span>
          </button>

          {/* Logout */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <LogOut className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
