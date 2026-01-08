import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLanguage);
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLanguage;
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className={`fixed top-4 z-50 min-w-[60px] h-10 bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-200 border-gray-300 ${
        i18n.language === "ar" ? "right-4" : "left-4"
      }`}
    >
      <span className="font-medium text-[#1a1713]">
        {i18n.language === "ar" ? "EN" : "AR"}
      </span>
    </Button>
  );
};
