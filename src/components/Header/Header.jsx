const Header = ({ scrolled, activeSection }) => (
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
            ].map((item) => (
              <motion.a
                key={item}
                whileHover={{ scale: 1.1, color: "#d4af37" }}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[#f5e6d3] text-lg transition-all duration-300"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  </motion.header>
);
export default Header;
