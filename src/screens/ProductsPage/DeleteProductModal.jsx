import React, { useState } from "react";
import axios from "../../Api/Axios"; // adjust path if needed
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

export const DeleteProductModal = ({ product, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!product?.id) return;

    try {
      setLoading(true);

      const res = await axios.delete(`/api/vendor/products/${product.id}`);

if (!res.data.success) {
  throw new Error(res.data.message);
}

toast.success(res.data.message || "تم حذف المنتج بنجاح");
onCancel();
alert("deleted" +res.data.message)
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء حذف المنتج");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#fefefe] w-[975px] h-[600px] flex rounded-xl">
        <div className="mt-8 w-full h-full flex flex-col gap-2 relative items-center">
          <img
            className="w-[350px] h-[350px]"
            alt="Delete"
            src="/ProductDeletion.png"
          />

          <div className="flex flex-col gap-8 w-full items-center">
            <div className="flex flex-col w-[662px] gap-4 items-center">
              <h1 className="font-semibold text-[#1a1713] text-[30px] leading-10 text-center">
                هل أنت متأكد أنك تريد حذف المنتج "{product?.name}"؟
              </h1>

              <p className="text-[#4f4f4f] text-center">
                لا يمكن استرجاع المنتج بعد الحذف.
              </p>
            </div>

            <div className="flex justify-between w-full px-12 mt-auto">
              <Button
                variant="outline"
                className="w-[452px] h-14 rounded-[10px]"
                onClick={onCancel}
                disabled={loading}
              >
                إلغاء
              </Button>

              <Button
                variant="destructive"
                className="w-[451px] h-14 bg-[#b90000]"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "جارٍ الحذف..." : "حذف المنتج"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
