const Footer = () => (
  <footer
    className="w-full bg-gradient-to-r from-[#3d2817] to-[#5d4433] text-[#f5e6d3] py-16 px-6 lg:px-12"
    style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
  >
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <h3 className="text-3xl mb-4 text-[#d4af37] font-bold">
            THE CAPRIEUX
          </h3>
          <p className="opacity-90 leading-relaxed">
            Tiên phong trong cho thuê thời trang xa xỉ bền vững tại TP. Hồ Chí
            Minh từ năm 2025.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-[#d4af37] text-xl font-bold">Chính Sách</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#d4af37] transition-colors">
                Điều Khoản Thuê
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#d4af37] transition-colors">
                Chính Sách Bảo Mật
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#d4af37] transition-colors">
                Chính Sách Hư Hỏng
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-[#d4af37] text-xl font-bold">Liên Hệ</h4>
          <p className="leading-relaxed">
            📍 TP. Hồ Chí Minh, Việt Nam
            <br />
            📧 hello@thecaprieux.vn
            <br />
            📱 +84 xxx xxx xxx
          </p>
        </div>
      </div>
      <div className="text-center mt-12 pt-8 border-t border-white/20">
        <p>© 2025 The Caprieux. Bảo lưu mọi quyền.</p>
      </div>
    </div>
  </footer>
);
export default Footer;
