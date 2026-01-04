import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { GeneralSettingsTab } from "./GeneralSettingsTap";
import { UsersTabs } from "./UsersTaps";
import { OrderTap } from "./OrderTap";
import { ShippingTap } from "./ShppingTap";
import { PaymentTab } from "./PaymentTab";
// You can create other tab components later


const tabItems = [
   { label: "الاعدادات العامة", id: "settings" },
    { label: "المستخدمين", id: "users" },
     { label: "الطلبات", id: "orders" },
      { label: "الشحن", id: "shipping" },
  { label: "الدفع", id: "payment" },
 
 
 
 
];

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("settings"); // default tab

  return (
    <Layout>
      <div className="w-full flex overflow-x-hidden  ">
        <div className="flex-1 bg-[#FAF9F7] p-6">
          {/* Tabs */}
       <div className="inline-flex items-start justify-start gap-3 pt-3 pr-6">
  {tabItems.map((tab, index) => (
    <div key={index} className="inline-flex flex-col items-center gap-0.5">
      <button
        onClick={() => setActiveTab(tab.id)}
        className="flex items-center justify-center gap-2 p-2"
      >
        <div
          className={`font-h-5 font-[number:var(--h-5-font-weight)] text-[length:var(--h-5-font-size)] leading-[var(--h-5-line-height)] whitespace-nowrap tracking-[var(--h-5-letter-spacing)]  [font-style:var(--h-5-font-style)] ${
            activeTab === tab.id ? "text-[#835f40]" : "text-[#1a1713]"
          }`}
        >
          {tab.label}
        </div>
      </button>
      {activeTab === tab.id && (
        <img
          className="w-[102px] h-px object-cover"
          alt="Line"
          src="/line-2.svg"
        />
      )}
    </div>
  ))}
</div>


          {/* Tab Content */}
          <div>
            {activeTab === "payment" && <PaymentTab />}
            {activeTab === "shipping" && <ShippingTap />}
            {activeTab === "orders" && <OrderTap />}
            {activeTab === "users" && <UsersTabs />}
            {activeTab === "settings" && <GeneralSettingsTab />}
          </div>
        </div>
      </div>
    </Layout>
  );
};
