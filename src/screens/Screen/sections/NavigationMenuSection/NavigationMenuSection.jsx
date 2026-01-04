import { ChevronLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

const navigationItems = [
  { label: "الرئيسية", icon: "/home.svg", path: "/" },
  { label: "المنتجات", icon: "/mask-group.png", path: "/products" },
  { label: "الطلبات", icon: "/mask-group-1.png", path: "/orders" },
  { label: "المخزون", icon: "/mask-group-2.png", path: "/inventory" },
  { label: "التحليلات", icon: "/chart-1.svg", path: "/analytics" },
  { label: "إعدادات المتجر", icon: "/presention-chart-style7.svg", path: "/settings" },
];

export const NavigationMenuSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Persist collapsed state using localStorage
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("sidebar-collapsed") === "true"
  );

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      localStorage.setItem("sidebar-collapsed", String(!prev));
      return !prev;
    });
  };

  return (
    <nav 
      className={`flex bg-[#835f40]   h-full transition-all duration-300  ${
        collapsed ? "w-[104px]" : "w-[250px]"
      }`}
    >
      <div className="flex mt-8 w-full px-2 flex-col items-center gap-8">
        {/* Logo and shrink button */}
        <div className="flex flex-col items-start gap-4 w-full">
          <Button
            variant="outline"
            className={` rounded-[50px] border border-solid border-[#fefefe] bg-transparent hover:bg-transparent ${
              collapsed ? " w-[70px] h-[42px]" : "flex w-[108px] h-[42px]" 
            }`}
          >
            <div className="[font-family:'Cairo',Helvetica] font-normal text-[#fefefe] text-xl text-center">
              اللوجو
            </div>
          </Button>

          <div className="flex items-center gap-4 w-full">
            <button
              onClick={toggleCollapsed}
              className="inline-flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
            >
              <ChevronLeftIcon
                className={`w-3 h-3 text-[#fefefe] transition-transform duration-300 ${
                  collapsed ? "rotate-180" : ""
                }`}
              />
              {!collapsed && (
                <div className="font-placeholder text-[#fefefe]">
                  تصغير
                </div>
              )}
            </button>

            {!collapsed && (
              <img
                className="w-[132px] h-px object-cover"
                alt="Vector"
                src="/vector-1.svg"
              />
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col w-full items-start gap-4">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex h-14 items-center justify-center gap-2 p-3 w-full rounded-[10px] cursor-pointer border-none transition-colors duration-300
                  ${
                    isActive
                      ? "bg-[#fefefe] !text-[#835f40]"
                      : "bg-transparent hover:bg-[#9d7350]"
                  }`}
              >
                <div
  className={`inline-flex items-center ${
    collapsed ? "justify-center" : "justify-start"
  } gap-2 w-full`}
>
                  <img
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isActive ? "filter brightness-0 saturate-100 invert" : ""
                    }`}
                    alt={item.label}
                    src={item.icon}
                  />
                  {!collapsed && (
                    <div
                      className={`font-h-5 ${
                        isActive ? "text-[#835f40]" : "text-[#fefefe]"
                      }`}
                    >
                      {item.label}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
