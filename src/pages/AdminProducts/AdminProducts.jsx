import { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2, Save, X, Package } from "lucide-react";

const API_BASE = "https://caprieux-be.onrender.com";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({
    title: "",
    price: "",
    size: "",
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.get(`${API_BASE}/api/products`);
      setProducts(resp.data || []);
    } catch (err) {
      setError(err.message || "Lỗi khi tải sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xoá sản phẩm này?")) return;
    try {
      await axios.delete(`${API_BASE}/api/products/${id}`);
      setProducts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      alert("Xoá thất bại: " + (err.message || err));
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditValues({
      title: product.title,
      price: product.price,
      size: product.details?.sizes || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ title: "", price: "", size: "" });
  };

  const saveEdit = async (id) => {
    try {
      const payload = {
        title: editValues.title,
        price: Number(editValues.price),
        details: { sizes: editValues.size },
      };
      await axios.put(`${API_BASE}/api/products/${id}`, payload);
      setProducts((list) =>
        list.map((p) =>
          p._id === id
            ? {
                ...p,
                ...payload,
                details: { ...p.details, sizes: payload.details.sizes },
              }
            : p
        )
      );
      cancelEdit();
    } catch (err) {
      alert("Cập nhật thất bại: " + (err.message || err));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Quản lý sản phẩm
              </h1>
              <p className="text-slate-500 mt-1">{products.length} sản phẩm</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-500"></div>
            <p className="mt-4 text-slate-600">Đang tải sản phẩm...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <p className="text-red-800 font-medium">Lỗi: {error}</p>
            </div>
          </div>
        )}

        {/* Products Table */}
        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      STT
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Ảnh
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Tên sản phẩm
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Giá
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Kích cỡ
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {products.map((p, idx) => (
                    <tr
                      key={p._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-4">
                        <img
                          src={p.imageLink}
                          alt={p.title}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm border border-slate-200"
                        />
                      </td>
                      <td className="px-6 py-4">
                        {editingId === p._id ? (
                          <input
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            value={editValues.title}
                            onChange={(e) =>
                              setEditValues((v) => ({
                                ...v,
                                title: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          <span className="text-sm font-medium text-slate-900">
                            {p.title}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === p._id ? (
                          <input
                            className="w-32 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            value={editValues.price}
                            onChange={(e) =>
                              setEditValues((v) => ({
                                ...v,
                                price: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          <span className="text-sm font-semibold text-slate-900">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(p.price)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === p._id ? (
                          <input
                            className="w-32 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            value={editValues.size}
                            onChange={(e) =>
                              setEditValues((v) => ({
                                ...v,
                                size: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          <span className="text-sm text-slate-600">
                            {p.details?.sizes || "-"}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-end">
                          {editingId === p._id ? (
                            <>
                              <button
                                className="inline-flex items-center gap-1.5 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
                                onClick={() => saveEdit(p._id)}
                              >
                                <Save className="w-4 h-4" />
                                Lưu
                              </button>
                              <button
                                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors text-sm font-medium"
                                onClick={cancelEdit}
                              >
                                <X className="w-4 h-4" />
                                Huỷ
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors text-sm font-medium"
                                onClick={() => startEdit(p)}
                                title="Chỉnh sửa"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-sm font-medium"
                                onClick={() => handleDelete(p._id)}
                                title="Xoá"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {products.length === 0 && (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                  <Package className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">
                  Chưa có sản phẩm
                </h3>
                <p className="text-slate-500">
                  Bắt đầu thêm sản phẩm vào cửa hàng của bạn
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
