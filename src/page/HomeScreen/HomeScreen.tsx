import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ChevronRight,
  Calendar,
  Star,
  CheckCircle,
  Package,
  Shield,
  Award,
  TrendingUp,
  X,
  Sparkles,
  Heart,
  Search,
} from "lucide-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  rating: number;
  reviews: number;
}

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}

const HomeScreen: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const { scrollYProgress } = useScroll();

  // Sample Products Data
  const products: Product[] = [
    {
      id: 1,
      name: "Váy Đen Thanh Lịch",
      price: 150000,
      image: "👗",
      category: "Váy",
      available: true,
      rating: 4.8,
      reviews: 24,
    },
    {
      id: 2,
      name: "Váy Ren Vintage",
      price: 180000,
      image: "👗",
      category: "Váy",
      available: true,
      rating: 4.9,
      reviews: 31,
    },
    {
      id: 3,
      name: "Váy Mini Dự Tiệc",
      price: 120000,
      image: "👗",
      category: "Váy",
      available: false,
      rating: 4.7,
      reviews: 18,
    },
    {
      id: 4,
      name: "Set Blazer Cổ Điển",
      price: 200000,
      image: "🧥",
      category: "Bộ",
      available: true,
      rating: 5.0,
      reviews: 12,
    },
    {
      id: 5,
      name: "Váy Hoa Mùa Hè",
      price: 140000,
      image: "👗",
      category: "Váy",
      available: true,
      rating: 4.6,
      reviews: 28,
    },
    {
      id: 6,
      name: "Váy Dạ Hội Sang Trọng",
      price: 250000,
      image: "👗",
      category: "Váy Dạ Hội",
      available: true,
      rating: 4.9,
      reviews: 15,
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Minh Anh",
      text: "Dịch vụ tuyệt vời! Váy đẹp và chất lượng. Sẽ quay lại thuê tiếp.",
      rating: 5,
    },
    {
      id: 2,
      name: "Thanh Hà",
      text: "Giá cả hợp lý, quy trình thuê đơn giản. Rất hài lòng!",
      rating: 5,
    },
    {
      id: 3,
      name: "Phương Thảo",
      text: "Đồ đẹp như mới, giao hàng đúng hẹn. Rất đáng tin cậy!",
      rating: 5,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const scaleVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#f5e6d3] to-[#d4b896]"
      style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
    >
      {/* Header */}
      <Header scrolled={scrolled} activeSection={activeSection} />

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-[#3d2817] via-[#5d4433] to-[#3d2817] py-24 lg:py-32 text-center text-[#f5e6d3] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #f5e6d3 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        {/* Floating sparkles */}
        <motion.div
          animate={{ y: [-20, 0, -20] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%]"
        >
          <Sparkles className="w-8 h-8 text-[#d4af37] opacity-60" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-40 right-[15%]"
        >
          <Sparkles className="w-6 h-6 text-[#d4af37] opacity-40" />
        </motion.div>
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-20 left-[20%]"
        >
          <Sparkles className="w-10 h-10 text-[#d4af37] opacity-50" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 px-6 lg:px-12 max-w-7xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl lg:text-7xl font-bold mb-6 drop-shadow-lg"
          >
            Thời Trang Xa Xỉ, Cho Thuê
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl lg:text-2xl mb-10 opacity-95 leading-relaxed max-w-4xl mx-auto"
          >
            Trải nghiệm trang phục designer cao cấp không giới hạn. Thuê. Mặc.
            Lặp Lại.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex gap-6 justify-center flex-wrap"
          >
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 20px 40px rgba(212, 175, 55, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#d4af37] text-[#3d2817] px-12 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <span>Xem Bộ Sưu Tập</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: "#f5e6d3",
                color: "#3d2817",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-[#f5e6d3] px-12 py-4 rounded-full text-lg font-bold border-2 border-[#f5e6d3] transition-all duration-300"
            >
              Cách Thuê Đồ
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-[#f5e6d3] py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-5xl text-center mb-16 text-[#3d2817] font-bold"
          >
            Tại Sao Chọn The Caprieux?
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <Award className="w-12 h-12" />,
                title: "Chất Lượng Designer",
                desc: "Bộ sưu tập được tuyển chọn từ các thương hiệu cao cấp",
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: "Bảo Hiểm Toàn Diện",
                desc: "Mọi đơn thuê đều được bảo hiểm hư hỏng và mất mát",
              },
              {
                icon: <Package className="w-12 h-12" />,
                title: "Giao Hàng Dễ Dàng",
                desc: "Miễn phí giao hàng tận nơi & trả hàng tiện lợi",
              },
              {
                icon: <TrendingUp className="w-12 h-12" />,
                title: "Bền Vững",
                desc: "Giảm lãng phí thời trang, hướng tới nền kinh tế tuần hoàn",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={scaleVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-gradient-to-br from-white to-[#f9f3e8] p-10 rounded-3xl text-center shadow-xl cursor-pointer group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="text-[#d4af37] mb-4 flex justify-center"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl mb-3 text-[#3d2817] font-bold group-hover:text-[#d4af37] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#5d4433] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full bg-gradient-to-b from-[#e8dcc8] to-[#d4b896] py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-5xl text-center mb-16 text-[#3d2817] font-bold"
          >
            Bộ Sưu Tập Nổi Bật
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                variants={scaleVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setSelectedProduct(product)}
                className="bg-white rounded-3xl overflow-hidden shadow-xl cursor-pointer group"
              >
                <div className="relative bg-gradient-to-br from-[#f5e6d3] to-[#d4b896] h-80 flex items-center justify-center text-8xl overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.4 }}
                  >
                    {product.image}
                  </motion.div>
                  {!product.available && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 bg-[#3d2817] text-[#f5e6d3] px-4 py-2 rounded-full text-sm font-bold"
                    >
                      Đã Thuê
                    </motion.div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl text-[#3d2817] flex-1 font-bold group-hover:text-[#d4af37] transition-colors">
                      {product.name}
                    </h3>
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className="w-5 h-5 text-[#d4af37] cursor-pointer hover:fill-[#d4af37] transition-all duration-300" />
                    </motion.div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.2 }}>
                          <Star
                            className="w-4 h-4 text-[#d4af37]"
                            fill={
                              i < Math.floor(product.rating)
                                ? "#d4af37"
                                : "none"
                            }
                          />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-sm text-[#5d4433]">
                      {product.rating} ({product.reviews} đánh giá)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-[#3d2817] group-hover:text-[#d4af37] transition-colors">
                        {formatPrice(product.price)}
                      </div>
                      <div className="text-sm text-[#5d4433]">cho 3 ngày</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: product.available ? 1.1 : 1 }}
                      whileTap={{ scale: product.available ? 0.95 : 1 }}
                      className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all duration-300 ${
                        product.available
                          ? "bg-[#d4af37] text-white hover:bg-[#b8941f] hover:shadow-lg"
                          : "bg-gray-400 text-gray-700 cursor-not-allowed"
                      }`}
                      disabled={!product.available}
                    >
                      <Calendar className="w-4 h-4" />
                      {product.available ? "Đặt Ngay" : "Hết Hàng"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full bg-[#f5e6d3] py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-5xl mb-16 text-[#3d2817] font-bold"
          >
            Quy Trình Thuê Đơn Giản
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {[
              {
                step: "01",
                title: "Duyệt & Chọn",
                desc: "Chọn từ bộ sưu tập được tuyển chọn",
                icon: <Search className="w-10 h-10" />,
              },
              {
                step: "02",
                title: "Đặt Ngày",
                desc: "Chọn thời gian thuê trên lịch",
                icon: <Calendar className="w-10 h-10" />,
              },
              {
                step: "03",
                title: "Nhận & Mặc",
                desc: "Giao hàng tận nơi cho bạn",
                icon: <Package className="w-10 h-10" />,
              },
              {
                step: "04",
                title: "Trả Dễ Dàng",
                desc: "Trả tại cửa hàng hoặc đặt lịch lấy",
                icon: <CheckCircle className="w-10 h-10" />,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-[#3d2817] to-[#5d4433] text-[#f5e6d3] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                >
                  {item.icon}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0.2 }}
                  whileHover={{ opacity: 0.4, scale: 1.1 }}
                  className="absolute top-2 right-[20%] text-6xl font-bold text-[#d4af37] opacity-20"
                >
                  {item.step}
                </motion.div>
                <h3 className="text-2xl mb-3 text-[#3d2817] font-bold group-hover:text-[#d4af37] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[#5d4433] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-gradient-to-br from-[#3d2817] via-[#5d4433] to-[#3d2817] text-[#f5e6d3] py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-5xl mb-16 font-bold"
          >
            Khách Hàng Nói Gì
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                variants={scaleVariants}
                whileHover={{ scale: 1.05, borderColor: "#d4af37" }}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 cursor-pointer"
              >
                <div className="flex gap-1 mb-4 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-lg mb-4 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="font-bold text-[#d4af37]">— {testimonial.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-[#f5e6d3] py-20 lg:py-28 px-6 lg:px-12 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl mb-6 text-[#3d2817] font-bold"
          >
            Sẵn Sàng Nâng Tầm Phong Cách?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl mb-10 text-[#5d4433] leading-relaxed"
          >
            Tham gia cùng hàng trăm người yêu thời trang chọn sự xa xỉ bền vững
          </motion.p>
          <motion.button
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 20px 60px rgba(212, 175, 55, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-[#3d2817] px-12 py-5 rounded-full text-xl font-bold shadow-xl transition-all duration-300"
          >
            Khám Phá Bộ Sưu Tập
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[2000] p-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto relative"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 bg-[#3d2817] text-[#f5e6d3] rounded-full w-12 h-12 flex items-center justify-center z-10 hover:bg-[#5d4433] transition-colors"
                onClick={() => setSelectedProduct(null)}
              >
                <X className="w-6 h-6" />
              </motion.button>
              <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-[#f5e6d3] to-[#d4b896] h-96 flex items-center justify-center text-[12rem] rounded-t-3xl overflow-hidden"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {selectedProduct.image}
                </motion.div>
              </motion.div>
              <div className="p-8">
                <motion.h2
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl mb-4 text-[#3d2817] font-bold"
                >
                  {selectedProduct.name}
                </motion.h2>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      >
                        <Star
                          className="w-5 h-5 text-[#d4af37]"
                          fill={
                            i < Math.floor(selectedProduct.rating)
                              ? "#d4af37"
                              : "none"
                          }
                        />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-[#5d4433]">
                    {selectedProduct.rating} ({selectedProduct.reviews} đánh
                    giá)
                  </span>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl font-bold text-[#3d2817] mb-2"
                >
                  {formatPrice(selectedProduct.price)}{" "}
                  <span className="text-lg font-normal">/ 3 ngày</span>
                </motion.div>
                <motion.p
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-[#5d4433] mb-8 leading-relaxed text-lg"
                >
                  Bộ trang phục thanh lịch hoàn hảo cho mọi dịp đặc biệt. Được
                  tuyển chọn cẩn thận và vệ sinh chuyên nghiệp sau mỗi lần thuê.
                  Có sẵn nhiều kích cỡ.
                </motion.p>
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{
                    scale: selectedProduct.available ? 1.05 : 1,
                    boxShadow: selectedProduct.available
                      ? "0 10px 40px rgba(212, 175, 55, 0.4)"
                      : undefined,
                  }}
                  whileTap={{ scale: selectedProduct.available ? 0.95 : 1 }}
                  className={`w-full py-5 rounded-full text-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    selectedProduct.available
                      ? "bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                  disabled={!selectedProduct.available}
                >
                  <Calendar className="w-6 h-6" />
                  {selectedProduct.available
                    ? "Đặt Trang Phục Này"
                    : "Hiện Không Có Sẵn"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;
