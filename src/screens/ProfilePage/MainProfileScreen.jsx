import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { EditProfileScreen } from "./EditProfileScreen";
import { Notifications } from "./Notifications";
import { ChangePasswordScreen } from "./ChangePasswordScreen";
import { LogoutModal } from "./LogoutModal";

const tabItems = [
  { label: "تعديل الملف الشخصي", id: "editProfileSettings" },
  { label: "التنبيهات", id: "notifications" },
  { label: "تغيير كلمة المرور", id: "changePassword" },
  { label: "تسجيل الخروج", id: "logout" },
];

export const MainProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("editProfileSettings");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleTabClick = (tabId) => {
    if (tabId === "logout") {
      setShowLogoutModal(true);
    } else {
      setActiveTab(tabId);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "editProfileSettings":
        return <EditProfileScreen />;
      case "notifications":
        return <Notifications />;
      case "changePassword":
        return <ChangePasswordScreen />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="w-full flex overflow-x-hidden bg-[#FAF9F7] p-6">
        <div className="flex-1">
          {/* Tabs */}
          <div className="inline-flex items-start justify-end gap-3 pb-2">
            {tabItems.map((tab) => (
              <div key={tab.id} className="inline-flex flex-col items-center gap-0.5">
                <button
                  onClick={() => handleTabClick(tab.id)}
                  className="flex items-center justify-center px-4 py-2"
                >
                  <span
                    className={`font-h-5 font-[number:var(--h-5-font-weight)] text-[length:var(--h-5-font-size)] leading-[var(--h-5-line-height)] tracking-[var(--h-5-letter-spacing)] whitespace-nowrap [direction:rtl] [font-style:var(--h-5-font-style)] ${
                      activeTab === tab.id ? "text-[#835f40]" : "text-[#1a1713]"
                    }`}
                  >
                    {tab.label}
                  </span>
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
          <div className="mt-6">{renderTabContent()}</div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative">
            {/* زر إغلاق */}
            <button
              className="absolute top-4 left-4 text-xl text-white"
              onClick={() => setShowLogoutModal(false)}
            >
              ✕
            </button>

            <LogoutModal onClose={() => setShowLogoutModal(false)} />
          </div>
        </div>
      )}
    </Layout>
  );
};
