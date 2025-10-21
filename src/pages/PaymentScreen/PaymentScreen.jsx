import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Package,
  User,
  Phone,
  MapPin,
  CreditCard,
  ArrowLeft,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PaymentScreen() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    quantity: 1,
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    let mounted = true;

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

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Vui lòng nhập họ tên";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Số điện thoại không hợp lệ";
    }

    if (!formData.address.trim()) {
      errors.address = "Vui lòng nhập địa chỉ";
    }

    if (formData.quantity < 1) {
      errors.quantity = "Số lượng phải lớn hơn 0";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted");
    console.log("Form data:", formData);

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    setSubmitting(true);
    console.log("Starting API call...");

    try {
      const requestBody = {
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        fullName: formData.fullName,
        productId: productId,
        quantity: parseInt(formData.quantity),
      };

      console.log("Request body:", requestBody);

      const response = await axios.post(
        "https://caprieux-be.onrender.com/api/payments/create-payment-link",
        requestBody
      );

      console.log("API response:", response.data);

      // Redirect to payment link
      if (response.data && response.data.checkoutUrl) {
        console.log("Redirecting to:", response.data.paymentUrl);
        window.location.href = response.data.checkoutUrl;
      } else {
        console.log("No payment URL in response");
        alert("Không nhận được link thanh toán từ server");
      }
    } catch (err) {
      console.error("API error:", err);
      console.error("Error response:", err.response);
      alert(
        "Có lỗi xảy ra khi tạo đơn hàng: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setSubmitting(false);
    }
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
            Đang tải thông tin...
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
            Hoàn Tất Đơn Hàng
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg lg:text-xl opacity-95 leading-relaxed max-w-3xl mx-auto"
          >
            Vui lòng điền thông tin để hoàn tất đặt thuê
          </motion.p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-[#f5e6d3] py-16 lg:py-20 px-6 lg:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Summary */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-6">
                <div className="bg-linear-to-br from-[#3d2817] to-[#5d4433] p-6">
                  <h2 className="text-2xl font-bold text-[#f5e6d3] mb-2 flex items-center gap-2">
                    <Package className="w-6 h-6 text-[#d4af37]" />
                    Thông Tin Sản Phẩm
                  </h2>
                </div>

                <div className="p-6">
                  {/* Product Image */}
                  <div className="bg-linear-to-br from-[#f5e6d3] to-[#d4b896] rounded-2xl overflow-hidden mb-6">
                    <img
                      src={imgSrc(product.imageLink)}
                      alt={product.title}
                      className="w-full h-80 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/images/placeholder.png";
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <h3 className="text-2xl font-bold text-[#3d2817] mb-3">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-[#d4af37] fill-[#d4af37]"
                        />
                      ))}
                    </div>
                    <span className="text-[#5d4433] text-sm">
                      5.0 (12 đánh giá)
                    </span>
                  </div>

                  <p className="text-[#5d4433] mb-6 leading-relaxed">
                    {product.shortDescription}
                  </p>

                  {/* Price Section */}
                  <div className="bg-linear-to-br from-[#f5e6d3] to-[#f9f3e8] rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[#5d4433] font-semibold">
                        Giá thuê (3 ngày)
                      </span>
                      <span className="text-2xl font-bold text-[#3d2817]">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[#5d4433] font-semibold">
                        Số lượng
                      </span>
                      <span className="text-xl font-bold text-[#3d2817]">
                        {formData.quantity}
                      </span>
                    </div>

                    <div className="border-t-2 border-[#d4b896] pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-[#3d2817]">
                          Tổng cộng
                        </span>
                        <span className="text-3xl font-bold text-[#d4af37]">
                          {formatPrice(product.price * formData.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-linear-to-br from-[#3d2817] to-[#5d4433] p-6">
                  <h2 className="text-2xl font-bold text-[#f5e6d3] mb-2 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-[#d4af37]" />
                    Thông Tin Khách Hàng
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="flex items-center gap-2 text-[#3d2817] font-semibold mb-2">
                      <User className="w-5 h-5 text-[#d4af37]" />
                      Họ và Tên
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        formErrors.fullName
                          ? "border-red-300 bg-red-50"
                          : "border-[#d4b896] bg-[#f9f3e8]"
                      } focus:outline-none focus:border-[#d4af37] transition-colors text-[#3d2817]`}
                    />
                    {formErrors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="flex items-center gap-2 text-[#3d2817] font-semibold mb-2">
                      <Phone className="w-5 h-5 text-[#d4af37]" />
                      Số Điện Thoại
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        formErrors.phoneNumber
                          ? "border-red-300 bg-red-50"
                          : "border-[#d4b896] bg-[#f9f3e8]"
                      } focus:outline-none focus:border-[#d4af37] transition-colors text-[#3d2817]`}
                    />
                    {formErrors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="flex items-center gap-2 text-[#3d2817] font-semibold mb-2">
                      <MapPin className="w-5 h-5 text-[#d4af37]" />
                      Địa Chỉ
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        formErrors.address
                          ? "border-red-300 bg-red-50"
                          : "border-[#d4b896] bg-[#f9f3e8]"
                      } focus:outline-none focus:border-[#d4af37] transition-colors text-[#3d2817] resize-none`}
                    />
                    {formErrors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.address}
                      </p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="flex items-center gap-2 text-[#3d2817] font-semibold mb-2">
                      <Package className="w-5 h-5 text-[#d4af37]" />
                      Số Lượng
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="1"
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        formErrors.quantity
                          ? "border-red-300 bg-red-50"
                          : "border-[#d4b896] bg-[#f9f3e8]"
                      } focus:outline-none focus:border-[#d4af37] transition-colors text-[#3d2817]`}
                    />
                    {formErrors.quantity && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.quantity}
                      </p>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="bg-linear-to-br from-[#f5e6d3] to-[#f9f3e8] rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-[#d4af37] shrink-0 mt-1" />
                      <div className="text-[#5d4433] text-sm leading-relaxed">
                        <p className="font-semibold mb-2">
                          Điều khoản thuê sản phẩm:
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Thời gian thuê: 3 ngày</li>
                          <li>Cọc trước: 30% giá trị đơn hàng</li>
                          <li>Hoàn trả sản phẩm trong tình trạng ban đầu</li>
                          <li>Miễn phí vận chuyển trong nội thành</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={!submitting ? { scale: 1.02 } : {}}
                    whileTap={!submitting ? { scale: 0.98 } : {}}
                    className={`w-full py-4 rounded-full ${
                      submitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-linear-to-r from-[#d4af37] to-[#b8941f]"
                    } text-white text-xl font-bold shadow-xl flex items-center justify-center gap-2`}
                  >
                    {submitting ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-6 h-6" />
                        Thanh Toán Ngay
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-[#5d4433] text-sm">
                    Bạn sẽ được chuyển đến trang thanh toán an toàn
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
