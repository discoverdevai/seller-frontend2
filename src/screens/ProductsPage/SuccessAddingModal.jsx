import React from "react";
import { Button } from "../../components/ui/button";

export const SuccessModal = ({ onClose, onContinue }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#fefefe] w-full max-w-[705px] min-h-[498px] flex items-center justify-center rounded-xl">
        <div className="w-full max-w-[657px] px-6 py-8">
          <div className="flex flex-col items-center gap-6">
            <img
              className="w-[278px] h-[278px] object-cover"
              alt="Success illustration"
              src="/addedsuccsessfully.png"
            />

            <div className="flex flex-col items-center gap-6 w-full">
              <div className="flex flex-col items-center gap-4 w-full">
                <h1 className="font-bold text-[#1a1713] text-xl text-center [direction:rtl]">
                  تمت الإضافة بنجاح !
                </h1>

                <p className="text-[#4f4f4f] text-center [direction:rtl]">
                  تمت إضافة المنتج إلى متجرك وهو الآن متاح للعرض ضمن قائمة
                  المنتجات.
                </p>
              </div>

              <div className="flex items-center gap-6 w-full">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full h-14 rounded-[10px]"
                >
                  الغاء
                </Button>

                <Button
                  onClick={onContinue}
                  className="w-full h-14 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90"
                >
                  الاستمرار
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
