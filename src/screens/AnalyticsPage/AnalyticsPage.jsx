import React from "react";
import { useEffect, useState, useMemo } from "react";
import api from "../../Api/Axios";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { DashboardSkeleton } from "../../components/skeleton";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Layout } from "../../components/Layout";

export const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [orderStats, setStatsCards] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const { t, i18n } = useTranslation();
  const [lowStockCount, setLowStockCount] = useState(0);
  
  // Sales chart states
  const [salesPeriod, setSalesPeriod] = useState("this_week");
  const [salesData, setSalesData] = useState([]);
  const [loadingSales, setLoadingSales] = useState(true);
  const [showSalesPeriodMenu, setShowSalesPeriodMenu] = useState(false);
  
  // Customer chart states
  const [customerData, setCustomerData] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  
  // Payment methods chart states
  const [paymentPeriod, setPaymentPeriod] = useState("this_month");
  const [paymentData, setPaymentData] = useState([]);
  const [loadingPayment, setLoadingPayment] = useState(true);
  const [showPaymentPeriodMenu, setShowPaymentPeriodMenu] = useState(false);
  
  // Orders chart states
  const [ordersPeriod, setOrdersPeriod] = useState("this_week");
  const [ordersData, setOrdersData] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [showOrdersPeriodMenu, setShowOrdersPeriodMenu] = useState(false);

  const CUSTOMER_COLORS = {
    "عملاء جدد": "#005b10",
    "عملاء نشطون": "#142898",
    "عملاء متكررون": "#ecd435",
    "غير نشطين": "#969595",
    "عملاء كبار": "#b009b3",
  };

  const PAYMENT_COLORS = {
    "Mada": "#805B3C",
    "STC Pay": "#4B0082",
    "Visa": "#1A1F71",
    "Apple Pay": "#000000",
    "Cash": "#28A745",
  };

  const CUSTOMER_TRANSLATIONS = {
    "عملاء جدد": t("customer_new"),
    "عملاء نشطون": t("customer_active"),
    "عملاء متكررون": t("customer_repeat"),
    "غير نشطين": t("customer_inactive"),
    "عملاء كبار": t("customer_vip"),
  };

  const renderPercentageLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="600"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  // Fetch Customer Stats
  useEffect(() => {
    const fetchCustomerStats = async () => {
      try {
        const res = await api.get("/api/vendor/statistics/client-types?periodType=this_month");

        if (res.data.success) {
          const raw = res.data.data.clientTypes;

          const mapped = Object.entries(raw).map(([name, value]) => ({
            name: CUSTOMER_TRANSLATIONS[name] || name,
            value,
            color: CUSTOMER_COLORS[name],
          }));

          setCustomerData(mapped);
        }
      } catch (err) {
        console.error("Failed to load customer stats", err);
      } finally {
        setLoadingCustomers(false);
      }
    };

    fetchCustomerStats();
  }, [t, i18n.language]);

  // Fetch Sales Stats
  useEffect(() => {
    const fetchSalesStats = async () => {
      setLoadingSales(true);
      try {
        const res = await api.get(`/api/vendor/statistics/sales-amount?periodType=${salesPeriod}`);

        if (res.data.success) {
          const rawData = res.data.data.totalSalesAmount;

          if (typeof rawData === "number") {
            setSalesData([{ name: t("today"), value: rawData }]);
          } else {
            const mapped = Object.entries(rawData).map(([key, value]) => ({
              name: key,
              value: value || 0,
            }));
            setSalesData(mapped);
          }
        }
      } catch (err) {
        console.error("Failed to load sales stats", err);
      } finally {
        setLoadingSales(false);
      }
    };

    fetchSalesStats();
  }, [salesPeriod, t]);

  // Fetch Payment Methods Stats
  useEffect(() => {
    const fetchPaymentStats = async () => {
      setLoadingPayment(true);
      setLoadingStats(true);
      try {
        const res = await api.get(`/api/vendor/statistics/payment-methods?periodType=${paymentPeriod}`);
        
        if (res.data.success) {
          setLoadingStats(false);
          const rawData = res.data.data.paymentMethods;

          const mapped = Object.entries(rawData).map(([name, value]) => ({
            name,
            value: value || 0,
            percentage: value,
          }));

          setPaymentData(mapped);
        }
      } catch (err) {
        console.error("Failed to load payment stats", err);
      } finally {
        setLoadingPayment(false);
      }
    };

    fetchPaymentStats();
  }, [paymentPeriod]);

  // Fetch Orders Stats
  useEffect(() => {
    const fetchOrdersStats = async () => {
      setLoadingOrders(true);
      try {
        const res = await api.get(`/api/vendor/statistics/orders?periodType=${ordersPeriod}`);

        if (res.data.success) {
          const rawData = res.data.data.totalOrders;

          if (typeof rawData === "number") {
            setOrdersData([{ name: t("today"), value: rawData }]);
          } else {
            const mapped = Object.entries(rawData).map(([key, value]) => ({
              name: key,
              value: value || 0,
            }));
            setOrdersData(mapped);
          }
        }
      } catch (err) {
        console.error("Failed to load orders stats", err);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrdersStats();
  }, [ordersPeriod, t]);

  const hasCustomerData = customerData.some(item => item.value > 0);
  const hasPaymentData = paymentData.some(item => item.value > 0);

  

  return (
    <Layout>
      { loadingStats && <DashboardSkeleton /> }
      <section className="w-full bg-[#faf9f7] p-6">
        <div className="flex flex-col gap-6 max-w-[1179px] mx-auto">

          {/* SALES + CUSTOMERS - Row 1 */}
          <div className="flex gap-6">

            {/* SALES CHART */}
            <Card className="w-[577px] bg-[#fefefe] rounded-[10px]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between w-full">
                  <h2 className="font-h-3">{t("sales_title")}</h2>
                  
                  <div className="relative">
                    <Button 
                      variant="outline" 
                      className="w-[154px] h-12 border-[#c3c3c3]"
                      onClick={() => setShowSalesPeriodMenu(!showSalesPeriodMenu)}
                    >
                      <div className="flex items-center gap-2">
                        <img className="w-6 h-6" src="/mage-filter.svg" />
                        <span className="font-medium text-[#4f4f4f] text-sm">
                          {salesPeriod === "this_week" && t("this_week")}
                          {salesPeriod === "this_month" && t("this_month")}
                          {salesPeriod === "this_day" && t("today")}
                        </span>
                        <img className="w-6 h-6" src="/arrow-right.svg" />
                      </div>
                    </Button>

                    {showSalesPeriodMenu && (
                      <div className="absolute top-14 left-0 w-[154px] bg-white border border-[#c3c3c3] rounded-[10px] shadow-lg z-10">
                        <div 
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
                          onClick={() => {
                            setSalesPeriod("this_day");
                            setShowSalesPeriodMenu(false);
                          }}
                        >
                          {t("today")}
                        </div>
                        <div 
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
                          onClick={() => {
                            setSalesPeriod("this_week");
                            setShowSalesPeriodMenu(false);
                          }}
                        >
                          {t("this_week")}
                        </div>
                        <div 
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
                          onClick={() => {
                            setSalesPeriod("this_month");
                            setShowSalesPeriodMenu(false);
                          }}
                        >
                          {t("this_month")}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <img className="w-6 h-6" src="/image-8.png" />
                    <h3 className="font-h4-medium">{t("sales_total")}</h3>
                  </div>
                </div>

                <div className="relative w-full h-[328px] mt-6">
                  {loadingSales ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      {t("loading")}
                    </div>
                  ) : salesData.length === 0 || salesData.every(d => d.value === 0) ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      {t("no_data")}
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                        <XAxis 
                          dataKey="name" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          tick={{ fill: '#4f4f4f', fontSize: 12 }}
                        />
                        <YAxis 
                          tick={{ fill: '#4f4f4f', fontSize: 12 }}
                          tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value} ر.س`, t("sales_value")]}
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #c3c3c3',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="#835f40"
                          radius={[8, 8, 0, 0]}
                          barSize={40}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>

              </CardContent>
            </Card>

            {/* CUSTOMERS CHART */}
            <Card className="w-[578px] bg-[#fefefe] rounded-[10px]">
              <CardContent className="p-6">

                <div className="flex justify-between w-full">
                  <h2 className="font-h-3">{t("customers_title")}</h2>
                </div>

                <div className="flex flex-col items-center mt-8">

                  <div className="relative w-[260px] h-[260px] flex items-center justify-center">
                    {loadingCustomers ? (
                      <span className="text-gray-400">{t("loading")}</span>
                    ) : !hasCustomerData ? (
                      <span className="text-gray-400">{t("no_data")}</span>
                    ) : (
                      <PieChart width={260} height={260}>
                        <Pie
                          data={customerData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={110}
                          paddingAngle={3}
                          stroke="none"
                          label={renderPercentageLabel}
                          labelLine={false}
                        >
                          {customerData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    )}
                  </div>

                  <div className="mt-6 w-full">
                    <div className="flex gap-4 flex-wrap justify-center">
                      {customerData.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-sm">{item.name}</span>
                          <div
                            className="w-4 h-4 rounded-lg"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </CardContent>
            </Card>

          </div>

          {/* PAYMENT METHODS + ORDERS - Row 2 */}
          <div className="flex gap-6">

            {/* PAYMENT METHODS CHART */}
            <Card className="w-[577px] bg-[#fefefe] rounded-[10px]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between w-full">
                  <h2 className="font-h-3">{t("payment_methods_title")}</h2>
                  
                  <div className="relative">
                    <Button 
                      variant="outline" 
                      className="w-[154px] h-12 border-[#c3c3c3]"
                      onClick={() => setShowPaymentPeriodMenu(!showPaymentPeriodMenu)}
                    >
                      <div className="flex items-center gap-2">
                        <img className="w-6 h-6" src="/mage-filter.svg" />
                        <span className="font-medium text-[#4f4f4f] text-sm">
                          {paymentPeriod === "this_week" && t("this_week")}
                          {paymentPeriod === "this_month" && t("this_month")}
                          {paymentPeriod === "this_day" && t("today")}
                        </span>
                        <img className="w-6 h-6" src="/arrow-right.svg" />
                      </div>
                    </Button>

                    {showPaymentPeriodMenu && (
                      <div className="absolute top-14 left-0 w-[154px] bg-white border border-[#c3c3c3] rounded-[10px] shadow-lg z-10">
                        <div 
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
                          onClick={() => {
                            setPaymentPeriod("this_day");
                            setShowPaymentPeriodMenu(false);
                          }}
                        >
                          {t("today")}
                        </div>
                        <div 
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
                          onClick={() => {
                            setPaymentPeriod("this_week");
                            setShowPaymentPeriodMenu(false);
                          }}
                        >
                          {t("this_week")}
                        </div>
                        <div 
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
                          onClick={() => {
                            setPaymentPeriod("this_month");
                            setShowPaymentPeriodMenu(false);
                          }}
                        >
                          {t("this_month")}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative w-full h-[328px] mt-6">
                  {loadingPayment ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      {t("loading")}
                    </div>
                  ) : !hasPaymentData ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      {t("no_data")}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 justify-center h-full px-4">
                      {paymentData.map((method, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <span className="text-sm font-medium w-20 text-right">{method.percentage}%</span>
                          <div className="flex-1 h-4 bg-[#e0e0e0] rounded-lg overflow-hidden relative">
                            <div 
                              className="h-full bg-[#805B3C] rounded-lg transition-all duration-500"
                              style={{ width: `${method.percentage}%`, height: '100%' }}
                            />
                          </div>
                          <div className="flex items-center gap-2 w-24">
                            {method.name === "Visa" && <img src="/visa-icon.png" alt="Visa" className="h-6" />}
                            {method.name === "Apple Pay" && <img src="/apple-pay-icon.png" alt="Apple Pay" className="h-6" />}
                            <span className="text-sm font-medium">{method.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </CardContent>
            </Card>

            {/* ORDERS LINE CHART */}
            <Card className="w-[578px] bg-[#fefefe] rounded-[10px]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between w-full">
                  <h2 className="font-h-3">{t("orders_title")}</h2>
                  
                  <div className="relative">
                    <Button 
                      variant="outline" 
                      className="w-[154px] h-12 border-[#c3c3c3]"
                      onClick={() => setShowOrdersPeriodMenu(!showOrdersPeriodMenu)}
                    >
                      <div className="flex items-center gap-2">
                        <img className="w-6 h-6" src="/mage-filter.svg" />
                        <span className="font-medium text-[#4f4f4f] text-sm">
                          {ordersPeriod === "this_week" && t("this_week")}
                          {ordersPeriod === "this_month" && t("this_month")}
                          {ordersPeriod === "this_day" && t("today")}
                        </span>
                        <img className="w-6 h-6" src="/arrow-right.svg" />
                      </div>
                    </Button>

                    {showOrdersPeriodMenu && (
                      <div className="absolute top-14 left-0 w-[154px] bg-white border border-[#c3c3c3] rounded-[10px] shadow-lg z-10">
                        <div 
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
                          onClick={() => {
                            setOrdersPeriod("this_day");
                            setShowOrdersPeriodMenu(false);
                          }}
                        >
                          {t("today")}
                        </div>
                        <div 
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
                          onClick={() => {
                            setOrdersPeriod("this_week");
                            setShowOrdersPeriodMenu(false);
                          }}
                        >
                          {t("this_week")}
                        </div>
                        <div 
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
                          onClick={() => {
                            setOrdersPeriod("this_month");
                            setShowOrdersPeriodMenu(false);
                          }}
                        >
                          {t("this_month")}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative w-full h-[328px] mt-6">
                  {loadingOrders ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      {t("loading")}
                    </div>
                  ) : ordersData.length === 0 || ordersData.every(d => d.value === 0) ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      {t("no_data")}
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={ordersData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                        <XAxis 
                          dataKey="name" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          tick={{ fill: '#4f4f4f', fontSize: 12 }}
                        />
                        <YAxis 
                          tick={{ fill: '#4f4f4f', fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => [value, t("orders_count")]}
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #c3c3c3',
                            borderRadius: '8px',
                          }}
                        />
                        <Line 
                          type="monotone"
                          dataKey="value" 
                          stroke="#805B3C"
                          strokeWidth={3}
                          dot={{ fill: '#805B3C', r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>

              </CardContent>
            </Card>

          </div>

        </div>
      </section>
    </Layout>
  );
};