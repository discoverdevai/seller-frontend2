import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { useTranslation } from "react-i18next";
import api from "../../Api/Axios";

import { ProductList } from "./ProductList";
import { ProductsPage } from "./ProductsPage";

/* ---------------- Loader Component ---------------- */
const Loader = () => (
  <div className="flex items-center justify-center h-64">
    <span className="text-gray-500 text-lg">
      جاري تحميل المنتجات...
    </span>
  </div>
);

/* ---------------- Product Page ---------------- */
export const ProductPage = () => {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const res = await api.get("/api/vendor/products/recent");

        if (res.data?.success) {
          const mappedProducts = res.data.data.map((item) => {
            const isHidden = item.status === "SUSPENDED";

            let status = "متوفر";
            let statusBg = "bg-emerald-50";
            let statusColor = "text-[#005b10]";
            let suggestion = "أضف إلى مخزونك";

            if (item.status === "INACTIVE") {
              status = "مخفي";
              statusBg = "bg-[#f4f4f4]";
              statusColor = "text-[#4f4f4f]";
              suggestion = "المنتج مخفي من قبل المتجر";
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
              lastModified: new Date(item.createdAt).toLocaleDateString("ar-EG"),
              suggestion,
              isHidden,
              visibilityIcon: isHidden
                ? "/component-1-8.svg"
                : "/component-1.svg",
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
  }, []);

  const hasProducts = products.length > 0;

  return (
    <Layout>
      <div className="flex flex-col gap-6">

        {/* 🔥 Loading */}
        {loadingProducts ? (
          <Loader />
        ) : hasProducts ? (
          <ProductList products={products} />
        ) : (
          <ProductsPage />
        )}

      </div>
    </Layout>
  );
};
