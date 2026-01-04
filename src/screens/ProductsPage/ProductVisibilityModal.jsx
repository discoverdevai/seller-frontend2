import React, { useState } from "react";
import axios from "../../Api/Axios"; // adjust path if needed
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

export const ProductVisibilityModal = ({ product, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const handleHideProduct = async () => {
    if (!product?.id) return;

    try {
      setLoading(true);

      const res = await axios.put(
        `/api/vendor/products/${product.id}/hide`
      );

      // If backend returns { success, message }
      if (res.data?.success === false) {
        throw new Error(res.data.message);
      }

      toast.success(res.data?.message || "تم إخفاء المنتج بنجاح");
      alert(res.data?.message || "تم إخفاء المنتج بنجاح")
      onCancel(true); // close modal
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "حدث خطأ أثناء إخفاء المنتج"
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
                  src="/hidden product.png"
                  alt="visibility"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* TEXT */}
              <div className="flex flex-col gap-4 max-w-[662px] items-center text-center">
                <h1 className="font-semibold text-[#1a1713] text-[30px] leading-10">
                  هل أنت متأكد أنك تريد إخفاء المنتج "{product?.name}"؟
                </h1>

                <p className="text-[#4f4f4f]">
                  يمكن إعادة تفعيله في أي وقت من إعدادات المنتج.
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 w-full">
                <Button
                  variant="outline"
                  className="flex-1 h-14 rounded-[10px]"
                  onClick={onCancel}
                  disabled={loading}
                >
                  إلغاء
                </Button>

                <Button
                  className="flex-1 h-14 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)]"
                  onClick={handleHideProduct}
                  disabled={loading}
                >
                  {loading ? "جارٍ الإخفاء..." : "إخفاء المنتج"}
                </Button>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
