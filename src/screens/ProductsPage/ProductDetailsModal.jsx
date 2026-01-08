import React, { useState } from "react";
import axios from "../../Api/Axios";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const ProductDetailsModal = ({ product, onClose }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || "",
    quantity: product?.quantity || "",
    description: product?.description || "",
    material: product?.material || "",
    discount:
      product?.price && product?.salePrice
        ? Math.round(100 - (product.salePrice / product.price) * 100)
        : "",
    priceAfterDiscount:
      product?.price && product?.salePrice
        ? product.salePrice
        : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedForm = {
      ...form,
      [name]: value,
    };

    if (name === "price" || name === "discount") {
      const price = Number(name === "price" ? value : updatedForm.price);
      const discount = Number(name === "discount" ? value : updatedForm.discount);

      updatedForm.priceAfterDiscount = price && discount >= 0
        ? Math.round(price - price * (discount / 100))
        : "";
    }

    setForm(updatedForm);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await axios.put(`/api/vendor/products/${product.id}`, {
        name: form.name,
        price: Number(form.price),
        quantity: Number(form.quantity),
        description: form.description,
        material: form.material,
        discount: Number(form.discount),
        priceAfterDiscount: Number(form.priceAfterDiscount),
      });

      toast.success(t("details.success_update"));
      onClose(true);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || t("details.failed_update"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => onClose(false)} />

      <div className="relative bg-[#fefefe] w-[680px] rounded-2xl z-50">
        <button
          onClick={() => onClose(false)}
          className="absolute top-3 left-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <div className="p-4 flex flex-col gap-4" dir="rtl">
          <h1 className="text-lg font-semibold text-center">{t("details.edit_product")}</h1>

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

          <Input label={t("details.price")} name="price" value={form.price} onChange={handleChange} />
          <Input label={t("details.quantity")} name="quantity" value={form.quantity} onChange={handleChange} />
          <Input label={t("details.discount")} name="discount" value={form.discount} onChange={handleChange} />
          <Input
            label={t("details.price_after_discount")}
            name="priceAfterDiscount"
            value={form.priceAfterDiscount}
            disabled
          />
          <Input label={t("details.material")} name="material" value={form.material} onChange={handleChange} />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border rounded px-2 py-2 text-sm"
            placeholder={t("details.description")}
          />

          {/* STATUS */}
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-50 text-[#005b10]">
              {product?.status || t("details.status_available")}
            </Badge>
            <span className="text-sm">{t("details.status")}</span>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex-1" onClick={() => onClose(false)}>
              {t("details.cancel")}
            </Button>

            <Button className="flex-1" onClick={handleSave} disabled={loading}>
              {loading ? t("details.saving") : t("details.save_changes")}
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
    <input
      {...props}
      className={`border rounded px-2 py-1 w-full ${props.disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
    />
  </div>
);
