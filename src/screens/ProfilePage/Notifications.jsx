import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { useTranslation } from "react-i18next";

const notificationSettings = [
  { label: "notifications.notification.newOrder", dashboard: true, sms: true },
  { label: "notifications.notification.statusChange", dashboard: true, sms: false },
  { label: "notifications.notification.orderCanceled", dashboard: true, sms: true },
  { label: "notifications.notification.lowStockProduct", dashboard: false, sms: true },
  { label: "notifications.notification.outOfStock", dashboard: true, sms: false },
  { label: "notifications.notification.newOrder", dashboard: true, sms: true },
  { label: "notifications.notification.newReview", dashboard: true, sms: false },
];

export const Notifications = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState(notificationSettings);

  const { i18n } = useTranslation();
const isArabic = i18n.language === "ar";

  const handleToggle = (index, type) => {
    setNotifications((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [type]: !item[type] } : item
      )
    );
  };

  return (
    <section className="w-full bg-[#faf9f7] py-10 px-6">
      <div className="flex flex-col items-start gap-8 max-w-[1179px]">
        {/* Table Headers */}
        <div className="flex flex-col items-start w-full">
          <div className="flex items-center w-full">
            <div className="flex w-[393px] h-12 items-center justify-center gap-2 p-2 bg-[#ede1d6] rounded-[0px_10px_0px_0px]">
              <span className="font-h4-medium text-[#1a1713] text-center">
                {t("notifications.type")}
              </span>
            </div>
            <div className="flex w-[393px] h-12 items-center justify-center gap-2 p-2 bg-[#ede1d6]">
              <span className="font-h4-medium text-[#1a1713] text-center">
                {t("notifications.dashboard")}
              </span>
            </div>
            <div className="flex w-[393px] h-12 items-center justify-center gap-2 p-2 bg-[#ede1d6] rounded-[10px_0px_0px_0px]">
              <span className="font-h4-medium text-[#1a1713] text-center">
                {t("notifications.sms")}
              </span>
            </div>
          </div>

          {/* Table Rows */}
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full h-12 border-b border-[#c3c3c3]"
            >
              <span className="w-[377px] font-h-3 text-[#1a1713] text-center">
                {t(notification.label)}
              </span>

             <div className={`flex items-center justify-${isArabic ? "center" : "center"} w-[393px]`}>
    <Switch
      checked={notification.dashboard}
      onCheckedChange={() => handleToggle(index, "dashboard")}
      className="data-[state=checked]:bg-[#835f40] data-[state=unchecked]:bg-[#c3c3c3]"
    />
  </div>

  {/* SMS Switch */}
  <div className={`flex items-center justify-${isArabic ? "center" : "center"} w-[393px]`}>
    <Switch
      checked={notification.sms}
      onCheckedChange={() => handleToggle(index, "sms")}
      className="data-[state=checked]:bg-[#835f40] data-[state=unchecked]:bg-[#c3c3c3]"
    />
  </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <Button className="flex h-14 items-center justify-center gap-2 p-2 w-full rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90">
          <span className="font-button-text text-[#fefefe] text-center">
            {t("notifications.save")}
          </span>
        </Button>
      </div>
    </section>
  );
};
