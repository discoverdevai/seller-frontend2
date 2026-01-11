import React from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const LogoutModal = ({ onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user data
    localStorage.removeItem("userData");

    // Redirect to sign-in page
    navigate("/signin");
  };

  return (
    <div className="bg-[#fefefe] w-[975px] h-[542px] flex items-center justify-center rounded-xl">
      <div className="w-[927px] max-w-full flex flex-col gap-2 items-center px-6">
        <img
          className="w-[296px] h-[296px]"
          alt={t("logOutModal.iconAlt")}
          src="/logout.png"
        />

        <div className="flex flex-col gap-8 w-full items-center">
          <div className="flex flex-col w-full max-w-[662px] gap-4 items-center">
            <h1 className="font-semibold text-[#1a1713] text-[40px] leading-10 text-center [font-family:'Cairo',Helvetica] tracking-[0] [direction:rtl]">
              {t("logOutModal.confirmTitle")}
            </h1>

            <p className="font-[number:var(--20-paragraph-font-weight)] text-[#4f4f4f] text-[length:var(--20-paragraph-font-size)] leading-[var(--20-paragraph-line-height)] text-center font-20-paragraph tracking-[var(--20-paragraph-letter-spacing)] [direction:rtl] [font-style:var(--20-paragraph-font-style)]">
              {t("logOutModal.confirmMessage")}
            </p>
          </div>

          <div className="flex justify-between w-full gap-4 items-center">
            <Button
              variant="outline"
              className="w-full max-w-[452px] h-14 justify-center gap-2 p-2 rounded-[10px] border-[none] bg-transparent relative before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[10px] before:[background:linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none"
              onClick={onClose}
            >
              {t("logOutModal.cancel")}
            </Button>

            <Button
              className="w-full max-w-[451px] h-14 justify-center gap-2 p-2 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90"
              onClick={handleLogout}
            >
              {t("logOutModal.logout")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
