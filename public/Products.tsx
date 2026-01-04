import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const Products = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-6 mb-2">
        <Card className="flex-1 bg-[#fefefe] rounded-[22px] border-0 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-end gap-2">
                <div className="inline-flex items-center gap-3">
                  <h4 className="font-h4-medium font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)]">
                    رفع منتجات بالجملة (CSV)
                  </h4>
                  <img
                    className="w-10 h-10 object-cover"
                    alt="Image"
                    src="/image-11.png"
                  />
                </div>
                <p className="[font-family:'Cairo',Helvetica] font-medium text-[#4f4f4f] text-base leading-6 text-right">
                  يمكنك رفع عدة منتجات دفعة واحدة الي متجرك عبر ملف CSV
                </p>
              </div>
              <Button className="h-12 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90">
                <span className="[font-family:'Cairo',Helvetica] font-bold text-[#fefefe] text-base">
                  إضافة منتجات بالجملة
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 bg-[#fefefe] rounded-[22px] border-0 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-end gap-2">
                <div className="inline-flex items-center gap-3">
                  <h4 className="font-h4-medium font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)]">
                    إضافة منتج جديد
                  </h4>
                  <img
                    className="w-10 h-10 object-cover"
                    alt="Image"
                    src="/image-9.png"
                  />
                </div>
                <p className="[font-family:'Cairo',Helvetica] font-medium text-[#4f4f4f] text-base leading-6 text-right">
                  أضف أول منتج إلى متجرك واملأ التفاصيل (الاسم، السعر،
                  الصور، المخزون) .
                </p>
              </div>
              <Button className="h-12 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90">
                <span className="[font-family:'Cairo',Helvetica] font-bold text-[#fefefe] text-base">
                  إضافة منتجات جديدة
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center justify-center gap-[30px] max-w-[700px] mx-auto mt-12">
        <img
          className="w-full h-[500px]"
          alt="Element"
          src="/55024598-9264826-1.svg"
        />
        <div className="flex flex-col items-center gap-4 w-full">
          <p className="[font-family:'Cairo',Helvetica] font-semibold text-[#1a1713] text-xl text-center leading-[30px]">
            لا توجد منتجات بعد. ابدأ بإضافة أول منتج لك لتظهر هنا.
          </p>
        </div>
      </div>
    </div>
  );
};
