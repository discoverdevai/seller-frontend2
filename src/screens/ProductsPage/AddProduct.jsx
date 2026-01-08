import {
  ArrowLeftIcon,
  ImageIcon,
  ShoppingCartIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Layout } from "../../components/Layout";
import { SuccessModal } from "./SuccessAddingModal";
import api from "../../Api/Axios";

export const AddProduct = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [showSuccess, setShowSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const [formData, setFormData] = useState({
    categoryId: "",
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

  /* ---------------- Fetch Categories ---------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await api.get("/api/categories");
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert(t("errors.fetchCategories"));
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [t]);

  /* ---------------- handlers ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(
      (file) => `https://example.com/images/${file.name}`
    );

    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...urls],
    }));

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* ---------------- Price after discount ---------------- */
  useEffect(() => {
    const price = Number(formData.price);
    const discount = Number(formData.discount);

    if (price && discount) {
      const after = price - (price * discount) / 100;
      setFormData((prev) => ({
        ...prev,
        priceAfterDiscount: after.toFixed(2),
      }));
    }
  }, [formData.price, formData.discount]);

  /* ---------------- Submit ---------------- */
  const handleSubmit = async () => {
    try {
      await api.post("/api/vendor/products/create", {
        ...formData,
        categoryId: Number(formData.categoryId),
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
      alert(t("errors.saveProduct"));
    }
  };

  /* ---------------- Category name by language ---------------- */
  const getCategoryName = (category) =>
    isArabic && category.nameAr
      ? category.nameAr
      : category.name;

  /* ================= UI ================= */
  return (
    <Layout>
      <section className="w-full bg-[#faf9f7] py-8 px-6">
        <div className="max-w-[1179px] mx-auto flex flex-col gap-12">

          {/* Breadcrumb */}
          <nav className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-[#835f40]">
                {t("products.title")}
              </span>

              <ArrowLeftIcon
                className={`w-6 h-6 ${
                  isArabic ? "rotate-180" : ""
                }`}
              />

              <span className="text-[#4f4f4f]">
                {t("products.addNew")}
              </span>
            </div>
          </nav>

          <div className="flex flex-col gap-6 w-full">
            <h1 className="text-black">
              {t("products.basicInfo")}
            </h1>

            <div className="flex items-start justify-between gap-6 w-full">

              {/* FORM */}
              <div className="flex flex-col gap-6 flex-1 max-w-[778px]">
                <Card className="bg-[#fefefe] rounded-[22px] border-0 shadow-none">
                  <CardContent className="p-8 flex flex-col gap-6">

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">
                        {t("products.category")} *
                      </label>

                      <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        disabled={loadingCategories}
                        className="h-10 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#835f40]"
                      >
                        <option value="">
                          {loadingCategories
                            ? t("common.loading")
                            : t("products.selectCategory")}
                        </option>

                        {categories.map((category) => (
                          <option
                            key={category.id}
                            value={category.id}
                          >
                            {getCategoryName(category)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Images */}
                    <div className="flex flex-col items-start gap-3">
                      <label>
                        {t("products.images")} *
                      </label>

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
                              <div
                                key={index}
                                className="relative"
                              >
                                <img
                                  src={src}
                                  alt="preview"
                                  className="h-24 w-24 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeImage(index)
                                  }
                                  className="absolute -top-0 -right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <img
                              src="/gallery-export.svg"
                              className="w-6 h-6"
                            />
                            <div className="text-center text-[#4f4f4f]">
                              {t("products.addImage")}
                              <br />
                              <span className="text-xs">
                                JPG / PNG
                              </span>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>

                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("products.name")}
                    />

                    <Input
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder={t("products.price")}
                    />

                    <div className="flex gap-6">
                      <Input
                        disabled
                        readOnly
                        name="priceAfterDiscount"
                        value={formData.priceAfterDiscount}
                        placeholder={t(
                          "products.priceAfterDiscount"
                        )}
                      />
                      <Input
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        placeholder={t("products.discount")}
                      />
                    </div>

                    <Input
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder={t("products.quantity")}
                    />

                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder={t("products.description")}
                    />

                    <div className="flex gap-3">
                      <Input
                        name="height"
                        onChange={handleChange}
                        placeholder={t("products.height")}
                      />
                      <Input
                        name="width"
                        onChange={handleChange}
                        placeholder={t("products.width")}
                      />
                      <Input
                        name="length"
                        onChange={handleChange}
                        placeholder={t("products.length")}
                      />
                    </div>

                    <Input
                      name="material"
                      value={formData.material}
                      onChange={handleChange}
                      placeholder={t("products.material")}
                    />
                  </CardContent>
                </Card>

                <Button
                  onClick={handleSubmit}
                  className="h-14 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1),rgba(211,186,164,1))]"
                >
                  {t("products.save")}
                </Button>
              </div>

              {/* PREVIEW */}
              <Card className="w-[377px] bg-[#fefefe] rounded-[22px] border-0 shadow-none">
                <CardContent className="p-8">
                  <Card className="border rounded-3xl overflow-hidden">
                    <div className="relative h-[271px] bg-[#f2f2f2] flex items-center justify-center">
                      {imagePreviews[0] ? (
                        <img
                          src={imagePreviews[0]}
                          className="h-full object-contain"
                        />
                      ) : (
                        <ImageIcon className="w-[126px] h-[126px] text-gray-400" />
                      )}
                    </div>

                    <CardContent className="p-3">
                      <h3 className="font-bold">
                        {formData.name ||
                          t("products.previewName")}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formData.description ||
                          t("products.previewDescription")}
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
          onContinue={() => navigate("/products")}
        />
      )}
    </Layout>
  );
};
