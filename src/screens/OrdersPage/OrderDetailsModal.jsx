import React from "react";
import { Badge } from "../../components/ui/badge";
import { useTranslation } from "react-i18next";

export const OrderDetailsModal = ({ order, onClose }) => {
  const { t } = useTranslation();

  if (!order) return null;

  const orderDetails = [
    { label: t("order.id"), value: order.id },
    { label: t("order.customer_name"), value: order.customer },
    { label: t("order.date"), value: order.date },
    { label: t("order.payment_method"), value: order.payment },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#fefefe] w-[705px] min-h-[368px] rounded-xl relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 text-xl"
        >
          ✕
        </button>

        <div className="mt-6 w-full px-6 flex flex-col gap-6">
          <h3 className="font-semibold text-[#141414] text-xl text-center">
            {t("order.details_title")}
          </h3>

          <div className="flex flex-col">
            {orderDetails.map((detail, index) => (
              <div
                key={index}
                className="flex justify-start gap-3 py-3 border-b border-[#f2f2f2]"
              >
                <span className="font-medium">{detail.label}</span>
                <span className="font-medium text-xl">{detail.value}</span>
              </div>
            ))}

            {/* Status */}
            <div className="flex justify-start gap-3 py-3 border-b border-[#f2f2f2]">
              <span className="font-medium">{t("order.status")} :</span>
              <Badge className={`${order.statusColor} h-8 px-3 rounded-[10px]`}>
                {order.status}
              </Badge>
            </div>

            {/* Total */}
            <div className="flex justify-start py-3">
              <span className="font-medium">
                {t("order.total")} : {order.total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
