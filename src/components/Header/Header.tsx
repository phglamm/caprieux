import React from "react";
import { motion } from "framer-motion";
import { Search, ShoppingBag, User, Heart } from "lucide-react";

interface HeaderProps {
  scrolled: boolean;
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ scrolled, activeSection }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#3d2817]/98 shadow-2xl backdrop-blur-sm"
          : "bg-gradient-to-r from-[#3d2817] to-[#5d4433] shadow-lg"
      }`}
      style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
    >
      <div className="w-full px-6 lg:px-12 py-6">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="text-3xl lg:text-4xl font-bold text-[#f5e6d3] tracking-[0.2em] cursor-pointer"
          >
            THE CAPRIEUX
          </motion.div>

          <nav className="flex gap-8 items-center">
            <div className="hidden lg:flex gap-8">
              {[
                "Trang Chủ",
                "Bộ Sưu Tập",
                "Cách Thuê",
                "Về Chúng Tôi",
                "Liên Hệ",
              ].map((item, idx) => (
                <motion.a
                  key={item}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.1, color: "#d4af37" }}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`text-[#f5e6d3] text-lg transition-all duration-300 pb-1 ${
                    activeSection === item.toLowerCase()
                      ? "border-b-2 border-[#d4af37]"
                      : ""
                  }`}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex gap-6 items-center">
              {[Search, Heart, ShoppingBag, User].map((Icon, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                  whileHover={{ scale: 1.25, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-6 h-6 text-[#f5e6d3] cursor-pointer hover:text-[#d4af37] transition-colors" />
                </motion.div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
