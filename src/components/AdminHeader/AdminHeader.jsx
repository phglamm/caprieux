import { useState } from "react";
import { Menu, LogOut, User } from "lucide-react";
import logo from "../../assets/logo.png";

export default function AdminHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle sidebar"
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={logo} alt="logo" className="h-8 w-8 object-contain" />
            <span className="font-semibold text-gray-800">Caprieux Admin</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100">
            <User className="w-4 h-4 text-gray-700" />
            <span className="text-sm">Admin</span>
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <LogOut className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
