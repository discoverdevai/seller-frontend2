import React, { useState, useEffect } from "react";
import api from "../../Api/axios";
import { Layout } from "../../components/Layout";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Table , TableBody , TableFooter ,TableCaption,TableHeader , TableCell ,TableRow , TableHead } from "../../components/ui/table";
import {
  BellIcon,
  CalendarIcon,
  Edit2Icon,
  EyeIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  UserIcon,
} from "lucide-react";

import { useTranslation } from "react-i18next";
import { OrderDetailsModal } from "./OrderDetailsModal";


// ... Badge, Button, Table components, Tabs, TabsTrigger remain the same

const navigationItems = [
  { icon: "/home.svg", alt: "Home" },
  { icon: "/mask-group.png", alt: "Mask group" },
  { icon: "/mask-group-1.png", alt: "Mask group" },
  { icon: "/mask-group-2.png", alt: "Mask group", active: true },
  { icon: "/chart.svg", alt: "Chart" },
  { icon: "/presention-chart-style7.svg", alt: "Presention chart" },
];

const tabItems = [
  { label: "orders_tabs_all", value: "all" },
  { label: "orders_tabs_new", value: "new" },
  { label: "orders_tabs_preparing", value: "preparing" },
  { label: "orders_tabs_shipping", value: "shipping" },
  { label: "orders_tabs_completed", value: "completed" },
  { label: "orders_tabs_cancelled", value: "cancelled" },
];

const tableHeaders = [
  "orders_th_id",
  "orders_th_customer",
  "orders_th_date",
  "orders_th_payment",
  "orders_th_total",
  "orders_th_status",
  "orders_th_actions",
];

// Tabs components (place this at the top of the file, after imports)
function Tabs({ defaultValue, children }) {
  const [active, setActive] = useState(defaultValue);
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { activeTab: active, setActiveTab: setActive })
  );
}

function TabsList({ children }) {
  return <div className="flex gap-3">{children}</div>;
}

function TabsTrigger({ value, children, activeTab, setActiveTab, className }) {
  const isActive = activeTab === value;
  return (
    <div
      onClick={() => setActiveTab(value)}
      className={`${className} cursor-pointer ${isActive ? "border-b-2 border-[#835f40]" : ""}`}
    >
      {children}
    </div>
  );
}

 const initialOrders = [
  {
    id: "ORD-00001",
    customer: "أحمد علي",
    date: "01-01-2026",
    payment: "VISA",
    total: "1000 ر.س",
    status: "تم الاستلام",
    statusColor: "bg-[#f7f1ea] text-[#5a2c00]",
  },
  {
    id: "ORD-00002",
    customer: "محمد حسن",
    date: "02-01-2026",
    payment: "MasterCard",
    total: "2000 ر.س",
    status: "جاري التجهيز",
    statusColor: "bg-[#ebf1fc] text-[#00154c]",
  },
  {
    id: "ORD-00003",
    customer: "سارة محمد",
    date: "03-01-2026",
    payment: "STC Pay",
    total: "1500 ر.س",
    status: "تم التوصيل",
    statusColor: "bg-emerald-50 text-[#005b10]",
  },
];


export const OrdersPage = () => {
  const { t } = useTranslation();
 


  const [orders, setOrders] = useState(initialOrders);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/api/vendor/orders");
        if (response.data.success && response.data.data.orders) {
          // Map API response to table structure
          const mappedOrders = response.data.data.orders.map((o) => ({
            id: o.orderNumber,
            customer: o.customerName,
            date: new Date(o.submissionDate).toLocaleDateString("ar-EG"), // Format date
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

  // Function to map order state to badge color
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

  return (
    <Layout>
      <div className="flex min-h-screen bg-white">
        <main className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="bg-[#faf9f7] h-[58px] flex items-center justify-start px-6">
            <Tabs defaultValue="all">
              <TabsList>
                {tabItems.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="flex flex-col items-center gap-0.5">
                    <div className="p-2"> {t(tab.label)}</div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Orders Table */}
          <div className="flex flex-col gap-8 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-6 px-3 py-4 rounded-[10px] border border-solid border-[#c3c3c3] w-[501px]">
                  <SearchIcon className="w-6 h-6" />
                  <div className="flex items-center gap-2">
                    <div className="font-[number:var(--placeholder-font-weight)] text-[#4f4f4f] text-[length:var(--placeholder-font-size)] leading-[var(--placeholder-line-height)] font-placeholder tracking-[var(--placeholder-letter-spacing)] whitespace-nowrap">
                      {t("orders_search_placeholder")}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="icon" className="w-14 h-14 rounded-[10px]">
                  <SlidersHorizontalIcon className="w-6 h-6" />
                </Button>
              </div>
              <div className="flex items-center gap-6 px-3 py-4 rounded-[10px] border border-solid border-[#c3c3c3] w-[269px]">
                <div className="flex items-center gap-2">
                  <div className="font-[number:var(--h-5-font-weight)] text-[#1a1713] text-[length:var(--h-5-font-size)] leading-[var(--h-5-line-height)] font-h-5 tracking-[var(--h-5-letter-spacing)] whitespace-nowrap">
                    {t("orders_date_label")}
                  </div>
                  <CalendarIcon className="w-6 h-6" />
                </div>
              </div>
            </div>

          {loading ? (
  <div>Loading orders...</div>
) : orders.length === 0 ? (
  <div className="text-center text-gray-500 py-8">
    {t("orders_no_orders_message") || "لا توجد طلبات للعرض"}
  </div>
) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f3f3f3]">
                    {tableHeaders.map((header, index) => (
                      <TableHead key={index} className="h-12 text-center border-l border-[#f1f2f4]">
                        {t(header)}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  
                  {orders.map((order, index) => (
                    <TableRow key={index} className={index % 2 === 1 ? "bg-[#f2f2f2]" : ""}>
                      <TableCell className="h-14 text-center border border-[#f1f2f4]">{order.id}</TableCell>
                      <TableCell className="h-14 text-center border border-[#f1f2f4]">{order.customer}</TableCell>
                      <TableCell className="h-14 text-center border border-[#f1f2f4]">{order.date}</TableCell>
                      <TableCell className="h-14 text-center border border-[#f1f2f4]">{order.payment}</TableCell>
                      <TableCell className="h-14 text-center border border-[#f1f2f4]">{order.total}</TableCell>
                      <TableCell className="h-14 text-center border border-[#f1f2f4]">
                        <Badge className={`${order.statusColor} h-8 px-2 py-2 rounded-[10px]`}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="h-14 text-center border border-[#f1f2f4]">
                        <div className="flex items-center justify-center gap-4">
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
                          {/* <Button variant="ghost" size="sm">
                            <Edit2Icon className="w-6 h-6" /> {t("orders_action_edit")}
                          </Button> */}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </main>
      </div>

      {isDetailsOpen && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </Layout>
  );
};
