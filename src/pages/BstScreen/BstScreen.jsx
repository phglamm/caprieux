import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Calendar, Package, Sparkles } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { route } from "../../router";

export default function BstScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://caprieux-be.onrender.com/api/products"
        );
        if (mounted) {
          setProducts(response.data || []);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Failed to load products");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const imgSrc = (link) => {
    if (!link) return "/images/placeholder.png";
    return link;
  };

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

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f5e6d3] to-[#d4b896]">
      {/* Hero Section */}
      <section className="relative w-full bg-linear-to-br from-[#3d2817] via-[#5d4433] to-[#3d2817] py-24 lg:py-32 text-center text-[#f5e6d3] overflow-hidden">
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
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 px-6 lg:px-12 max-w-7xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl lg:text-7xl font-bold mb-6 drop-shadow-lg"
          >
            Bộ Sưu Tập Của Chúng Tôi
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl lg:text-2xl mb-10 opacity-95 leading-relaxed max-w-4xl mx-auto"
          >
            Khám phá những trang phục cao cấp, được tuyển chọn kỹ lưỡng
          </motion.p>
        </motion.div>
      </section>

      {/* Products Section */}
      <section className="w-full bg-[#f5e6d3] py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-2xl text-[#5d4433] font-semibold"
            >
              <Package className="w-16 h-16 mx-auto mb-4 text-[#d4af37] animate-pulse" />
              Đang tải sản phẩm...
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 text-red-600 text-xl"
            >
              <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 max-w-md mx-auto">
                <p className="font-bold mb-2">Lỗi tải dữ liệu</p>
                <p className="text-base">{error}</p>
              </div>
            </motion.div>
          )}

          {!loading && !error && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -10 }}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer group"
                >
                  <div className="h-80 bg-linear-to-br from-[#f5e6d3] to-[#d4b896] flex items-center justify-center overflow-hidden relative">
                    <img
                      src={imgSrc(product.imageLink)}
                      alt={product.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "/images/placeholder.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-[#3d2817]/0 group-hover:bg-[#3d2817]/20 transition-all duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[#3d2817] mb-3 group-hover:text-[#d4af37] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-[#5d4433] mb-4 text-sm leading-relaxed line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold text-[#3d2817]">
                        {formatPrice(product.price)}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-[#d4af37] fill-[#d4af37]"
                          />
                        ))}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 rounded-full bg-linear-to-r from-[#d4af37] to-[#b8941f] text-[#3d2817] font-bold shadow-lg flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-5 h-5" />
                      Xem Chi Tiết
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-2000 p-0 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 bg-[#3d2817] text-[#f5e6d3] rounded-full w-12 h-12 flex items-center justify-center z-50 hover:bg-[#5d4433] transition-colors shadow-xl"
                onClick={() => setSelectedProduct(null)}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Product Image */}
              <div className="bg-linear-to-br from-[#f5e6d3] to-[#d4b896] w-full h-150 flex items-center justify-center rounded-t-3xl overflow-hidden">
                <img
                  src={imgSrc(selectedProduct.imageLink)}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/placeholder.png";
                  }}
                />
              </div>

              <div className="p-8">
                {/* Title & Price */}
                <motion.h2
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl mb-4 text-[#3d2817] font-bold"
                >
                  {selectedProduct.title}
                </motion.h2>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-[#d4af37] fill-[#d4af37]"
                      />
                    ))}
                  </div>
                  <span className="text-[#5d4433]">5.0 (12 đánh giá)</span>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl font-bold text-[#d4af37] mb-6"
                >
                  {formatPrice(selectedProduct.price)}{" "}
                  <span className="text-lg font-normal text-[#5d4433]">
                    / 3 ngày
                  </span>
                </motion.div>

                {/* Short Description */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8"
                >
                  <h3 className="text-2xl font-bold text-[#3d2817] mb-3 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-[#d4af37]" />
                    Mô Tả
                  </h3>
                  <p className="text-[#5d4433] leading-relaxed text-lg">
                    {selectedProduct.shortDescription}
                  </p>
                </motion.div>

                {/* Product Details */}
                {selectedProduct.details && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                  >
                    {/* Basic Info */}
                    <div className="bg-linear-to-br from-[#f5e6d3] to-[#f9f3e8] p-6 rounded-2xl">
                      <h4 className="text-xl font-bold text-[#3d2817] mb-3 flex items-center gap-2">
                        <Package className="w-5 h-5 text-[#d4af37]" />
                        Thông Tin Cơ Bản
                      </h4>
                      <p className="text-[#5d4433] leading-relaxed">
                        {selectedProduct.details.basicInfo}
                      </p>
                    </div>

                    {/* Sizes */}
                    <div className="bg-linear-to-br from-[#f5e6d3] to-[#f9f3e8] p-6 rounded-2xl">
                      <h4 className="text-xl font-bold text-[#3d2817] mb-3">
                        Size
                      </h4>
                      <p className="text-[#5d4433] text-2xl font-bold">
                        {selectedProduct.details.sizes}
                      </p>
                    </div>

                    {/* Material */}
                    <div className="bg-linear-to-br from-[#f5e6d3] to-[#f9f3e8] p-6 rounded-2xl">
                      <h4 className="text-xl font-bold text-[#3d2817] mb-3">
                        Chất Liệu
                      </h4>
                      <p className="text-[#5d4433] leading-relaxed">
                        {selectedProduct.details.material}
                      </p>
                    </div>

                    {/* Care Instructions */}
                    <div className="bg-linear-to-br from-[#f5e6d3] to-[#f9f3e8] p-6 rounded-2xl">
                      <h4 className="text-xl font-bold text-[#3d2817] mb-3">
                        Hướng Dẫn Bảo Quản
                      </h4>
                      <p className="text-[#5d4433] leading-relaxed">
                        {selectedProduct.details.careInstructions}
                      </p>
                    </div>

                    {/* Measurements */}
                    {selectedProduct.details.measurements && (
                      <div className="bg-linear-to-br from-[#f5e6d3] to-[#f9f3e8] p-6 rounded-2xl md:col-span-2">
                        <h4 className="text-xl font-bold text-[#3d2817] mb-4">
                          Số Đo Chi Tiết
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(
                            selectedProduct.details.measurements
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="bg-white/50 p-3 rounded-xl"
                            >
                              <p className="text-sm text-[#5d4433] mb-1 capitalize">
                                {key === "length"
                                  ? "Dài"
                                  : key === "waist"
                                  ? "Eo"
                                  : key === "hip"
                                  ? "Hông"
                                  : key === "bust"
                                  ? "Ngực"
                                  : key === "shoulder"
                                  ? "Vai"
                                  : key === "sleeveLength"
                                  ? "Dài tay"
                                  : key === "width"
                                  ? "Rộng"
                                  : key === "height"
                                  ? "Cao"
                                  : key === "depth"
                                  ? "Sâu"
                                  : key === "inseam"
                                  ? "Dài trong"
                                  : key}
                              </p>
                              <p className="text-lg font-bold text-[#3d2817]">
                                {value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-4"
                >
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 40px rgba(212, 175, 55, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/payment/${selectedProduct._id}`)}
                    className="flex-1 py-5 rounded-full bg-linear-to-r from-[#d4af37] to-[#b8941f] text-white text-xl font-bold flex items-center justify-center gap-2 shadow-xl"
                  >
                    <Calendar className="w-6 h-6" />
                    Đặt Thuê Ngay
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
