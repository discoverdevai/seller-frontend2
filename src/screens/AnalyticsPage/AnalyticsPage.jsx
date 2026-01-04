import {
  BellIcon,
  CalendarIcon,
  ChevronRightIcon,
  FilterIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Layout } from "../../components/Layout";

export const AnalyticsPage = () => {
  const { t } = useTranslation();

  // Navigation items (no translation needed - icons only)
  const navigationItems = [
    { icon: "/home.svg", active: false },
    { icon: "/mask-group.png", active: false },
    { icon: "/mask-group-1.png", active: false },
    { icon: "/mask-group-2.png", active: false },
    { icon: "/chart-1.svg", active: true },
    { icon: "/presention-chart-style7.svg", active: false },
  ];

  // Order stats with translation keys
  const orderStats = [
    {
      titleKey: "analytics_new_orders",
      countKey: "analytics_new_orders_count",
      descriptionKey: "analytics_new_orders_desc",
      icon: "/mask-group-6.png",
      bgColor: "bg-emerald-50",
      iconBgColor: "bg-[#005b10]",
      trendIcon: "/trend-up.svg",
    },
    {
      titleKey: "analytics_active_orders",
      countKey: "analytics_active_orders_count",
      descriptionKey: "analytics_active_orders_desc",
      icon: "/mask-group-5.png",
      bgColor: "bg-[#f3f5fe]",
      iconBgColor: "bg-[#0a26a5]",
      trendIcon: "/trend-up.svg",
    },
    {
      titleKey: "analytics_completed_orders",
      countKey: "analytics_completed_orders_count",
      descriptionKey: "analytics_completed_orders_desc",
      icon: "/mask-group-4.png",
      bgColor: "bg-[#fffbee]",
      iconBgColor: "bg-[#a08206]",
      trendIcon: "/trend-up.svg",
    },
    {
      titleKey: "analytics_cancelled_orders",
      countKey: "analytics_cancelled_orders_count",
      descriptionKey: "analytics_cancelled_orders_desc",
      icon: "/mask-group-3.png",
      bgColor: "bg-[#fff3f3]",
      iconBgColor: "bg-[#b90000]",
      trendIcon: "/vuesax-linear-trend-down.png",
    },
  ];

  // Week days with translation keys
  const weekDays = [
    { key: "saturday" },
    { key: "friday" },
    { key: "thursday" },
    { key: "wednesday" },
    { key: "tuesday" },
    { key: "monday" },
    { key: "sunday" },
  ];

  // Customer categories with translation keys
  const customerCategories = [
    { labelKey: "analytics_repeat_customers", color: "bg-[#ecd435]" },
    { labelKey: "analytics_active_customers", color: "bg-[#142898]" },
    { labelKey: "analytics_new_customers", color: "bg-[#005b10]" },
    { labelKey: "analytics_vip_customers", color: "bg-[#b009b3]" },
    { labelKey: "analytics_inactive_customers", color: "bg-[#969595]" },
  ];

  // Y-axis values (numbers - no translation needed)
  const ordersYAxis = ["90", "80", "70", "60", "50", "40", "30", "20", "10"];
  const salesYAxis = [
    "+1000", "+9000", "+8000", "+7000", "+6000",
    "+5000", "+4000", "+3000", "+2000", "+1000",
  ];

  // Payment methods (no translation needed - logos and percentages)
  const paymentMethods = [
    { percentage: "45%", logo: "/frame-1984082122.svg" },
    { percentage: "45%", logo: "/image 17.png", isSpecial: true },
    { percentage: "45%", logo: "/frame-1984082122.svg" },
    { percentage: "45%", logo: "/frame-1984082122.svg" },
    { percentage: "45%", logo: "/frame-1984082122.svg" },
  ];

  // Reusable Filter Button Component
  const FilterButton = () => (
    <Button
      variant="outline"
      className="w-[154px] h-12 rounded-[10px] border-[#c3c3c3]"
    >
      <div className="flex items-center justify-start gap-2 w-full">
        <div className="inline-flex items-center justify-start gap-2">
          <FilterIcon className="w-6 h-6" />
          <span className="font-medium text-[#4f4f4f] text-sm leading-[14px] whitespace-nowrap [font-family:'Cairo',Helvetica] tracking-,[object Object],">
            {t("analytics_filter_this_week")}
          </span>
        </div>
        <ChevronRightIcon className="w-6 h-6" />
      </div>
    </Button>
  );

  return (
    <Layout>
      <div className="g-[#fefefe] w-full min-h-[1665px] flex">
        <section className="w-[full] flex-1 bg-[#faf9f7]">
          <div className="flex mt-10 w-[1288px] h-[1505px] m-2 flex-col items-start gap-10">
            
            {/* Header with Title and Date */}
            <div className="flex flex-col items-start gap-6 w-full">
              <div className="flex items-center justify-between w-full">
                <h1 className="font-h2-semiboald font-[number:var(--h2-semiboald-font-weight)] text-black text-[length:var(--h2-semiboald-font-size)] tracking-[var(--h2-semiboald-letter-spacing)] leading-[var(--h2-semiboald-line-height)] whitespace-nowrap [font-style:var(--h2-semiboald-font-style)]">
                  {t("analytics_title")}
                </h1>
                <div className="flex w-[269px] items-center justify-start gap-6 px-3 py-4 rounded-[10px] border border-solid border-[#c3c3c3]">
                  <div className="inline-flex items-center justify-start gap-2">
                    <div className="w-fit text-[length:var(--h-5-font-size)] leading-[var(--h-5-line-height)] whitespace-nowrap font-h-5 font-[number:var(--h-5-font-weight)] text-[#1a1713] tracking-[var(--h-5-letter-spacing)] [font-style:var(--h-5-font-style)]">
                      {t("analytics_date_label")}
                    </div>
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Alert Card */}
              <Card className="w-full h-[168px] bg-[#fefefe] rounded-[10px] overflow-hidden border-0">
                <CardContent className="p-6">
                  <div className="flex flex-col w-[1240px] items-start gap-4">
                    <h2 className="font-[number:var(--h2-semiboald-font-weight)] text-[#1a1713] text-[length:var(--h2-semiboald-font-size)] leading-[var(--h2-semiboald-line-height)] font-h2-semiboald tracking-[var(--h2-semiboald-letter-spacing)] [font-style:var(--h2-semiboald-font-style)]">
                      {t("analytics_alert_title")}
                    </h2>

                    <div className="flex items-center justify-between w-full">
                      <Button className="w-[337px] h-14 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90">
                        <span className="font-button-text font-[number:var(--button-text-font-weight)] text-[#fefefe] text-[length:var(--button-text-font-size)] tracking-[var(--button-text-letter-spacing)] leading-[var(--button-text-line-height)] whitespace-nowrap [font-style:var(--button-text-font-style)]">
                          {t("analytics_view_products_button")}
                        </span>
                      </Button>

                      <div className="flex flex-col w-[512px] items-start gap-2">
                        <div className="inline-flex items-center justify-start gap-2">
                          <div className="font-[number:var(--h-3-font-weight)] text-[#1a1713] text-[length:var(--h-3-font-size)] leading-[var(--h-3-line-height)] whitespace-nowrap font-h-3 tracking-[var(--h-3-letter-spacing)] [font-style:var(--h-3-font-style)]">
                            {t("analytics_low_stock_title")}
                          </div>
                          <img
                            className="w-12 h-12"
                            alt="Alert icon"
                            src="/Illustration.png"
                          />
                        </div>

                        <p className="font-[number:var(--h-5-font-weight)] text-[#4f4f4f] text-[length:var(--h-5-font-size)] leading-[var(--h-5-line-height)] font-h-5 tracking-[var(--h-5-letter-spacing)] [font-style:var(--h-5-font-style)]">
                          {t("analytics_low_stock_message")}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Orders Stats Section */}
            <div className="flex flex-col items-start gap-6 w-full">
              <h2 className="font-[number:var(--h2-semiboald-font-weight)] text-[#1a1713] text-[length:var(--h2-semiboald-font-size)] leading-[var(--h2-semiboald-line-height)] font-h2-semiboald tracking-[var(--h2-semiboald-letter-spacing)] [font-style:var(--h2-semiboald-font-style)]">
                {t("analytics_orders_title")}
              </h2>

              <div className="flex items-center gap-3 w-full">
                {orderStats.map((stat, index) => (
                  <Card
                    key={index}
                    className={`w-[304px] h-[110px] ${stat.bgColor} rounded-[10px] overflow-hidden border-0`}
                  >
                    <CardContent className="p-3">
                      <div className="inline-flex items-start gap-3">
                        <div
                          className="flex flex-col items-start gap-2"
                          style={{
                            width:
                              index === 0 ? "178px" :
                              index === 1 ? "119px" :
                              index === 2 ? "156px" : "127px",
                          }}
                        >
                          <div className="inline-flex flex-col items-start justify-center gap-2">
                            <div className="font-[number:var(--h-5-font-weight)] text-[#1a1713] text-[length:var(--h-5-font-size)] leading-[var(--h-5-line-height)] font-h-5 tracking-[var(--h-5-letter-spacing)] [font-style:var(--h-5-font-style)]">
                              {t(stat.titleKey)}
                            </div>

                            <div className="flex items-center justify-start gap-2 w-full">
                              <div className="font-h4-medium font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] whitespace-nowrap [font-style:var(--h4-medium-font-style)]">
                                {t(stat.countKey)}
                              </div>
                              <img className="w-6 h-6" alt="Trend" src={stat.trendIcon} />
                            </div>
                          </div>

                          <div className="font-medium text-[#4f4f4f] text-sm leading-[14px] [font-family:'Cairo',Helvetica] tracking-,[object Object],">
                            {t(stat.descriptionKey)}
                          </div>
                        </div>

                        <div className={`flex w-10 h-10 items-center gap-2 p-2 ${stat.iconBgColor} rounded-3xl rotate-180`}>
                          <img className="w-6 h-6 -rotate-180" alt="Icon" src={stat.icon} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Charts Row - Sales & Orders */}
            <div className="flex items-center justify-center w-full">
              {/* Sales Card */}
              <Card className="w-[590px] h-[488px] bg-[#fefefe] rounded-[10px] overflow-hidden border-0">
                <CardContent className="p-5">
                  <div className="flex flex-col w-[545px] items-start gap-4">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="font-[number:var(--h-3-font-weight)] text-[#1a1713] text-[length:var(--h-3-font-size)] text-left leading-[var(--h-3-line-height)] whitespace-nowrap font-h-3 tracking-[var(--h-3-letter-spacing)] [font-style:var(--h-3-font-style)]">
                        {t("analytics_sales_title")}
                      </h3>
                      <FilterButton />
                    </div>

                    <div className="flex flex-col items-center gap-6 w-full">
                      <div className="flex items-center justify-start gap-64 w-full">
                        <div className="inline-flex items-center justify-start gap-2">
                          <div className="font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] text-left leading-[var(--h4-medium-line-height)] whitespace-nowrap font-h4-medium tracking-[var(--h4-medium-letter-spacing)] [font-style:var(--h4-medium-font-style)]">
                            {t("analytics_total_sales")}
                          </div>
                          <img
                            className="w-6 h-6 object-cover"
                            alt="Sales icon"
                            src="/image-8.png"
                          />
                        </div>
                      </div>

                      <div className="relative w-[474px] h-[328px]">
                        <img className="absolute top-[114px] left-[214px] w-6 h-6" alt="Group" src="/group-11.png" />
                        <img className="absolute top-0 left-[7px] w-96 h-[298px]" alt="Frame" src="/frame-1984082002.svg" />

                        <div className="flex flex-col w-[474px] items-start gap-px absolute top-[3px] left-0">
                          <div className="flex items-center gap-[13px] w-full">
                            <div className="relative w-[421px] h-[303px]">
                              <img className="absolute top-0 left-[421px] w-px h-[303px] object-cover" alt="Line" src="/line-3-1.svg" />
                              <img className="absolute top-[302px] left-0 w-[421px] h-px object-cover" alt="Line" src="/line-4-1.svg" />
                            </div>

                            <div className="flex flex-col w-10 h-[310px] items-start gap-4">
                              {salesYAxis.map((value, index) => (
                                <div
                                  key={index}
                                  className={`${index === 0 ? "mt-[-1.00px]" : ""} text-sm text-right leading-[14px] [font-family:'Cairo',Helvetica] font-medium text-[#1a1713] tracking-,[object Object], self-stretch`}
                                >
                                  {value}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="inline-flex items-center gap-[21px]">
                            {weekDays.map((day, index) => (
                              <div
                                key={index}
                                className={`mt-[-1.00px] font-medium text-[#1a1713] text-sm leading-[14px] whitespace-nowrap [font-family:'Cairo',Helvetica] tracking-,[object Object], ${index === weekDays.length - 1 ? "w-[29px]" : "w-fit"}`}
                              >
                                {t(day.key)}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tooltip */}
                        <div className="absolute top-10 left-[131px] w-[150px] h-[77px]">
                          <img className="absolute -top-2 -left-2.5 w-[170px] h-[97px]" alt="Union" src="/union.svg" />
                          <div className="flex flex-col w-[103px] items-start gap-2 absolute top-2 left-[39px]">
                            <div className="inline-flex items-center justify-start gap-0.5">
                              <div className="mt-[-1.00px] [font-family:'Cairo',Helvetica] font-medium text-black text-[10px] text-right tracking-,[object Object], leading-[10px] whitespace-nowrap">
                                26/9/2025
                              </div>
                              <div className="mt-[-1.00px] font-medium text-black text-[10px] leading-[10px] whitespace-nowrap [font-family:'Cairo',Helvetica] tracking-,[object Object],">
                                {t("analytics_sales_day")}
                              </div>
                            </div>
                            <div className="font-normal text-transparent text-[10px] leading-[10px] [font-family:'Cairo',Helvetica] tracking-,[object Object],">
                              <span className="font-medium text-black">
                                {t("analytics_sales_label")}
                              </span>
                              <span className="font-semibold text-[#835f40] text-xs leading-3">
                                {" "}20.000 ر.س
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Orders Chart Card */}
              <Card className="w-[590px] h-[488px] bg-[#fefefe] rounded-[10px] overflow-hidden border-0">
                <CardContent className="p-10">
                  <div className="flex flex-col w-[552px] items-center gap-5">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="font-[number:var(--h-3-font-weight)] text-[#1a1713] text-[length:var(--h-3-font-size)] leading-[var(--h-3-line-height)] whitespace-nowrap font-h-3 tracking-[var(--h-3-letter-spacing)] [font-style:var(--h-3-font-style)]">
                        {t("analytics_orders_title")}
                      </h3>
                      <FilterButton />
                    </div>

                    <div className="w-[467px] h-[272px]">
                      <div className="inline-flex items-start justify-center gap-3.5">
                        <div className="flex flex-col w-[435px] items-start">
                          <img className="w-[435px] h-[200.68px]" alt="Orders chart" src="/mask-group-7.png" />
                          <div className="flex flex-col items-center gap-3 w-full">
                            <img className="w-[435px] h-px mt-[-1.00px] object-cover" alt="Line" src="/line-4.svg" />
                            <div className="flex items-start justify-between w-full">
                              {weekDays.map((day, index) => (
                                <div
                                  key={index}
                                  className={`mt-[-1.00px] font-medium text-[#1a1713] text-sm leading-[14px] whitespace-nowrap [font-family:'Cairo',Helvetica] tracking-,[object Object], ${index === weekDays.length - 1 ? "w-[29px]" : "w-fit"}`}
                                >
                                  {t(day.key)}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col w-[18px] items-start gap-4">
                          {ordersYAxis.map((value, index) => (
                            <div
                              key={index}
                              className={`${index === ordersYAxis.length - 1 ? "flex flex-col items-center justify-center gap-2 w-full" : ""} ${index === 0 ? "mt-[-1.00px]" : ""} font-h-5 font-[number:var(--h-5-font-weight)] text-[#1a1713] text-[length:var(--h-5-font-size)] tracking-[var(--h-5-letter-spacing)] leading-[var(--h-5-line-height)] [font-style:var(--h-5-font-style)] ${index === ordersYAxis.length - 1 ? "w-fit mt-[-1.00px] whitespace-nowrap" : "self-stretch"}`}
                            >
                              {value}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row - Customers & Payment Methods */}
            <div className="flex items-center justify-center w-full">
              {/* Customers Card */}
              <Card className="w-[590px] h-[499px] bg-[#fefefe] rounded-[10px] overflow-hidden border-0">
                <CardContent className="p-5">
                  <div className="flex flex-col w-[552px] h-[435px] items-center gap-8">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="font-[number:var(--h-3-font-weight)] text-[#1a1713] text-[length:var(--h-3-font-size)] text-left leading-[var(--h-3-line-height)] whitespace-nowrap font-h-3 tracking-[var(--h-3-letter-spacing)] [font-style:var(--h-3-font-style)]">
                        {t("analytics_customers_title")}
                      </h3>
                      <FilterButton />
                    </div>

                    <div className="flex flex-col w-[389px] items-center gap-6">
                      <div className="relative w-[264.89px] h-[254.89px]">
                        <img className="absolute -top-1.5 -left-1.5 w-[267px] h-[267px]" alt="Customer chart" src="/chart.png" />
                        <div className="absolute top-52 left-[143px] text-[#fefefe] text-base text-center leading-[normal] [font-family:'Cairo',Helvetica] font-semibold tracking-,[object Object],">10%</div>
                        <div className="absolute top-[53px] left-[178px] [-webkit-text-stroke:1px_#c3c3c3] text-[#fefefe] text-base text-center leading-4 whitespace-nowrap [font-family:'Cairo',Helvetica] font-semibold tracking-,[object Object],">30%</div>
                        <div className="absolute top-40 left-[27px] text-[#fefefe] text-base text-center leading-4 whitespace-nowrap [font-family:'Cairo',Helvetica] font-semibold tracking-,[object Object],">30%</div>
                        <div className="absolute top-[50px] left-14 text-[#fefefe] text-base text-center leading-4 whitespace-nowrap [font-family:'Cairo',Helvetica] font-semibold tracking-,[object Object],">30%</div>
                        <div className="absolute top-[139px] left-[211px] text-[#fefefe] text-base text-center leading-[normal] [font-family:'Cairo',Helvetica] font-semibold tracking-,[object Object],">3%</div>
                      </div>

                      <div className="flex flex-col items-center gap-3 w-full">
                        <div className="flex items-center justify-start gap-4 w-full">
                          {customerCategories.slice(0, 3).map((category, index) => (
                            <div key={index} className="flex flex-col w-[119px] items-start gap-2 p-2">
                              <div className="flex items-center justify-start gap-2 w-full">
                                <div className={`font-medium text-[#1a1713] text-sm leading-[14px] whitespace-nowrap [font-family:'Cairo',Helvetica] tracking-,[object Object], ${index === 0 ? "ml-[-7.00px]" : index === 1 ? "ml-[-4.00px]" : ""}`}>
                                  {t(category.labelKey)}
                                </div>
                                <div className={`${category.color} w-4 h-4 rounded-lg`} />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="inline-flex items-center justify-start gap-4">
                          {customerCategories.slice(3).map((category, index) => (
                            <div key={index} className="inline-flex flex-col items-start justify-center gap-2 p-2">
                              <div className="flex items-center justify-start gap-2 w-full">
                                <div className="[font-family:'Cairo',Helvetica] font-medium text-[#1a1713] text-sm tracking-,[object Object], leading-[14px] whitespace-nowrap">
                                  {t(category.labelKey)}
                                </div>
                                <div className={`${category.color} w-4 h-4 rounded-lg`} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods Card */}
              <Card className="w-[590px] h-[499px] bg-[#fefefe] rounded-[10px] overflow-hidden border-0">
                <CardContent className="p-5">
                  <div className="flex flex-col w-[600px] items-center gap-6">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="font-[number:var(--h-3-font-weight)] text-[#1a1713] text-[length:var(--h-3-font-size)] text-left leading-[var(--h-3-line-height)] whitespace-nowrap font-h-3 tracking-[var(--h-3-letter-spacing)] [font-style:var(--h-3-font-style)]">
                        {t("analytics_payment_methods_title")}
                      </h3>
                      <FilterButton />
                    </div>

                    <div className="flex flex-col items-start gap-6 w-full">
                      {paymentMethods.map((method, index) => (
                        <div key={index} className="flex items-center justify-between w-full">
                          {method.isSpecial ? (
                            <div className="flex w-[543px] items-center justify-center gap-2">
                              <div className="flex flex-col w-[459px] h-3 items-start justify-center gap-2 bg-[#cdbeb2] rounded-lg">
                                <div className="w-[197px] h-3 bg-[#835f40] rounded-lg" />
                              </div>
                              <img className="w-14 h-8 object-cover" alt="Payment logo" src={method.logo} />
                            </div>
                          ) : (
                            <img className="w-[543px]" alt="Payment method" src={method.logo} />
                          )}
                          <div className="font-h-3 font-[number:var(--h-3-font-weight)] text-[#1a1713] text-[length:var(--h-3-font-size)] leading-[var(--h-3-line-height)] whitespace-nowrap tracking-[var(--h-3-letter-spacing)] [font-style:var(--h-3-font-style)]">
                            {method.percentage}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </section>
      </div>
    </Layout>
  );
};