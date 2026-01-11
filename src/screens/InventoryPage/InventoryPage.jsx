import { SearchIcon, UserIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import api from "../../Api/Axios"; // axios instance اللي انت عامله
import { DashboardSkeleton } from "../../components/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { DeleteProductModal } from "../ProductsPage/DeleteProductModal";

import { Layout } from "../../components/Layout";

import { useEffect, useState } from "react";
import { ProductDetailsModal } from "../ProductsPage/ProductDetailsModal";
import { ProductVisibilityModal } from "../ProductsPage/ProductVisibilityModal";
import { useTranslation } from "react-i18next";

const statisticsUIMap = {
  ALL_PRODUCTS: {
    titleKey: "inventory.stats.allProducts",
    unitKey: "inventory.unit.product",
    bgColor: "bg-[#f3f5fe]",
    textColor: "text-[#0b27a5]",
    iconBg: "bg-[#0b27a5]",
    icon: "/mask-group-7.png",
  },

  AVAILABLE_PRODUCTS: {
    titleKey: "inventory.stats.availableProducts",
    unitKey: "inventory.unit.product",
    bgColor: "bg-emerald-50",
    textColor: "text-[#005b10]",
    iconBg: "bg-[#005b10]",
    icon: "/mask-group-6.png",
  },

  LOW_STOCK_PRODUCTS: {
    titleKey: "inventory.stats.lowStockProducts",
    unitKey: "inventory.unit.product",
    bgColor: "bg-[#fffcf3]",
    textColor: "text-[#926e00]",
    iconBg: "bg-[#ffc107]",
    icon: "/mask-group-5.png",
  },

  NOT_AVAILABLE_PRODUCTS: {
    titleKey: "inventory.stats.notAvailableProducts",
    unitKey: "inventory.unit.product",
    bgColor: "bg-[#fff3f3]",
    textColor: "text-[#b90000]",
    iconBg: "bg-[#b90000]",
    icon: "/mask-group-4.png",
  },

  HIDDEN_PRODUCTS: {
    titleKey: "inventory.stats.hiddenProducts",
    unitKey: "inventory.unit.product",
    bgColor: "bg-[#f4f4f4]",
    textColor: "text-[#4f4f4f]",
    iconBg: "bg-[#4f4f4f]",
    icon: "/mask-group-3.png",
  },
};

const tableHeaders = [
  { labelKey: "inventory.table.productImage", width: "w-[94px]" },
  { labelKey: "inventory.table.productName", width: "w-[120px]" },
  { labelKey: "inventory.table.productCode", width: "w-[100px]" },
  { labelKey: "inventory.table.category", width: "w-[103px]" },
  { labelKey: "inventory.table.quantity", width: "w-[120px]" },
  { labelKey: "inventory.table.minStock", width: "w-[126px]" },
  { labelKey: "inventory.table.status", width: "w-[107px]" },
  { labelKey: "inventory.table.lastUpdate", width: "w-[137px]" },
  { labelKey: "inventory.table.restockSuggestion", width: "w-[204px]" },
];

export const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const res = await api.get("/api/vendor/products/recent");

        if (res.data.success) {
          const mappedProducts = res.data.data.map((item) => {
            const isHidden = item.status === "SUSPENDED";
            const isLowStock =
              item.stockQuantity <= 400 && item.stockQuantity > 0;
            const isOutOfStock = item.stockQuantity === 0;

            let status = t("inventory.status.available");
            let statusBg = "bg-emerald-50";
            let statusColor = "text-[#005b10]";
            let suggestion = t("inventory.suggestion.available");

            if (isHidden) {
              status = t("inventory.status.hidden");
              statusBg = "bg-[#f4f4f4]";
              statusColor = "text-[#4f4f4f]";
              suggestion = t("inventory.suggestion.hidden");
            } else if (isOutOfStock) {
              status = t("inventory.status.outOfStock");
              statusBg = "bg-[#fff3f3]";
              statusColor = "text-[#b90000]";
              suggestion = t("inventory.suggestion.outOfStock");
            } else if (isLowStock) {
              status = t("inventory.status.lowStock");
              statusBg = "bg-[#fff3f3]";
              statusColor = "text-[#b90000]";
              suggestion = t("inventory.suggestion.lowStock");
            }

            return {
              image: "/203-1-11.png",
              name: item.name,
              id: item.id,
              category: item.categoryName,
              quantity: item.stockQuantity,
              minStock: 400,
              status,
              statusBg,
              statusColor,
              lastModified: new Date(
                item.createdAt
              ).toLocaleDateString(),
              suggestion,
              isHidden,
              visibilityIcon: isHidden
                ? "/component-1-8.svg"
                : "/component-1.svg",
            };
          });

          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Failed to load recent products", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchRecentProducts();
  }, [t]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await api.get("/api/vendor/products/statistics");

        if (res.data.success) {
          const cards = res.data.data.statistics.map((item) => {
            const ui = statisticsUIMap[item.type];
            return { ...ui, count: item.count };
          });

          setStatsCards(cards);
        }
      } catch (error) {
        console.error("Failed to load order statistics", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStatistics();
  }, []);

  const [statsCards, setStatsCards] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
  const [productToToggleVisibility, setProductToToggleVisibility] =
    useState(null);

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  if (loadingStats) {
    return <Layout><DashboardSkeleton /></Layout>;
  }

  return (
    <Layout>
      <div className="bg-white flex min-h-screen" dir="rtl">
        <div className="flex-1 flex flex-col">
          <main className="flex-1 bg-[#fefefe] p-12">
            <div className="flex flex-col gap-8 max-w-[1288px]">
              <h1 className="font-h2-semiboald text-black">
                {t("inventory.title")}
              </h1>

              <div className="flex items-center gap-6">
                {loadingStats ? (
                  <div className="text-gray-500">
                    {t("inventory.loadingStats")}
                  </div>
                ) : (
                  statsCards.map((card, index) => (
                    <div
                      key={index}
                      className={`${card.bgColor} rounded-[10px] h-20 flex-1`}
                    >
                      <div className="flex items-center justify-center gap-3 p-4">
                        <div className="flex flex-col items-start gap-2">
                          <div>{t(card.titleKey)}</div>
                          <div className={`${card.textColor} text-2xl`}>
                            <span className="font-semibold">
                              {card.count}
                            </span>{" "}
                            {t(card.unitKey)}
                          </div>
                        </div>

                        <div
                          className={`${card.iconBg} flex w-11 h-11 items-center justify-center rounded-full rotate-180`}
                        >
                          <img
                            className="w-6 h-6 -rotate-180"
                            alt=""
                            src={card.icon}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between">
                <Button
                  onClick={() => navigate("/addProduct")}
                  className="w-[376px] h-14 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] text-white"
                >
                  {t("inventory.addProduct")}
                </Button>

                <div className="flex items-center gap-2 px-3 py-4 rounded-[10px] border w-[501px]">
                  <SearchIcon className="w-6 h-6" />
                  <Input
                    placeholder={t("inventory.search")}
                    className="border-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              <Table className="text-center">
                <TableHeader className="text-center">
                  <TableRow className="border-0 text-center">
                    {tableHeaders.map((header, index) => (
                      <TableHead key={index} className={header.width}>
                        {t(header.labelKey)}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {products.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      className={`border-0 ${
                        row.isHidden ? "opacity-50" : ""
                      }`}
                    >
                      <TableCell>
                        <img
                          src={row.image}
                          className="w-[46px] h-12 rounded-[10px]"
                        />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.minStock}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${row.statusBg} ${row.statusColor}`}
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{row.lastModified}</TableCell>
                      <TableCell>{row.suggestion}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};
