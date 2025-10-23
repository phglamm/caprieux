import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Package, X } from "lucide-react";
import orderService from "../../services/orderService";

export default function AdminOrderScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await orderService.getOrders();
      console.log("Fetched orders:", resp);
      setOrders(resp.data || []);
    } catch (err) {
      setError(err.message || "Lỗi khi tải đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // delete action intentionally removed per request

  const formatCurrency = (v) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(v);

  // Export orders to CSV (Excel-friendly with BOM)
  const exportToCSV = () => {
    if (!orders || orders.length === 0) {
      alert("Không có đơn hàng để xuất");
      return;
    }

    const headers = [
      "Mã đơn",
      "Khách hàng",
      "Số điện thoại",
      "Địa chỉ",
      "Sản phẩm",
      "Số lượng",
      "Tổng tiền",
      "Trạng thái",
      "Ngày tạo",
    ];

    const rows = orders.map((o) => [
      o.orderCode,
      o.fullName,
      o.phoneNumber,
      o.address,
      typeof o.product === "string" ? o.product : o.product?.title || "-",
      o.quantity,
      o.amount,
      o.status,
      new Date(o.createdAt).toLocaleString("vi-VN"),
    ]);

    const csvContent = [headers, ...rows]
      .map((r) =>
        r.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")
      )
      .join("\r\n");

    const bom = "\uFEFF";
    const blob = new Blob([bom + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `don-hang-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Quản lý đơn hàng
                </h1>
                <p className="text-slate-500 mt-1">{orders.length} đơn hàng</p>
              </div>
            </div>
            <div>
              <button
                className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors text-sm font-medium"
                onClick={exportToCSV}
              >
                Xuất Excel
              </button>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-500"></div>
            <p className="mt-4 text-slate-600">Đang tải đơn hàng...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <p className="text-red-800 font-medium">Lỗi: {error}</p>
            </div>
          </div>
        )}

        {/* Table */}
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
                      Mã đơn
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Khách hàng
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Số điện thoại
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Địa chỉ
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Sản phẩm
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Tổng tiền
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {orders.map((o, idx) => (
                    <tr
                      key={o._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {o.orderCode}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {o.fullName}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {o.phoneNumber}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {o.address}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {typeof o.product === "string"
                          ? o.product
                          : o.product?.title || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {o.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                        {formatCurrency(o.amount)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            o.status === "paid"
                              ? "bg-green-50 text-green-700"
                              : o.status === "cancelled"
                              ? "bg-red-50 text-red-700"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-end">
                          <button
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors text-sm font-medium"
                            title="Xem chi tiết"
                            onClick={() => {
                              setSelectedOrder(o);
                              setShowModal(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {/* delete removed per request */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty */}
            {orders.length === 0 && (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                  <Package className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">
                  Chưa có đơn hàng
                </h3>
                <p className="text-slate-500">
                  Đơn hàng sẽ hiển thị ở đây khi có giao dịch
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modal for order details */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl w-[95%] max-w-2xl p-6">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">Chi tiết đơn hàng</h3>
                <button
                  className="inline-flex items-center p-2 text-slate-600 hover:text-slate-900"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedOrder(null);
                  }}
                  aria-label="Đóng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-700">
                <div>
                  <span className="font-medium">Mã đơn: </span>
                  {selectedOrder.orderCode}
                </div>
                <div>
                  <span className="font-medium">Khách hàng: </span>
                  {selectedOrder.fullName}
                </div>
                <div>
                  <span className="font-medium">Số điện thoại: </span>
                  {selectedOrder.phoneNumber}
                </div>
                <div>
                  <span className="font-medium">Địa chỉ: </span>
                  {selectedOrder.address}
                </div>
                <div>
                  <span className="font-medium">Sản phẩm: </span>
                  {typeof selectedOrder.product === "string"
                    ? selectedOrder.product
                    : selectedOrder.product?.title || "-"}
                </div>
                <div>
                  <span className="font-medium">Số lượng: </span>
                  {selectedOrder.quantity}
                </div>
                <div>
                  <span className="font-medium">Tổng tiền: </span>
                  {formatCurrency(selectedOrder.amount)}
                </div>
                <div>
                  <span className="font-medium">Trạng thái: </span>
                  {selectedOrder.status}
                </div>
                <div>
                  <span className="font-medium">Ngày tạo: </span>
                  {new Date(selectedOrder.createdAt).toLocaleString("vi-VN")}
                </div>
              </div>

              <div className="mt-6 text-right">
                <button
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-md text-sm"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedOrder(null);
                  }}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
