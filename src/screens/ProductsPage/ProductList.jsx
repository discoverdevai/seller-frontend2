import { SearchIcon, UserIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import api from "../../Api/Axios"; // axios instance اللي انت عامله


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {DeleteProductModal} from "./DeleteProductModal"

import { Layout } from "../../components/Layout";

import { useEffect, useState } from "react";
import { ProductDetailsModal } from "./ProductDetailsModal";
import{ProductVisibilityModal} from "./ProductVisibilityModal"
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DashboardSkeleton } from "../../components/skeleton";





const sidebarIcons = [
  { icon: "/home.svg", alt: "Home" },
  { icon: "/mask-group.png", alt: "Mask group" },
  { icon: "/mask-group-1.png", alt: "Mask group" },
  { icon: "/mask-group-2.png", alt: "Mask group", active: true },
  { icon: "/chart.svg", alt: "Chart" },
  { icon: "/presention-chart-style7.svg", alt: "Presention chart" },
];

const tableHeaders = (t) => [
  { label: t("products.table.image"), width: "w-[94px]" },
  { label: t("products.table.name"), width: "w-[120px]" },
  { label: t("products.table.sku"), width: "w-[100px]" },
  { label: t("products.table.category"), width: "w-[103px]" },
  { label: t("products.table.quantity"), width: "w-[120px]" },
  { label: t("products.table.minStock"), width: "w-[126px]" },
  { label: t("products.table.status"), width: "w-[107px]" },
  { label: t("products.table.lastModified"), width: "w-[137px]" },
  { label: t("products.table.suggestion"), width: "w-[204px]" },
  { label: t("products.table.actions"), width: "w-[177px]" },
];






