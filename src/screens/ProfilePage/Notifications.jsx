import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";



const notificationSettings = [
  { label: "تنبيهات عند استلام طلب جديد", dashboard: true, sms: true },
  { label: "إشعار عند تغيير حالة الطلب", dashboard: true, sms: false },
  { label: "إشعار عند إلغاء الطلب", dashboard: true, sms: true },
  { label: "تنبيه عند انخفاض كمية منتج", dashboard: false, sms: true },
  { label: "إشعار عند نفاد المخزون", dashboard: true, sms: false },
  { label: "تنبيهات عند استلام طلب جديد", dashboard: true, sms: true },
  { label: "إشعار عند إضافة تقييم جديد", dashboard: true, sms: false },
];

export const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationSettings);

  const handleToggle = (index, type) => {
    setNotifications((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [type]: !item[type] } : item
      )
    );
  };

  return (
    <section className="w-full bg-[#faf9f7] py-10 px-6">
      <div className="flex flex-col items-start gap-8 max-w-[1179px] [direction:rtl]">
       

        <div className="flex flex-col items-start w-full">
          <div className="flex items-center w-full">
             <div className="flex w-[393px] h-12 items-center justify-center gap-2 p-2 bg-[#ede1d6] rounded-[0px_10px_0px_0px]">
              <span className="font-h4-medium font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] text-center leading-[var(--h4-medium-line-height)] whitespace-nowrap tracking-[var(--h4-medium-letter-spacing)]  [font-style:var(--h4-medium-font-style)]">
                نوع التنبيه
              </span>
            </div>
             <div className="flex w-[393px] h-12 items-center justify-center gap-2 p-2 bg-[#ede1d6]">
              <span className="font-h4-medium font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] text-center leading-[var(--h4-medium-line-height)] whitespace-nowrap tracking-[var(--h4-medium-letter-spacing)]  [font-style:var(--h4-medium-font-style)]">
                داخل الداشبورد
              </span>
            </div>
            <div className="flex w-[393px] h-12 items-center justify-center gap-2 p-2 bg-[#ede1d6] rounded-[10px_0px_0px_0px]">
              <span className="font-h4-medium font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] text-center tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] whitespace-nowrap  [font-style:var(--h4-medium-font-style)]">
                برسائل الجوال &quot;SMS&quot;
              </span>
            </div>

           

           
          </div>

          {notifications.map((notification, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full h-12 border-b border-[#c3c3c3]"
            >
               <span className="w-[377px] font-h-3 font-[number:var(--h-3-font-weight)] text-[#1a1713] text-[length:var(--h-3-font-size)] text-center leading-[var(--h-3-line-height)] tracking-[var(--h-3-letter-spacing)]  [font-style:var(--h-3-font-style)]">
                  {notification.label}
                </span>

              <div className="flex items-center gap-4 pl-[152px]">
                <Switch
                  checked={notification.dashboard}
                  onCheckedChange={() => handleToggle(index, "dashboard")}
                  className="data-[state=checked]:bg-[#835f40] data-[state=unchecked]:bg-[#c3c3c3]"
                />

                
              </div>
             

                <div className="flex items-center  gap-4 pl-[152px]">
                <Switch
                  checked={notification.sms}
                  onCheckedChange={() => handleToggle(index, "sms")}
                  className="data-[state=checked]:bg-[#835f40] data-[state=unchecked]:bg-[#c3c3c3]"
                />
              </div>
            </div>
          ))}
        </div>

        <Button className="flex h-14 items-center justify-center gap-2 p-2 w-full rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90">
          <span className="font-button-text font-[number:var(--button-text-font-weight)] text-[#fefefe] text-[length:var(--button-text-font-size)] tracking-[var(--button-text-letter-spacing)] leading-[var(--button-text-line-height)] whitespace-nowrap  [font-style:var(--button-text-font-style)]">
            حفظ
          </span>
        </Button>
      </div>
    </section>
  );
};
