import { useState } from "react";
import { motion } from "framer-motion";
import { route } from "../../router";

const navigationItems = [
  { name: "Trang Chủ", href: route.home },
  { name: "Chính Sách", href: route.policy },
  { name: "Bộ Sưu Tập", href: route.bst },
  { name: "Về Chúng Tôi", href: route.aboutUs },
  { name: "Liên Hệ", href: route.contact },
];
const Header = ({ scrolled }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#3d2817]/98 shadow-2xl backdrop-blur-sm"
          : "bg-linear-to-r from-[#3d2817] to-[#5d4433] shadow-lg"
      }`}
    >
      <div className="w-full px-6 lg:px-12 py-6">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-3xl lg:text-4xl font-bold text-[#f5e6d3] tracking-[0.2em] cursor-pointer"
          >
            THE CAPRIEUX
          </motion.div>

          <nav className="flex gap-8 items-center">
            <div className="hidden lg:flex gap-8">
              {navigationItems.map((item) => (
                <motion.a
                  key={item.name}
                  whileHover={{ scale: 1.1, color: "#d4af37" }}
                  href={item.href}
                  className="text-[#f5e6d3] text-lg transition-all duration-300"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded-md bg-[#3d2817]/40 text-[#f5e6d3]"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-2000 bg-black/90 flex items-center justify-center p-6"
        >
          <div className="absolute top-6 right-6">
            <button
              onClick={() => setOpen(false)}
              className="p-3 rounded-full bg-white/10 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="space-y-6 text-center">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block text-2xl text-white font-semibold"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};
export default Header;
