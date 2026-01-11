import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { useTranslation } from "react-i18next";
import api from "../../Api/Axios";

import { ProductList } from "./ProductList";
import { ProductsPage } from "./ProductsPage";
import { Skeleton } from "@heroui/react";
import { DashboardSkeleton } from "../../components/skeleton";

/* ---------------- Loader Component ---------------- */
const Loader = ({ text }) => (
  <div className="flex items-center justify-center h-64">
    <span className="text-gray-500 text-lg">
      {text}
    </span>
  </div>
);

/* ---------------- Product Page ---------------- */
export const ProductPage = () => {
  const { t, i18n } = useTranslation();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const res = await api.get("/api/vendor/products/recent");

        if (res.data?.success) {
          const mappedProducts = res.data.data.map((item) => {
            const isHidden =
              item.status === "SUSPENDED" || item.status === "INACTIVE";

            let status = t("products.status.active");
            let statusBg = "bg-emerald-50";
            let statusColor = "text-[#005b10]";
            let suggestion = t("products.suggestion.restock");

            if (item.status === "INACTIVE") {
              status = t("products.status.inactive");
              statusBg = "bg-[#f4f4f4]";
              statusColor = "text-[#4f4f4f]";
              suggestion = t("products.suggestion.inactive");
            }

            return {
              id: item.id,
              image: "/203-1-11.png",
              name: item.name,
              material: item.material,
              description: item.description,
              price: item.price,
              originalPrice: item.originalPrice,
              salePrice: item.salePrice,
              category: item.categoryName,
              quantity: item.stockQuantity,
              minStock: 400,
              status,
              statusBg,
              statusColor,
              lastModified: new Date(item.createdAt).toLocaleDateString(
                i18n.language === "ar" ? "ar-EG" : "en-US"
              ),
              suggestion,
              isHidden,
              visibilityIcon: "/component-1.svg",
            };
          });

          setProducts(mappedProducts);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to load recent products", error);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchRecentProducts();
  }, [i18n.language]);

  const hasProducts = products.length > 0;

  return (
    <Layout>
      <div className="flex flex-col gap-6">

        {/* 🔥 Loading */}
        {loadingProducts ? (
         <DashboardSkeleton />
        ) : hasProducts ? (
          <ProductList products={products} />
        ) : (
          <ProductsPage />
        )}

      </div>
    </Layout>
  );
};
