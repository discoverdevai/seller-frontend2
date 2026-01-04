import React, { useState } from "react";
import axios from "../../Api/Axios";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { toast } from "sonner";

export const ProductDetailsModal = ({ product, onClose }) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || "",
    quantity: product?.quantity || "",
    description: product?.description || "",
    material: product?.material || "",
    priceAfterDiscount: product?.salePrice || "",
    discount:
  product?.price && product?.salePrice
    ? Math.round(100-(product.salePrice / product.price) * 100)
    : "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await axios.put(
        `/api/vendor/products/${product.id}`,
        {
          name: form.name,
          price: Number(form.price),
          quantity: Number(form.quantity),
          description: form.description,
          material: form.material,
          discount: Number(form.discount),
          priceAfterDiscount: Number(form.priceAfterDiscount),
        }
      );

      toast.success("تم تحديث المنتج بنجاح");
      onClose(true); // close + refresh
      
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "فشل تحديث المنتج"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-[#fefefe] w-[680px] rounded-2xl z-50">
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <div className="p-4 flex flex-col gap-4" dir="rtl">
          <h1 className="text-lg font-semibold text-center">
            تعديل المنتج
          </h1>

          {/* IMAGE + NAME */}
          <div className="flex items-center gap-3 border-b pb-2">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border rounded px-2 py-1 text-sm w-full"
            />

            <img
              className="w-[56px] h-[56px] rounded object-cover"
              src={product?.image || "/203-1.png"}
              alt=""
            />
          </div>

          <Input label="السعر" name="price" value={form.price} onChange={handleChange} />
          <Input label="الكمية" name="quantity" value={form.quantity} onChange={handleChange} />
          <Input label="الخصم %" name="discount" value={form.discount} onChange={handleChange} />
          <Input label="السعر بعد الخصم" name="priceAfterDiscount" value={form.priceAfterDiscount} onChange={handleChange} />
          <Input label="الخامة" name="material" value={form.material} onChange={handleChange} />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border rounded px-2 py-2 text-sm"
            placeholder="الوصف"
          />

          {/* STATUS */}
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-50 text-[#005b10]">
              {product?.status || "متوفر"}
            </Badge>
            <span className="text-sm">الحالة</span>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex-1" onClick={()=>onClose(false)}>
              إلغاء
            </Button>

            <Button className="flex-1" onClick={handleSave} disabled={loading}>
              {loading ? "جارٍ الحفظ..." : "حفظ التعديلات"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div className="flex items-center border-b py-2 text-sm">
    <span className="font-medium ml-2 w-32">{label} :</span>
    <input {...props} className="border rounded px-2 py-1 w-full" />
  </div>
);
