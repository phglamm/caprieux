import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Calendar,
  Package,
  Sparkles,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductDetailScreen() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://caprieux-be.onrender.com/api/products/${productId}`
        );
        if (mounted) {
          setProduct(response.data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Failed to load product");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProduct();
    return () => {
      mounted = false;
    };
  }, [productId]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#f5e6d3] to-[#d4b896] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Package className="w-16 h-16 mx-auto mb-4 text-[#d4af37] animate-pulse" />
          <p className="text-2xl text-[#5d4433] font-semibold">
            Đang tải sản phẩm...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#f5e6d3] to-[#d4b896] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 max-w-md mx-auto">
            <p className="text-xl font-bold text-red-600 mb-4">
              Không thể tải thông tin sản phẩm
            </p>
            <p className="text-red-500 mb-6">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/bst")}
              className="px-6 py-3 bg-[#d4af37] text-white rounded-full font-bold"
            >
              Quay lại bộ sưu tập
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f5e6d3] to-[#d4b896]">
      {/* Hero Section */}
      <section className="relative w-full bg-linear-to-br from-[#3d2817] via-[#5d4433] to-[#3d2817] py-20 lg:py-28 text-center text-[#f5e6d3] overflow-hidden">
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
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/bst")}
            className="mb-6 inline-flex items-center gap-2 text-[#f5e6d3] hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg font-semibold">Quay lại</span>
          </motion.button>

          <motion.h1
            variants={itemVariants}
            className="text-4xl lg:text-6xl font-bold mb-4 drop-shadow-lg"
          >
            Chi Tiết Sản Phẩm
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg lg:text-xl opacity-95 leading-relaxed max-w-3xl mx-auto"
          >
            Khám phá thông tin chi tiết về sản phẩm
          </motion.p>
        </motion.div>
      </section>

      {/* Product Details Section */}
      <section className="w-full bg-[#f5e6d3] py-16 lg:py-20 px-6 lg:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden sticky top-6">
                <div className="bg-linear-to-br from-[#f5e6d3] to-[#d4b896] w-full h-[700px] flex items-center justify-center">
                  <img
                    src={imgSrc(product.imageLink)}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/placeholder.png";
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Product Information */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Title & Rating */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <motion.h2
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl mb-4 text-[#3d2817] font-bold"
                >
                  {product.title}
                </motion.h2>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl font-bold text-[#d4af37] mb-6"
                >
                  {formatPrice(product.price)}{" "}
                  <span className="text-lg font-normal text-[#5d4433]">
                    / 3 ngày
                  </span>
                </motion.div>

                {/* Action Button */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 40px rgba(212, 175, 55, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/payment/${product._id}`)}
                  className="w-full py-5 rounded-full bg-linear-to-r from-[#d4af37] to-[#b8941f] text-white text-xl font-bold flex items-center justify-center gap-2 shadow-xl"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Đặt Thuê Ngay
                </motion.button>
              </div>

              {/* Short Description */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <h3 className="text-2xl font-bold text-[#3d2817] mb-3 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#d4af37]" />
                  Mô Tả
                </h3>
                <p className="text-[#5d4433] leading-relaxed text-lg">
                  {product.shortDescription}
                </p>
              </motion.div>

              {/* Product Details */}
              {product.details && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-3xl shadow-xl p-8 space-y-6"
                >
                  <h3 className="text-2xl font-bold text-[#3d2817] mb-4 flex items-center gap-2">
                    <Package className="w-6 h-6 text-[#d4af37]" />
                    Thông Tin Chi Tiết
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="bg-linear-to-br from-[#f5e6d3] to-[#f9f3e8] p-6 rounded-2xl">
                      <h4 className="text-xl font-bold text-[#3d2817] mb-3 flex items-center gap-2">
                        <Package className="w-5 h-5 text-[#d4af37]" />
                        Thông Tin Cơ Bản
                      </h4>
                      <p className="text-[#5d4433] leading-relaxed">
                        {product.details.basicInfo}
                      </p>
                    </div>

                    {/* Sizes */}
                    <div className="bg-linear-to-br from-[#f5e6d3] to-[#f9f3e8] p-6 rounded-2xl">
                      <h4 className="text-xl font-bold text-[#3d2817] mb-3">
                        Size
                      </h4>
                      <p className="text-[#5d4433] text-2xl font-bold">
                        {product.details.sizes}
                      </p>
                    </div>

                    {/* Material */}
                    <div className="bg-linear-to-br from-[#f5e6d3] to-[#f9f3e8] p-6 rounded-2xl">
                      <h4 className="text-xl font-bold text-[#3d2817] mb-3">
                        Chất Liệu
                      </h4>
                      <p className="text-[#5d4433] leading-relaxed">
                        {product.details.material}
                      </p>
                    </div>

                    {/* Care Instructions */}
                    <div className="bg-linear-to-br from-[#f5e6d3] to-[#f9f3e8] p-6 rounded-2xl">
                      <h4 className="text-xl font-bold text-[#3d2817] mb-3">
                        Hướng Dẫn Bảo Quản
                      </h4>
                      <p className="text-[#5d4433] leading-relaxed">
                        {product.details.careInstructions}
                      </p>
                    </div>

                    {/* Measurements */}
                    {product.details.measurements && (
                      <div className="bg-linear-to-br from-[#f5e6d3] to-[#f9f3e8] p-6 rounded-2xl md:col-span-2">
                        <h4 className="text-xl font-bold text-[#3d2817] mb-4">
                          Số Đo Chi Tiết
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(product.details.measurements).map(
                            ([key, value]) => (
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
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Rental Terms */}
              {/* <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-linear-to-br from-[#3d2817] to-[#5d4433] rounded-3xl shadow-xl p-8 text-[#f5e6d3]"
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#d4af37]" />
                  Điều Khoản Thuê
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af37] font-bold mt-1">•</span>
                    <span>Thời gian thuê: 3 ngày</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af37] font-bold mt-1">•</span>
                    <span>Cọc trước: 30% giá trị đơn hàng</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af37] font-bold mt-1">•</span>
                    <span>Hoàn trả sản phẩm trong tình trạng ban đầu</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af37] font-bold mt-1">•</span>
                    <span>Miễn phí vận chuyển trong nội thành</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af37] font-bold mt-1">•</span>
                    <span>Hỗ trợ đổi size miễn phí trước ngày thuê</span>
                  </li>
                </ul>
              </motion.div> */}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
