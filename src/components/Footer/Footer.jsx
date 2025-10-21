import { Mail, Phone, MapPin, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="w-full bg-linear-to-r from-[#3d2817] to-[#5d4433] text-[#f5e6d3] py-16 px-6 lg:px-12">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
        <div className="space-y-4">
          <h3 className="text-3xl text-[#d4af37] font-bold">THE CAPRIEUX</h3>
          <p className="opacity-90 leading-relaxed">
            Tiên phong trong cho thuê thời trang xa xỉ bền vững tại TP. Hồ Chí
            Minh từ năm 2025.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-2xl text-[#d4af37] font-bold">Khám Phá</h4>
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

        <div className="space-y-4">
          <h4 className="text-2xl text-[#d4af37] font-bold">Liên Hệ</h4>
          <ul className="space-y-3 text-sm leading-relaxed">
            <li>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#d4af37]" aria-hidden />
                <span>141 Điện Biên Phủ, Phường Gia Định,</span>
              </div>
              <span className="ml-[12%]">TP Hồ Chí Minh</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#d4af37]" aria-hidden />
              <a
                href="mailto:hello@thecaprieux.vn"
                className="hover:text-[#d4af37]"
              >
                hello@thecaprieux.vn
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#d4af37]" aria-hidden />
              <a href="tel:+84" className="hover:text-[#d4af37]">
                +84 xxx xxx xxx
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-2xl text-[#d4af37] font-bold">Theo Dõi</h4>
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-[#d4af37] transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-[#d4af37] transition-colors"
            >
              {/* lucide doesn't have a branded Facebook icon by default; use generic Insta as placeholder or an SVG if needed */}
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 1.86 6.48 1.86 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H8.36v-2.9h3.94V9.02c0-3.9 2.33-6.04 5.9-6.04 1.71 0 3.5.31 3.5.31v3.85h-1.97c-1.94 0-2.54 1.2-2.54 2.43v2.25h4.32l-.69 2.9h-3.63v7.03c4.78-.8 8.44-4.94 8.44-9.93z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-12 pt-8 border-t border-white/20">
        <p>© 2025 The Caprieux</p>
      </div>
    </div>
  </footer>
);

export default Footer;
