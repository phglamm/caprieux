import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Calendar, Package, Sparkles, Search } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function BstScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // read searchTerm from query string (set by Header form)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const term = params.get("searchTerm") || "";
    setSearchQuery(term);
  }, [location.search]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const fetchProducts = async (search) => {
      try {
        const url = search
          ? `https://caprieux-be.onrender.com/api/products?searchTerm=${encodeURIComponent(
              search
            )}`
          : "https://caprieux-be.onrender.com/api/products";
        const response = await axios.get(url);
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

    // initial load without search
    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  // fetchProducts is also used by the search form handler below
  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const imgSrc = (link) => {
    if (!link) return "/images/placeholder.png";
    return link;
  };

  // products will be populated by initial fetch or API search
  // (removed client-side title filtering to rely on backend search)

  // perform API search whenever searchQuery changes (set from header via query param)
  useEffect(() => {
    let mounted = true;
    const doSearch = async () => {
      setSearchLoading(true);
      setSearchError(null);
      setLoading(true);
      try {
        const url = searchQuery
          ? `https://caprieux-be.onrender.com/api/products?searchTerm=${encodeURIComponent(
              searchQuery
            )}`
          : "https://caprieux-be.onrender.com/api/products";
        const resp = await axios.get(url);
        if (mounted) setProducts(resp.data || []);
      } catch (err) {
        if (mounted) setSearchError(err.message || "Search failed");
      } finally {
        if (mounted) {
          setSearchLoading(false);
          setLoading(false);
        }
      }
    };
    // trigger search on mount and when term changes
    doSearch();
    return () => {
      mounted = false;
    };
  }, [searchQuery]);

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

          {/* Search is in the Header; BstScreen reads ?searchTerm= from the URL and performs the fetch */}
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

          {/* Search loading / error */}
          {searchLoading && !loading && (
            <div className="text-center py-6 text-[#5d4433]">
              <Package className="w-12 h-12 mx-auto mb-2 text-[#d4af37] animate-pulse" />
              Đang tìm kiếm "{searchQuery}"...
            </div>
          )}

          {searchError && (
            <div className="text-center py-4 text-sm text-red-600">
              Lỗi tìm kiếm: {searchError}
            </div>
          )}

          {!loading && !error && (
            <>
              {products.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 col-span-full"
                >
                  <div className="bg-[#f9f3e8] border-2 border-[#d4b896] rounded-3xl p-8 max-w-md mx-auto">
                    <Package className="w-16 h-16 mx-auto mb-4 text-[#d4af37]" />
                    <p className="text-2xl font-bold text-[#3d2817] mb-2">
                      Không tìm thấy sản phẩm
                    </p>
                    <p className="text-[#5d4433]">
                      Không có sản phẩm nào phù hợp với từ khóa "{searchQuery}"
                    </p>
                  </div>
                </motion.div>
              ) : (
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
                      onClick={() => navigate(`/product/${product._id}`)}
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
            </>
          )}
        </div>
      </section>
    </div>
  );
}
