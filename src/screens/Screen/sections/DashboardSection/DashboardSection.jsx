import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useTranslation } from "react-i18next";
import { useEffect, useState , useMemo } from "react";
import api from "../../../../Api/axios"; // axios instance اللي انت عامله
import { useNavigate } from "react-router-dom";



export const DashboardSection = () => {
  const navigate = useNavigate()
  const [orderStats, setStatsCards] = useState([]);
const [loadingStats, setLoadingStats] = useState(true);
  const { t,i18n } = useTranslation();
  const [lowStockCount, setLowStockCount] = useState(0);


  // const orderStats = [
  //   {
  //     title: t("order_new_title"),
  //     count: "5000",
  //     description: t("order_new_desc"),
  //     bgColor: "bg-[#f3f5fe]",
  //     iconBg: "bg-[#2205a2]",
  //     textColor: "text-[#2205a2]",
  //     icon: "/mask-group-6.png",
  //   },
  //   {
  //     title: t("order_active_title"),
  //     count: "6000",
  //     description: t("order_active_desc"),
  //     bgColor: "bg-[#fffcf4]",
  //     iconBg: "bg-[#1a1713]",
  //     textColor: "text-[#926e00]",
  //     icon: "/mask-group-5.png",
  //   },
  //   {
  //     title: t("order_completed_title"),
  //     count: "9000",
  //     description: t("order_completed_desc"),
  //     bgColor: "bg-emerald-50",
  //     iconBg: "bg-[#005b10]",
  //     textColor: "text-[#005b10]",
  //     icon: "/mask-group-4.png",
  //   },
  //   {
  //     title: t("order_canceled_title"),
  //     count: "100",
  //     description: t("order_canceled_desc"),
  //     bgColor: "bg-[#fff3f3]",
  //     iconBg: "bg-[#b90000]",
  //     textColor: "text-[#b90000]",
  //     icon: "/mask-group-3.png",
  //   },
  // ];

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

        // setProducts(mappedProducts);
        setLowStockCount(lowStockCounter);
        console.log(lowStockCounter);
        
      }
    } catch (error) {
      console.error("Failed to load recent products", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  fetchRecentProducts();
}, []);



//   const statisticsUIMap = {
//   NEW_ORDERS: {
//     title: "طلبات جديدة",
//     unit: "طلب",
//     bgColor: "bg-[#f4f4f4]",
//     textColor: "text-[#4f4f4f]",
//     iconBg: "bg-[#4f4f4f]",
//     icon: "/mask-group-3.png",
//   },
//   ACTIVE_ORDERS: {
//     title: "طلبات نشطة",
//     unit: "طلب",
//     bgColor: "bg-[#fffcf3]",
//     textColor: "text-[#926e00]",
//     iconBg: "bg-[#ffc107]",
//     icon: "/mask-group-5.png",
//   },
//   COMPLETED_ORDERS: {
//     title: "طلبات مكتملة",
//     unit: "طلب",
//     bgColor: "bg-emerald-50",
//     textColor: "text-[#005b10]",
//     iconBg: "bg-[#005b10]",
//     icon: "/mask-group-6.png",
//   },
//   CANCELLED_ORDERS: {
//     title: "طلبات ملغاة",
//     unit: "طلب",
//     bgColor: "bg-[#fff3f3]",
//     textColor: "text-[#b90000]",
//     iconBg: "bg-[#b90000]",
//     icon: "/mask-group-4.png",
//   },
// };

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


  const customerLegendItems = [
    { label: t("customer_new"), color: "bg-[#005b10]" },
    { label: t("customer_active"), color: "bg-[#142898]" },
    { label: t("customer_repeat"), color: "bg-[#ecd435]" },
    { label: t("customer_inactive"), color: "bg-[#969595]" },
    { label: t("customer_vip"), color: "bg-[#b009b3]" },
  ];

  const yAxisLabels = ["+1000", "+9000", "+8000", "+7000", "+6000", "+5000", "+4000", "+3000", "+2000", "+1000"];

  const xAxisLabels = [
    t("saturday"),
    t("friday"),
    t("thursday"),
    t("wednesday"),
    t("tuesday"),
    t("monday"),
    t("sunday"),
  ];

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

                  <Button  onClick={() => navigate("/products")} className="w-[337px] h-14 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)]">
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
              <h2 className="font-h-3">{t("sales_title")}</h2>

              <div className="flex gap-64 mt-4">
                <div className="flex items-center gap-2">
                  <img className="w-6 h-6" src="/image-8.png" />
                  <h3 className="font-h4-medium">{t("sales_total")}</h3>
                </div>
              </div>

              <div className="relative w-[474px] h-[328px] mt-6">
                {/* chart layers ... (unchanged) */}

                <div className="absolute top-10 left-[131px]">
                  <div className="absolute top-2 left-10">
                    <div className="flex">
                      <span>26/9/2025</span>
                      <span>{t("sales_day")} :</span>
                    </div>

                    <div>
                      <span>{t("sales_value")}</span>
                      <span className="text-[#835f40]">20.000 ر.س</span>
                    </div>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* CUSTOMERS */}
          <Card className="w-[578px] bg-[#fefefe] rounded-[10px]">
            <CardContent className="p-6">

              <div className="flex justify-between w-full">
                <h2 className="font-h-3">{t("customers_title")}</h2>

                <Button variant="outline" className="w-[154px] h-12 border-[#c3c3c3]">
                  <div className="flex items-center gap-2">
                    <img className="w-6 h-6" src="/mage-filter.svg" />
                    <span className="font-medium text-[#4f4f4f] text-sm">{t("this_week")}</span>
                    <img className="w-6 h-6" src="/arrow-right.svg" />
                  </div>
                </Button>
              </div>

              <div className="flex flex-col items-center mt-8">

                <div className="relative w-[260px] h-[260px]">
                  <img src="/chart.png" className="absolute w-full h-full" />
                </div>

                <div className="mt-6 w-full">
                  <div className="flex gap-4">
                    {customerLegendItems.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span>{item.label}</span>
                        <div className={`${item.color} w-4 h-4 rounded-lg`} />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-3">
                    {customerLegendItems.slice(3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span>{item.label}</span>
                        <div className={`${item.color} w-4 h-4 rounded-lg`} />
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
