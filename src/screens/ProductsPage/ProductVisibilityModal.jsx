import React, { useState } from "react";
import axios from "../../Api/Axios";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const ProductVisibilityModal = ({ product, onCancel }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const isHidden = product?.isHidden;

  const handleToggleVisibility = async () => {
    if (!product?.id) return;

    try {
      setLoading(true);

      const endpoint = isHidden
        ? `/api/vendor/products/${product.id}/unhide`
        : `/api/vendor/products/${product.id}/hide`;

      const res = await axios.put(endpoint);

      if (res.data?.success === false) {
        throw new Error(res.data.message);
      }

      toast.success(
        res.data?.message ||
          (isHidden ? t("visibility.unhide_success") : t("visibility.hide_success"))
      );

      onCancel(true); // refresh parent
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || t("visibility.error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#fefefe] w-[975px] h-[600px] rounded-xl flex items-center justify-center">
        <main className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-[927px] px-6 py-8">
            <div className="flex flex-col gap-8 items-center">

              {/* IMAGE */}
              <div className="relative w-[350px] h-[350px]">
                <img
                  src={"/hidden product.png"}
                  alt="visibility"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* TEXT */}
              <div className="flex flex-col gap-4 max-w-[662px] items-center text-center">
                <h1 className="font-semibold text-[#1a1713] text-[30px] leading-10">
                  {isHidden
                    ? t("visibility.confirm_unhide", { name: product?.name })
                    : t("visibility.confirm_hide", { name: product?.name })}
                </h1>

                <p className="text-[#4f4f4f]">
                  {isHidden
                    ? t("visibility.unhide_warning")
                    : t("visibility.hide_warning")}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 w-full">
                <Button
                  variant="outline"
                  className="flex-1 h-14 rounded-[10px]"
                  onClick={() => onCancel(false)}
                  disabled={loading}
                >
                  {t("visibility.cancel")}
                </Button>

                <Button
                  className="flex-1 h-14 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)]"
                  onClick={handleToggleVisibility}
                  disabled={loading}
                >
                  {loading
                    ? t("visibility.processing")
                    : isHidden
                    ? t("visibility.unhide")
                    : t("visibility.hide")}
                </Button>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
