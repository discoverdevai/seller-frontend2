import { BellIcon, SearchIcon, UserIcon, GlobeIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { NavigationMenuSection } from "../../screens/Screen/sections/NavigationMenuSection";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  const toggleLanguage = () => {
    console.log(isArabic);
    
    const newLang = isArabic ? "en" : "ar";
    i18n.changeLanguage(newLang);

    // Update direction + lang attribute
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  return (
    <div className="bg-[#fefefe] w-full min-w-[1440px] min-h-screen flex justify-start">
      {/* Sidebar */}
      <aside className="flex-shrink-0 justify-start">
        <NavigationMenuSection />
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        <header className="w-full h-20 flex bg-[#fefefe] border-b border-solid border-[#f2f2f2]">
          <div className="flex w-full max-w-[1227px] h-full items-center justify-between px-12">
            
            {/* Search */}
            <div className="flex w-full max-w-[812px] items-center gap-2 px-3 py-4 rounded-[10px] border border-solid border-[#c3c3c3]">
              <SearchIcon className="w-6 h-6 text-[#4f4f4f]" />
              <Input
                type="text"
                placeholder={isArabic ? "البحث" : "Search"}
                className="border-0 bg-transparent text-[#4f4f4f] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            {/* Icons */}
            <div className="inline-flex items-center justify-start gap-6">

              {/* Notification */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-[#835f40] w-10 h-10 relative"
              >
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#b90000] rounded-full" />
              </Button>

              {/* Profile */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-[#1a1713] w-10 h-10"
                onClick={() => navigate("/profile")}
              >
                <UserIcon className="w-6 h-6" />
              </Button>

              {/* 🌐 Language Switch */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-[#1a1713] w-10 h-10"
                onClick={toggleLanguage}
              >
                <GlobeIcon className="w-6 h-6" />
              </Button>

            </div>
          </div>
        </header>

        {/* Page content */}
        {children}
      </main>
    </div>
  );
};
