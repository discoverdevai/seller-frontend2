import React from "react";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";

export const InventoryDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  const detailsData = [
    { label: "الرمز التعريفي", value: product.id, type: "text" },
    { label: "الفئة", value: product.category, type: "text" },
    { label: "الكمية الحالية", value: product.quantity, type: "text" },
    { label: "الحد الادنى", value: product.minStock, type: "text" },
    { label: "الحالة", value: product.status, type: "badge" },
    { label: "اخر تعديل للمنتج", value: product.lastModified, type: "text" },
    {
      label: "اقتراح اعادة التخزين",
      value: product.suggestion,
      type: "suggestion",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#fefefe] w-[705px] min-h-[547px] rounded-xl relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-xl text-gray-500"
        >
          ✕
        </button>

        <div className="mt-6 w-full px-6 flex flex-col items-start gap-6">
          <h1 className="text-xl font-semibold text-center w-full">
            تفاصيل المخزون من المنتج
          </h1>

          <Card className="w-full border-none shadow-none">
            <CardContent className="p-0 flex flex-col">

              {/* Product Header */}
              <div className="flex items-center justify-start gap-3 py-3 border-b border-[#f2f2f2]">
                <div className="font-medium">
                  {product.name}
                </div>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[68px] h-[71px] rounded-[10px] object-cover"
                />
              </div>

              {detailsData.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start gap-3 py-3 border-b border-[#f2f2f2]"
                >
                  {detail.type === "badge" ? (
                    <>
                      
                      <span>{detail.label} :</span>
                      <Badge className="bg-emerald-50 text-[#005b10] rounded-[10px] px-3">
                        {detail.value}
                      </Badge>
                    </>
                  ) : detail.type === "suggestion" ? (
                    <div className="text-right w-full">
                      <strong>{detail.label} :</strong> {detail.value}
                    </div>
                  ) : (
                    <div>
                      <strong>{detail.label} :</strong> {detail.value}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