export const ProductList = ({ products }) => {
const { t, i18n } = useTranslation();

  const headers = tableHeaders(t);



const statisticsUIMap = useMemo(() => ({
  ALL_PRODUCTS: {
        title: t("statistics.all"),
        unit: t("statistics.unit"),
        bgColor: "bg-[#f3f5fe]",
        textColor: "text-[#0b27a5]",
        iconBg: "bg-[#0b27a5]",
        icon: "/mask-group-6 copy.png",
      },
      AVAILABLE_PRODUCTS: {
        title: t("statistics.available"),
        unit: t("statistics.unit"),
        bgColor: "bg-emerald-50",
        textColor: "text-[#005b10]",
        iconBg: "bg-[#005b10]",
        icon: "/mask-group-6.png",
      },
      LOW_STOCK_PRODUCTS: {
        title: t("statistics.lowStock"),
        unit: t("statistics.unit"),
        bgColor: "bg-[#fffcf3]",
        textColor: "text-[#926e00]",
        iconBg: "bg-[#ffc107]",
        icon: "/mask-group-5.png",
      },
      NOT_AVAILABLE_PRODUCTS: {
        title: t("statistics.notAvailable"),
        unit: t("statistics.unit"),
        bgColor: "bg-[#fff3f3]",
        textColor: "text-[#b90000]",
        iconBg: "bg-[#b90000]",
        icon: "/mask-group-4.png",
      },
      HIDDEN_PRODUCTS: {
        title: t("statistics.hidden"),
        unit: t("statistics.unit"),
        bgColor: "bg-[#f4f4f4]",
        textColor: "text-[#4f4f4f]",
        iconBg: "bg-[#4f4f4f]",
        icon: "/mask-group-3.png",
      },
    }),
    [t, i18n.language]
  );
  const handleCloseModal = (refresh) => {
  setIsOpen(false);
  if (refresh) window.location.reload();
;
};

const filterColumns = [
  { key: "name", label: t("products.table.name") },
  { key: "id", label: t("products.table.sku") },
  { key: "category", label: t("products.table.category") },
  { key: "status", label: t("products.table.status") },
  { key: "quantity", label: t("products.table.quantity") },
];
const [activeColumns, setActiveColumns] = useState(
  filterColumns.map((c) => c.key) // all enabled by default
);
const toggleColumn = (key) => {
  setActiveColumns((prev) =>
    prev.includes(key)
      ? prev.filter((c) => c !== key)
      : [...prev, key]
  );
};


useEffect(() => {

  const fetchStatistics = async () => {
    try {
      const res = await api.get("/api/vendor/products/statistics");

      if (res.data.success) {
        const cards = res.data.data.statistics.map((item) => {
          const ui = statisticsUIMap[item.type];

          return {
            ...ui,
            count: item.count,
          };
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
}, [i18n.language]);



  const [statsCards, setStatsCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

const [loadingStats, setLoadingStats] = useState(true);
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);

const [isDeleteOpen, setIsDeleteOpen] = useState(false);
const [productToDelete, setProductToDelete] = useState(null);

const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
const [productToToggleVisibility, setProductToToggleVisibility] = useState(null);
const [filterOpen, setFilterOpen] = useState(false);




const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = useMemo(() => {
  if (!searchTerm.trim()) return products;

  const lowerSearch = searchTerm.toLowerCase();

  return products.filter((product) =>
    activeColumns.some((key) =>
      String(product[key] ?? "")
        .toLowerCase()
        .includes(lowerSearch)
    )
  );
}, [products, searchTerm, activeColumns]);



  if (loadingStats) {
    return <DashboardSkeleton />;
  }
  return (
    
    // <Layout>

         <div className="bg-white flex min-h-screen" dir="rtl">
    

      <div className="flex-1 flex flex-col">
      

        <main className="flex-1 bg-[#fefefe] p-12">
          <div className="flex flex-col gap-8 max-w-[1288px]">
            <h1 className="font-h2-semiboald font-[number:var(--h2-semiboald-font-weight)] text-black text-[length:var(--h2-semiboald-font-size)] tracking-[var(--h2-semiboald-letter-spacing)] leading-[var(--h2-semiboald-line-height)] [font-style:var(--h2-semiboald-font-style)]">
             {t("products.title")}
            </h1>

            <div className="flex flex-col gap-12">
              <div className="flex items-center gap-6">
  {loadingStats ? (
    <div className="text-gray-500">{t("products.loadingStats")}</div>
  ) : (
    statsCards.map((card, index) => (
      <div
        key={index}
        className={`${card.bgColor} rounded-[10px] overflow-hidden h-20 flex-1`}
      >
        <div className="flex items-center justify-center gap-3 p-4">
          <div className="flex flex-col items-end justify-center gap-2">
            <div className="font-h-5 text-[#1a1713]">
              {card.title}
            </div>

            <div className="flex items-center gap-2">
              <div className={`${card.textColor} text-2xl`}>
                <span className="font-semibold">{card.count}</span>
                <span className="text-base"> {card.unit}</span>
              </div>
            </div>
          </div>

          <div
            className={`${card.iconBg} flex w-11 h-11 items-center justify-center rounded-full rotate-180`}
          >
            <img
              className="w-6 h-6 -rotate-180"
              alt={card.title}
              src={card.icon}
            />
          </div>
        </div>
      </div>
    ))
  )}
</div>


              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <Button  onClick={() => navigate("/addProduct")}  className="w-[376px] h-14 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] font-button-text font-[number:var(--button-text-font-weight)] text-white text-[length:var(--button-text-font-size)] tracking-[var(--button-text-letter-spacing)] leading-[var(--button-text-line-height)] [font-style:var(--button-text-font-style)]">
                  {t("products.addNew")}
                  </Button>

              <div className="flex items-center gap-3 relative">

  {/* ================= FILTER DROPDOWN ================= */}
  {filterOpen && (
    <div className="absolute top-16 right-0 bg-white rounded-2xl shadow-xl border border-[#f1f2f4] p-4 w-64 z-50 animate-in fade-in zoom-in-95">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-[#1a1713]">
          {t("products.filterBy")}
        </h4>

        <span className="text-xs text-[#805b3c] font-medium">
          {activeColumns.length} {t("products.selected")}
        </span>
      </div>

      <div className="h-px bg-[#f1f2f4] mb-3" />

      {/* Columns */}
      <div className="flex flex-col gap-2">
        {filterColumns.map((col) => {
          const checked = activeColumns.includes(col.key);

          return (
            <label
              key={col.key}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
                ${checked ? "bg-[#faf7f4]" : "hover:bg-[#fafafa]"}
              `}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleColumn(col.key)}
                className="accent-[#805b3c] w-4 h-4"
              />
              <span className="text-sm text-[#1a1713]">
                {col.label}
              </span>
            </label>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setActiveColumns(filterColumns.map(c => c.key))}
          className="text-xs text-[#805b3c] hover:underline"
        >
          {t("products.selectAll")}
        </button>

        <button
          onClick={() => setActiveColumns([])}
          className="text-xs text-[#b90000] hover:underline"
        >
          {t("products.clear")}
        </button>
      </div>

    </div>
  )}

  {/* ================= FILTER ICON ================= */}
  <button
    onClick={() => setFilterOpen((prev) => !prev)}
    className={`relative rounded-xl transition p-1
      ${filterOpen || activeColumns.length !== filterColumns.length
        ? "bg-[#faf7f4]"
        : "hover:bg-[#f4f4f4]"
      }
    `}
  >
    <img
      className="w-12"
      alt="Filter"
      src="/frame-1984081823.svg"
    />

    {/* Active filters badge */}
    {activeColumns.length !== filterColumns.length && (
      <span className="absolute -top-1 -right-1 bg-[#805b3c] text-white text-[10px] rounded-full px-2 py-[2px]">
        {activeColumns.length}
      </span>
    )}
  </button>

  {/* ================= SEARCH INPUT ================= */}
  <div className="flex items-center gap-2 px-4 py-3 rounded-[12px] border border-[#c3c3c3] w-[501px] bg-white focus-within:border-[#805b3c] transition">
    <SearchIcon className="w-5 h-5 text-[#4f4f4f]" />
    <Input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder={t("products.search")}
      className="border-0 p-0 text-[#1a1713] placeholder:text-[#9a9a9a] focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  </div>

</div>

                </div>

                <div className="flex flex-col">
                  <Table>
                    {filteredProducts.length === 0 && (
  <TableRow>
    <TableCell
      colSpan={headers.length}
      className="text-center text-gray-500 h-24"
    >
      {t("products.noResults")}
    </TableCell>
  </TableRow>
)}
                    <TableHeader>
                      <TableRow className="border-0">
                        {headers.map((header, index) => (
                          <TableHead
                            key={index}
                            className={`${header.width} h-12 ${
                              index === 0
                                ? "bg-[#f3f3f3] rounded-tr-[8px] border-l border-solid border-[#f1f2f4]"
                                : index === tableHeaders.length - 1
                                  ? "bg-[#f3f3f3] rounded-tl-[8px] border-r border-solid border-[#f1f2f4]"
                                  : index === 6
                                    ? "bg-[#f4f4f4] border-r border-solid border-[#f1f2f4]"
                                    : "bg-[#f3f3f3] border-l border-solid border-[#f1f2f4]"
                            } font-[number:var(--h-5-font-weight)] text-[#121212] text-[length:var(--h-5-font-size)] text-center leading-[var(--h-5-line-height)] font-h-5 tracking-[var(--h-5-letter-spacing)] [font-style:var(--h-5-font-style)]`}
                          >
                            {header.label}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((row, rowIndex) => (
                        <TableRow
                          key={rowIndex}
                          className={`border-0 ${row.isHidden ? "opacity-50" : ""}`}
                        >
                          <TableCell className="w-[94px] h-16 border border-solid border-[#f1f2f4] p-0">
                            <div className="flex items-center justify-center h-full">
                              <img
                                className="w-[46px] h-12 rounded-[10px] object-cover"
                                alt="Element"
                                src={row.image}
                              />
                            </div>
                          </TableCell>

                          <TableCell  className="w-[120px] h-16 border border-solid border-[#f1f2f4] text-center font-medium text-[#121212] text-sm leading-[14px] [font-family:'Cairo',Helvetica] tracking-[0]">
                           <Button onClick={() => {
    setSelectedProduct(row);
    setIsOpen(true);
  }}> {row.name}</Button>
                           
                          </TableCell>

                          <TableCell className="w-[100px] h-16 border border-solid border-[#f1f2f4] text-center [font-family:'Cairo',Helvetica] font-medium text-[#121212] text-sm tracking-[0] leading-[14px]">
                            {row.id}
                          </TableCell>

                          <TableCell className="w-[103px] h-16 border border-solid border-[#f1f2f4] text-center font-medium text-[#121212] text-sm leading-[14px] [font-family:'Cairo',Helvetica] tracking-[0]">
                            {row.category}
                          </TableCell>

                          <TableCell className="w-[120px] h-16 border border-solid border-[#f1f2f4] text-center [font-family:'Cairo',Helvetica] font-medium text-[#121212] text-sm tracking-[0] leading-[14px]">
                            {row.quantity}
                          </TableCell>

                          <TableCell className="w-[126px] h-16 border border-solid border-[#f1f2f4] text-center [font-family:'Cairo',Helvetica] font-medium text-[#121212] text-sm tracking-[0] leading-[14px]">
                            {row.minStock}
                          </TableCell>

                          <TableCell className="w-[107px] h-16 border border-solid border-[#f1f2f4] p-0">
                            <div className="flex items-center justify-center h-full">
                              <Badge
                                className={`${row.statusBg} ${row.statusColor} font-medium text-xs text-center leading-3 [font-family:'Cairo',Helvetica] tracking-[0] rounded-[10px] px-2 py-2`}
                              >
                                {row.status}
                              </Badge>
                            </div>
                          </TableCell>

                          <TableCell className="w-[137px] h-16 border border-solid border-[#f1f2f4] text-center [font-family:'Cairo',Helvetica] font-medium text-[#121212] text-sm tracking-[0] leading-[14px]">
                            {row.lastModified}
                          </TableCell>

                          <TableCell className="w-[204px] h-16 border border-solid border-[#f1f2f4] text-center font-medium text-[#121212] text-sm leading-[14px] [font-family:'Cairo',Helvetica] tracking-[0]">
                            {row.suggestion}
                          </TableCell>

                          <TableCell className="w-[177px] h-16 border border-solid border-[#f1f2f4] p-0">
                            <div className="flex items-center justify-center gap-8 h-full">
                              <button   onClick={() => {
    setProductToDelete(row);
    setIsDeleteOpen(true);
  }}>
                                <img
                                  className="w-6 h-6"
                                  alt="Trash"
                                  src="/trash.svg"
                                />
                              </button>

                              <button  onClick={() => {
    setProductToToggleVisibility(row);
    setIsVisibilityOpen(true);
  }}>
                                <img
                                  className="w-6 h-6"
                                  alt="Component"
                                  src={row.visibilityIcon}
                                />
                              </button>

                              <button  onClick={() => {
    setSelectedProduct(row);
    setIsOpen(true);
  }}>
                                <img
                                  className="w-6 h-6"
                                  alt="Edit"
                                  src="/edit-2.svg"
                                />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* ================= MODAL ================= */}
      {isOpen && selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          // onClose={closeModal}
              onClose={handleCloseModal}

        />
      )}

      {isDeleteOpen && productToDelete && (
  <DeleteProductModal
    product={productToDelete}
    onCancel={() => {
      setIsDeleteOpen(false);
      setProductToDelete(null);
    }}
    onConfirm={(product) => {
      console.log("DELETE PRODUCT:", product);

      // هنا API CALL للحذف
      // deleteProduct(product.id)

      setIsDeleteOpen(false);
      setProductToDelete(null);
    }}
  />
)}

{isVisibilityOpen && productToToggleVisibility && (
  <ProductVisibilityModal
    product={productToToggleVisibility}
    onCancel={(refresh) => {
      setIsVisibilityOpen(false);
      setProductToToggleVisibility(null);
      if(refresh){
        window.location.reload();

      }
    }}
    onConfirm={(product) => {
      console.log("TOGGLE VISIBILITY:", product);

      // API CALL
      // toggleVisibility(product.id)

      setIsVisibilityOpen(false);
      setProductToToggleVisibility(null);
    }}
  />
)}


    </div>
    

    // </Layout>
   
  );
  
  
  
  
};
