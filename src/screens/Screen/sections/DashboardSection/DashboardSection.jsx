import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useTranslation } from "react-i18next";
import { useEffect, useState , useMemo } from "react";
import api from "../../../../Api/Axios"; // axios instance اللي انت عامله
import { useNavigate } from "react-router-dom";
import { DashboardSkeleton } from "../../../../components/skeleton";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const DashboardSection = () => {
  const navigate = useNavigate()
  const [orderStats, setStatsCards] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const { t,i18n } = useTranslation();
  const [lowStockCount, setLowStockCount] = useState(0);
  const [salesPeriod, setSalesPeriod] = useState("this_week");
  const [salesData, setSalesData] = useState([]);
  const [loadingSales, setLoadingSales] = useState(true);
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);
  
  const [customerData, setCustomerData] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  
  const CUSTOMER_COLORS = {
    "عملاء جدد": "#005b10",
    "عملاء نشطون": "#142898",
    "عملاء متكررون": "#ecd435",
    "غير نشطين": "#969595",
    "عملاء كبار": "#b009b3",
  };

  const CUSTOMER_TRANSLATIONS = {
    "عملاء جدد": t("customer_new"),
    "عملاء نشطون": t("customer_active"),
    "عملاء متكررون": t("customer_repeat"),
    "غير نشطين": t("customer_inactive"),
    "عملاء كبار": t("customer_vip"),
  };

  const renderPercentageLabel = ({ percent, x, y }) => {
    if (percent < 0.05) return null; // hide very small slices (<5%)

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

  useEffect(() => {
    const fetchSalesStats = async () => {
      setLoadingSales(true);
      try {
        const res = await api.get(`/api/vendor/statistics/sales-amount?periodType=${salesPeriod}`);

        if (res.data.success) {
          const rawData = res.data.data.totalSalesAmount;

          // Handle different response formats
          if (typeof rawData === "number") {
            // this_day returns a single number
            setSalesData([{ name: t("today"), value: rawData }]);
          } else {
            // this_week or this_month returns an object
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

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await api.get("/api/vendor/orders/statistics");;

        if (res.data.success) {
          const cards = res.data.data.statistics.map((item) => {
            const ui = statisticsUIMap[item.type];

            return {
              ...ui,
              count: item.count,
            };
          });

          setStatsCards(cards);
        }
      } catch (error) {
        console.error("Failed to load order statistics", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStatistics();
  }, [i18n.language]);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const res = await api.get("/api/vendor/products/recent");

        if (res.data.success) {
          let lowStockCounter = 0;

          const mappedProducts = res.data.data.map((item) => {
            const isHidden = item.status === "SUSPENDED";
            const isLowStock = item.stockQuantity <= 400 && item.stockQuantity > 0;
            const isOutOfStock = item.stockQuantity === 0;

            if (isLowStock) {
              lowStockCounter++;
            }

            let status = "متوفر";
            let statusBg = "bg-emerald-50";
            let statusColor = "text-[#005b10]";
            let suggestion = "أضف 20 قطعة الي مخزونك";

            if (isHidden) {
              status = "مخفي";
              statusBg = "bg-[#f4f4f4]";
              statusColor = "text-[#4f4f4f]";
              suggestion = "المنتج مخفي من قبل المتجر";
            } else if (isOutOfStock) {
              status = "غير متوفر";
              statusBg = "bg-[#fff3f3]";
              statusColor = "text-[#b90000]";
              suggestion = "المنتج غير متوفر حاليًا";
            } else if (isLowStock) {
              status = "منخفض";
              statusBg = "bg-[#fff3f3]";
              statusColor = "text-[#b90000]";
              suggestion = "أضف كمية للمخزون";
            }

            return {
              image: "/203-1-11.png",
              name: item.name,
              id: `PRD-${item.id}`,
              category: item.categoryName,
              quantity: item.stockQuantity,
              minStock: 400,
              status,
              statusBg,
              statusColor,
              lastModified: new Date(item.createdAt).toLocaleDateString("ar-EG"),
              suggestion,
              isHidden,
              visibilityIcon: isHidden
                ? "/component-1-8.svg"
                : "/component-1.svg",
            };
          });

          setLowStockCount(lowStockCounter);
          console.log(lowStockCounter);
          
        }
      } catch (error) {
        console.error("Failed to load recent products", error);
      }
    };

    fetchRecentProducts();
  }, []);

  const statisticsUIMap = useMemo(() => ({
    NEW_ORDERS: {
      title: t("order_new_title"),
      unit: t("طلب"),
      bgColor: "bg-[#f4f4f4]",
      textColor: "text-[#4f4f4f]",
      iconBg: "bg-[#4f4f4f]",
      icon: "/mask-group-3.png",
    },
    ACTIVE_ORDERS: {
      title: t("order_active_title"),
      unit: t("طلب"),
      bgColor: "bg-[#fffcf3]",
      textColor: "text-[#926e00]",
      iconBg: "bg-[#ffc107]",
      icon: "/mask-group-5.png",
    },
    COMPLETED_ORDERS: {
      title: t("order_completed_title"),
      unit: t("طلب"),
      bgColor: "bg-emerald-50",
      textColor: "text-[#005b10]",
      iconBg: "bg-[#005b10]",
      icon: "/mask-group-6.png",
    },
    CANCELLED_ORDERS: {
      title: t("order_canceled_title"),
      unit: t("طلب"),
      bgColor: "bg-[#fff3f3]",
      textColor: "text-[#b90000]",
      iconBg: "bg-[#b90000]",
      icon: "/mask-group-4.png",
    },
  }), [t, i18n.language]);

  const hasData = customerData.some(item => item.value > 0);

  const customerLegendItems = [
    { label: t("customer_new"), color: "bg-[#005b10]" },
    { label: t("customer_active"), color: "bg-[#142898]" },
    { label: t("customer_repeat"), color: "bg-[#ecd435]" },
    { label: t("customer_inactive"), color: "bg-[#969595]" },
    { label: t("customer_vip"), color: "bg-[#b009b3]" },
  ];

  if (loadingStats) {
    return <DashboardSkeleton />;
  }
  
  return (
    <section className="w-full bg-[#faf9f7] p-6 ">
      <div className="flex flex-col gap-6 max-w-[1179px] mx-auto">

        {/* WARNING CARD */}
        <Card className="bg-[#fefefe] rounded-[10px] overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-start gap-4">
              <h2 className="font-h-3 text-[#1a1713]">{t("warning")}</h2>

              <div className="w-full bg-[#faf9f7] rounded-[10px] p-4">
                <div className="flex items-center justify-between gap-4">

                  <div className="flex flex-col items-start gap-2 max-w-[512px]">
                    <div className="flex items-center gap-2">
                      <h3 className="font-h4-medium text-[#1a1713]">
                        {t("low_stock_title")}
                      </h3>
                      <img className="w-10 h-10" src="/image-29.png" />
                    </div>

                    <p className="font-h-5 text-[#4f4f4f] text-right">
                      {t("low_stock_message_with_count", { count: lowStockCount })}
                    </p>

                  </div>

                  <Button onClick={() => navigate("/products")} className="w-[337px] h-14 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)]">
                    {t("low_stock_button")}
                  </Button>

                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* ORDERS */}
        <Card className="bg-[#fefefe] rounded-[10px]">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">

              <div className="flex items-center justify-between w-full">
                <h2 className="font-h-3">{t("orders_title")}</h2>
                <Button variant="outline" className="w-[154px] h-12 border-[#c3c3c3]">
                  <div className="flex items-center gap-2">
                    <img className="w-6 h-6" src="/mage-filter.svg" />
                    <span className="font-medium text-[#4f4f4f] text-sm">{t("this_week")}</span>
                    <img className="w-6 h-6" src="/arrow-right.svg" />
                  </div>
                </Button>
              </div>

              <div className="flex items-center gap-6">
                {loadingStats ? (
                  <div className="text-gray-500">جاري تحميل الإحصائيات...</div>
                ) : (
                  orderStats.map((card, index) => (
                    <div
                      key={index}
                      className={`${card.bgColor} rounded-[10px] overflow-hidden h-20 flex-1`}
                    >
                      <div className="flex items-center justify-center gap-3 p-4">
                        <div className="flex flex-col items-end justify-center gap-2">
                          <div className="font-h-5 text-[#1a1713]">
                            {card.title}
                          </div>

                          <div className="flex items-center gap-2">
                            <div className={`${card.textColor} text-2xl`}>
                              <span className="font-semibold">{card.count}</span>
                              <span className="text-base"> {card.unit}</span>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`${card.iconBg} flex w-11 h-11 items-center justify-center rounded-full rotate-180`}
                        >
                          <img
                            className="w-6 h-6 -rotate-180"
                            alt={card.title}
                            src={card.icon}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          </CardContent>
        </Card>

        {/* SALES + CUSTOMERS */}
        <div className="flex gap-6">

          {/* SALES */}
          <Card className="w-[577px] bg-[#fefefe] rounded-[10px]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between w-full">
                <h2 className="font-h-3">{t("sales_title")}</h2>
                
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="w-[154px] h-12 border-[#c3c3c3]"
                    onClick={() => setShowPeriodMenu(!showPeriodMenu)}
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

                  {showPeriodMenu && (
                    <div className="absolute top-14 left-0 w-[154px] bg-white border border-[#c3c3c3] rounded-[10px] shadow-lg z-10">
                      <div 
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
                        onClick={() => {
                          setSalesPeriod("this_day");
                          setShowPeriodMenu(false);
                        }}
                      >
                        {t("today")}
                      </div>
                      <div 
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
                        onClick={() => {
                          setSalesPeriod("this_week");
                          setShowPeriodMenu(false);
                        }}
                      >
                        {t("this_week")}
                      </div>
                      <div 
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
                        onClick={() => {
                          setSalesPeriod("this_month");
                          setShowPeriodMenu(false);
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
                          
                          // direction: 'rtl'
                        }}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="#835f40"
                        radius={[8, 8, 0, 0]}
                        barSize={15}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

            </CardContent>
          </Card>

          {/* CUSTOMERS */}
          <Card className="w-[578px] bg-[#fefefe] rounded-[10px]">
            <CardContent className="p-6">

              <div className="flex justify-between w-full">
                <h2 className="font-h-3">{t("customers_title")}</h2>

                {/* <Button variant="outline" className="w-[154px] h-12 border-[#c3c3c3]">
                  <div className="flex items-center gap-2">
                    <img className="w-6 h-6" src="/mage-filter.svg" />
                    <span className="font-medium text-[#4f4f4f] text-sm">{t("this_week")}</span>
                    <img className="w-6 h-6" src="/arrow-right.svg" />
                  </div>
                </Button> */}
              </div>

              <div className="flex flex-col items-center mt-8">

                <div className="relative w-[260px] h-[260px] flex items-center justify-center">
                  {loadingCustomers ? (
                    <span className="text-gray-400">{t("loading")}</span>
                  ) : !hasData ? (
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

                {/* LEGEND */}
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

      </div>
    </section>
  );
};