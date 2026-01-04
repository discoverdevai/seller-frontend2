import {
  ArrowLeftIcon,
  ImageIcon,
  ShoppingCartIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Layout } from "../../components/Layout";
import { SuccessModal } from "./SuccessAddingModal";
import api from "../../Api/Axios";

export const AddProduct = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    categoryId: 10,
    name: "",
    price: "",
    discount: "",
    priceAfterDiscount: "",
    quantity: "",
    description: "",
    material: "",
    length: "",
    width: "",
    height: "",
    photos: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  /* ---------------- handlers ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => `https://example.com/images/${file.name}`);
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...urls] }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const price = Number(formData.price);
    const discount = Number(formData.discount);
    if (price && discount) {
      const after = price - (price * discount) / 100;
      setFormData((prev) => ({ ...prev, priceAfterDiscount: after.toFixed(2) }));
    }
  }, [formData.price, formData.discount]);

  const handleSubmit = async () => {
    try {
      await api.post("/api/vendor/products/create", {
        ...formData,
        price: Number(formData.price),
        discount: Number(formData.discount),
        priceAfterDiscount: Number(formData.priceAfterDiscount),
        quantity: Number(formData.quantity),
        length: Number(formData.length),
        width: Number(formData.width),
        height: Number(formData.height),
      });

      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء حفظ المنتج");
    }
  };

  /* ================= UI ================= */

  return (
    <Layout>
      <section className="w-full bg-[#faf9f7] py-8 px-6">
        <div className="max-w-[1179px] mx-auto flex flex-col gap-12">

          {/* breadcrumb */}
          <nav className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-[#835f40]">المنتجات</span>
              <ArrowLeftIcon className="w-6 h-6" />
              <span className="text-[#4f4f4f]">إضافة منتج جديد</span>
            </div>
          </nav>

          <div className="flex flex-col gap-6 w-full">
            <h1 className="text-black">البيانات الأساسية</h1>

            <div className="flex items-start justify-between gap-6 w-full">

              {/* FORM */}
              <div className="flex flex-col gap-6 flex-1 max-w-[778px]">
                <Card className="bg-[#fefefe] rounded-[22px] border-0 shadow-none">
                  <CardContent className="p-8 flex flex-col gap-6">

                    {/* images */}
                    <div className="flex flex-col items-start gap-3">
                      <label>إضافة الصور *</label>

                      <label className="w-full h-36 rounded-lg border border-dashed border-[#c3c3c3] flex items-center justify-center cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          multiple
                          onChange={handleImageUpload}
                        />

                        {imagePreviews.length > 0 ? (
                          <div className="flex gap-2 overflow-x-auto">
                            {imagePreviews.map((src, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={src}
                                  className="h-24 w-24 object-cover rounded-lg"
                                />
                                <button
                                  onClick={() => removeImage(index)}
                                  className="absolute -top-0 -right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                  type="button"
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <img src="/gallery-export.svg" className="w-6 h-6" />
                            <div className="text-center text-[#4f4f4f]">
                              أضف صورة جديدة
                              <br />
                              <span className="text-xs">JPG / PNG</span>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>

                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="أدخل اسم المنتج" />
                    <Input name="price" value={formData.price} onChange={handleChange} placeholder="السعر" />

                    <div className="flex gap-6">
                      <Input name="priceAfterDiscount" value={formData.priceAfterDiscount} readOnly placeholder="السعر بعد الخصم" />
                      <Input name="discount" value={formData.discount} onChange={handleChange} placeholder="الخصم" />
                    </div>

                    <Input name="quantity" value={formData.quantity} onChange={handleChange} placeholder="الكمية" />
                    <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="اكتب الوصف" />

                    <div className="flex gap-3">
                      <Input name="height" onChange={handleChange} placeholder="الارتفاع" />
                      <Input name="width" onChange={handleChange} placeholder="العرض" />
                      <Input name="length" onChange={handleChange} placeholder="الطول" />
                    </div>

                    <Input name="material" value={formData.material} onChange={handleChange} placeholder="الخامة" />
                  </CardContent>
                </Card>

                <Button
                  onClick={handleSubmit}
                  className="h-14 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1),rgba(211,186,164,1))]"
                >
                  حفظ المنتج
                </Button>
              </div>

              {/* PREVIEW CARD */}
              <Card className="w-[377px] bg-[#fefefe] rounded-[22px] border-0 shadow-none">
                <CardContent className="p-8">
                  <Card className="border rounded-3xl overflow-hidden">
                    <div className="relative h-[271px] bg-[#f2f2f2] flex items-center justify-center">
                      {imagePreviews[0] ? (
                        <img src={imagePreviews[0]} className="h-full object-contain" />
                      ) : (
                        <ImageIcon className="w-[126px] h-[126px] text-gray-400" />
                      )}
                    </div>

                    <CardContent className="p-3">
                      <h3 className="font-bold">{formData.name || "اسم المنتج"}</h3>
                      <p className="text-sm text-gray-500">
                        {formData.description || "وصف المنتج"}
                      </p>
                    </CardContent>

                    <div className="h-14 bg-[#ffffff80] flex justify-between px-3 items-center">
                      <span className="text-[#835f40]">
                        {formData.priceAfterDiscount || "--"}
                      </span>
                      <ShoppingCartIcon />
                    </div>
                  </Card>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>

      {showSuccess && (
        <SuccessModal
          onClose={() => setShowSuccess(false)}
          onContinue={() => navigate("/products")} // <-- navigate to /products
        />
      )}
    </Layout>
  );
};
