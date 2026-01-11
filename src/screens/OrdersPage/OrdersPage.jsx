import React, { useState, useEffect, useMemo } from "react";
import { Layout } from "../../components/Layout";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  SearchIcon,
  SlidersHorizontalIcon,
  CalendarIcon,
  EyeIcon,
} from "lucide-react";
import api from "../../Api/Axios";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DashboardSkeleton } from "../../components/skeleton";
import { OrderDetailsModal } from "./OrderDetailsModal";

const tableHeaders = [
  "orders_th_id",
  "orders_th_customer",
  "orders_th_date",
  "orders_th_payment",
  "orders_th_total",
  "orders_th_status",
  "orders_th_actions",
];

const filterColumns = [
  { key: "id", label: "filters.id" },
  { key: "customer", label: "filters.customer" },
  { key: "date", label: "filters.date" },
  { key: "payment", label: "filters.payment" },
  { key: "total", label: "filters.total" },
  { key: "status", label: "filters.status" },
];


const initialOrders = [
  {
    id: "ORD-00001",
    customer: "أحمد علي",
    date: "2026-01-01",
    payment: "VISA",
    total: "1000 ر.س",
    status: "تم الاستلام",
    statusColor: "bg-[#f7f1ea] text-[#5a2c00]",
  },
  {
    id: "ORD-00002",
    customer: "محمد حسن",
    date: "2026-01-02",
    payment: "MasterCard",
    total: "2000 ر.س",
    status: "جاري التجهيز",
    statusColor: "bg-[#ebf1fc] text-[#00154c]",
  },
  {
    id: "ORD-00003",
    customer: "سارة محمد",
    date: "2026-01-03",
    payment: "STC Pay",
    total: "1500 ر.س",
    status: "تم التوصيل",
    statusColor: "bg-emerald-50 text-[#005b10]",
  },
];

