import React from "react";
import { Badge } from "../../components/ui/badge";

export const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const orderDetails = [
    { label: "رقم الطلب :", value: order.id },
    { label: "اسم العميل :", value: order.customer },
    { label: "تاريخ الطلب :", value: order.date },
    { label: "طريقة الدفع :", value: order.payment },
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
            تفاصيل الطلب
          </h3>

          <div className="flex flex-col">
            {orderDetails.map((detail, index) => (
              <div
                key={index}
                className="flex justify-start gap-3 py-3 border-b border-[#f2f2f2]"
              >
               
                <span className="font-medium">
                  {detail.label}
                </span>
                 <span className="font-medium text-xl">
                  {detail.value}
                </span>
              </div>
            ))}

            {/* Status */}
            <div className="flex justify-start gap-3 py-3 border-b border-[#f2f2f2]">
              
              <span className="font-medium">الحالة :</span>
              <Badge className={`${order.statusColor} h-8 px-3 rounded-[10px]`}>
                {order.status}
              </Badge>
            </div>

            {/* Total */}
            <div className="flex justify-start py-3">
              <span className="font-medium">
                الاجمالي : {order.total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
