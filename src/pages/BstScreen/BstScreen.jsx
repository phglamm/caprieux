import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Calendar,
  Package,
  Sparkles,
  SlidersHorizontal,
  X,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import productService from "../../services/productService";

export default function BstScreen() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // Read searchTerm from query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const term = params.get("searchTerm") || "";
    setSearchQuery(term);
  }, [location.search]);

  // Initial fetch
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productService.getAllProducts();
        setProducts(response.data || []);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search when query changes
  useEffect(() => {
    const doSearch = async () => {
      setLoading(true);
      setSearchError(null);
      try {
        // const url = searchQuery
        //   ? `https://caprieux-be.onrender.com/api/products?searchTerm=${encodeURIComponent(
        //       searchQuery
        //     )}`
        //   : "https://caprieux-be.onrender.com/api/products";

        const resp = searchQuery
          ? await productService.searchProducts(searchQuery)
          : await productService.getAllProducts();
        console.log("Search response:", resp);
        setProducts(resp.data || []);
      } catch (err) {
        setSearchError(err.message || "Search failed");
      } finally {
        setLoading(false);
      }
    };
    doSearch();
  }, [searchQuery]);

  // Extract unique sizes and brands from products
  const availableSizes = [
    ...new Set(products.map((p) => p.details?.sizes).filter(Boolean)),
  ];
  const availableBrands = [
    ...new Set(products.map((p) => p.brand).filter(Boolean)),
  ];

  // Apply filters whenever products or filter states change
  useEffect(() => {
    let filtered = [...products];

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) =>
        selectedSizes.includes(p.details?.sizes)
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) =>
        selectedBrands.some(
          (brand) => p.brand?.toLowerCase() === brand.toLowerCase()
        )
      );
    }

    setFilteredProducts(filtered);
  }, [products, priceRange, selectedSizes, selectedBrands]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const imgSrc = (link) => {
    if (!link) return "/images/placeholder.png";
    return link;
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 20000000]);
    setSelectedSizes([]);
    setSelectedBrands([]);
  };

  const hasActiveFilters =
    priceRange[0] > 0 ||
    priceRange[1] < 20000000 ||
    selectedSizes.length > 0 ||
    selectedBrands.length > 0;

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
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6d3] to-[#d4b896]">
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
          {/* Filter Toggle Button */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#3d2817]">
              {filteredProducts.length} sản phẩm
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-[#3d2817] text-[#f5e6d3] rounded-full font-semibold shadow-lg"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Bộ Lọc
              {hasActiveFilters && (
                <span className="bg-[#d4af37] text-[#3d2817] px-2 py-1 rounded-full text-xs">
                  {selectedSizes.length +
                    selectedBrands.length +
                    (priceRange[0] > 0 || priceRange[1] < 20000000 ? 1 : 0)}
                </span>
              )}
            </motion.button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-8"
              >
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-[#3d2817]">
                      Lọc Sản Phẩm
                    </h3>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-[#d4af37] hover:text-[#b8941f] font-semibold flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Xóa Bộ Lọc
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Price Filter */}
                    <div>
                      <h4 className="font-bold text-[#3d2817] mb-4">Giá</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-[#5d4433] mb-2 block">
                            Từ: {formatPrice(priceRange[0])}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="20000000"
                            step="50000"
                            value={priceRange[0]}
                            onChange={(e) =>
                              setPriceRange([
                                Number(e.target.value),
                                priceRange[1],
                              ])
                            }
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-[#5d4433] mb-2 block">
                            Đến: {formatPrice(priceRange[1])}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="20000000"
                            step="50000"
                            value={priceRange[1]}
                            onChange={(e) =>
                              setPriceRange([
                                priceRange[0],
                                Number(e.target.value),
                              ])
                            }
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Size Filter */}
                    <div>
                      <h4 className="font-bold text-[#3d2817] mb-4">Kích Cỡ</h4>
                      <div className="flex flex-wrap gap-2">
                        {availableSizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => toggleSize(size)}
                            className={`px-4 py-2 rounded-full font-semibold transition-all ${
                              selectedSizes.includes(size)
                                ? "bg-[#d4af37] text-[#3d2817]"
                                : "bg-[#f5e6d3] text-[#5d4433] hover:bg-[#d4b896]"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Brand Filter */}
                    <div>
                      <h4 className="font-bold text-[#3d2817] mb-4">
                        Thương Hiệu
                      </h4>
                      <div className="space-y-2">
                        {availableBrands.map((brand) => (
                          <label
                            key={brand}
                            className="flex items-center gap-3 cursor-pointer hover:bg-[#f5e6d3] p-2 rounded-lg transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand)}
                              onChange={() => toggleBrand(brand)}
                              className="w-5 h-5 accent-[#d4af37]"
                            />
                            <span className="text-[#5d4433] font-medium capitalize">
                              {brand}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-2xl text-[#5d4433] font-semibold"
            >
              <Package className="w-16 h-16 mx-auto mb-4 text-[#d4af37] animate-pulse" />
              {searchQuery
                ? `Đang tìm kiếm sản phẩm "${searchQuery}"...`
                : "Đang tải sản phẩm..."}
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

          {searchError && (
            <div className="text-center py-4 text-sm text-red-600">
              Lỗi tìm kiếm: {searchError}
            </div>
          )}

          {!loading && !error && (
            <>
              {filteredProducts.length === 0 ? (
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
                      {searchQuery
                        ? `Không có sản phẩm nào phù hợp với từ khóa "${searchQuery}"`
                        : "Không có sản phẩm nào phù hợp với bộ lọc"}
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
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      // variants={itemVariants}
                      // whileHover={{ scale: 1.03, y: -10 }}
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer group"
                    >
                      <div className="h-80 bg-gradient-to-br from-[#f5e6d3] to-[#d4b896] flex items-center justify-center overflow-hidden relative">
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
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-[#3d2817] font-bold shadow-lg flex items-center justify-center gap-2"
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