export const OrdersPage = () => {
  const { t } = useTranslation();

  const [orders, setOrders] = useState(initialOrders);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeColumns, setActiveColumns] = useState(
    filterColumns.map((c) => c.key)
  );

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/api/vendor/orders");
        if (response.data.success && response.data.data.orders) {
          const mappedOrders = response.data.data.orders.map((o) => ({
            id: o.orderNumber,
            customer: o.customerName,
            date: new Date(o.submissionDate).toISOString().split("T")[0],
            payment: o.paymentWay,
            total: `${o.totalCost.toLocaleString()} ر.س`,
            status: o.state,
            statusColor: getStatusColor(o.state),
          }));
          setOrders(mappedOrders);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Map status to badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case "تم الاستلام":
        return "bg-[#f7f1ea] text-[#5a2c00]";
      case "تم الالغاء":
        return "bg-[#f5e4e4] text-[#b90000]";
      case "جاري التجهيز":
        return "bg-[#ebf1fc] text-[#00154c]";
      case "تم التوصيل":
        return "bg-emerald-50 text-[#005b10]";
      case "جاري التوصيل":
        return "bg-[#f7eeea] text-[#9a3b00]";
      case "تم الشحن":
        return "bg-[#fcfde2] text-[#424707]";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // Filtered orders based on search, active columns, and date range
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Column search
      const matchesSearch = activeColumns.some((colKey) => {
        const value = order[colKey]?.toString() || "";
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      });
      if (!matchesSearch) return false;

      // Date filter
      if (startDate && endDate) {
        const orderDate = new Date(order.date);
        if (orderDate < startDate || orderDate > endDate) return false;
      }

      return true;
    });
  }, [orders, searchTerm, activeColumns, startDate, endDate]);

  if (loading)
    return (
      <Layout>
        <DashboardSkeleton />
      </Layout>
    );

  return (
    <Layout>
      <div className="flex min-h-screen bg-white">
        <main className="flex-1 flex flex-col p-6 gap-6">
          {/* ================= SEARCH & FILTER ================= */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 px-3 py-4 rounded-[10px] border border-solid border-[#c3c3c3] w-[500px]">
              <SearchIcon className="w-6 h-6" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("orders_search_placeholder")}
                className="border-0 text-sm w-full"
              />
            </div>

            {/* Filter dropdown */}
            <div className="relative">
              {filterOpen && (
                <div className="absolute top-16 right-0 bg-white rounded-2xl shadow-xl border border-[#f1f2f4] p-4 w-64 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-[#1a1713]">
                      {t("products.filterBy")}
                    </h4>
                    <span className="text-xs text-[#805b3c] font-medium">
                      {activeColumns.length} {t("products.selected")}
                    </span>
                  </div>
                  <div className="h-px bg-[#f1f2f4] mb-3" />
                  <div className="flex flex-col gap-2">
                    {filterColumns.map((col) => {
                      const checked = activeColumns.includes(col.key);
                      return (
                        <label
                          key={col.key}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
                          ${checked ? "bg-[#faf7f4]" : "hover:bg-[#fafafa]"}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              if (checked) {
                                setActiveColumns((prev) =>
                                  prev.filter((c) => c !== col.key)
                                );
                              } else {
                                setActiveColumns((prev) => [...prev, col.key]);
                              }
                            }}
                            className="accent-[#805b3c] w-4 h-4"
                          />
                          <span className="text-sm text-[#1a1713]">
                            {t(col.label)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() =>
                        setActiveColumns(filterColumns.map((c) => c.key))
                      }
                      className="text-xs text-[#805b3c] hover:underline"
                    >
                      {t("products.selectAll")}
                    </button>
                    <button
                      onClick={() => setActiveColumns([])}
                      className="text-xs text-[#b90000] hover:underline"
                    >
                      {t("products.clear")}
                    </button>
                  </div>
                </div>
              )}
              <Button
                variant="outline"
                size="icon"
                className={`w-14 h-14 rounded-[10px] relative ${
                  filterOpen || activeColumns.length !== filterColumns.length
                    ? "bg-[#faf7f4]"
                    : "hover:bg-[#f4f4f4]"
                }`}
                onClick={() => setFilterOpen((prev) => !prev)}
              >
                <img
                  className="w-12"
                  alt="Filter"
                  src="/frame-1984081823.svg"
                />
                {activeColumns.length !== filterColumns.length && (
                  <span className="absolute -top-1 -right-1 bg-[#805b3c] text-white text-[10px] rounded-full px-2 py-[2px]">
                    {activeColumns.length}
                  </span>
                )}
              </Button>
            </div>

            {/* Date picker */}
            <div className="flex items-center gap-2 px-3 py-4 rounded-[10px] border border-solid border-[#c3c3c3] w-[300px]">
              <CalendarIcon className="w-6 h-6" />
              <DatePicker
                selected={startDate}
                onChange={(dates) => {
                  const [start, end] = dates;
                  setStartDate(start);
                  setEndDate(end);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                isClearable
                placeholderText={t("orders_date_label")}
                className="w-full border-0 text-sm"
              />
            </div>
          </div>

          {/* ================= ORDERS TABLE ================= */}
          {filteredOrders.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {t("orders_no_orders_message") || "لا توجد طلبات للعرض"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-[#f3f3f3]">
                  <tr>
                    {tableHeaders.map((header, idx) => (
                      <th
                        key={idx}
                        className="h-12 text-center border-l border-[#f1f2f4]"
                      >
                        {t(header)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 1 ? "bg-[#f2f2f2]" : ""}
                    >
                      <td className="h-14 text-center border">{order.id}</td>
                      <td className="h-14 text-center border">{order.customer}</td>
                      <td className="h-14 text-center border">{order.date}</td>
                      <td className="h-14 text-center border">{order.payment}</td>
                      <td className="h-14 text-center border">{order.total}</td>
                      <td className="h-14 text-center border">
                        <Badge
                          className={`${order.statusColor} h-8 px-2 py-2 rounded-[10px]`}
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="h-14 text-center border">
                        <Button
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsDetailsOpen(true);
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <EyeIcon className="w-6 h-6" /> {t("orders_action_view")}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>

        {/* Order Details Modal */}
        {isDetailsOpen && selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => {
              setIsDetailsOpen(false);
              setSelectedOrder(null);
            }}
          />
        )}
      </div>
    </Layout>
  );
};
