import React from "react";
import { Card, CardContent } from "../../components/ui/card";

export const ConfirmEditPasswordModal = () => {
  return (
    <div className="bg-[#fefefe] w-[975px] h-[622px] flex items-center justify-center">
      <Card className="w-full max-w-[815px] border-0 shadow-none">
        <CardContent className="flex flex-col items-center gap-4 p-0">
          <img
            className="w-[394px] h-[394px]"
            alt="Element"
            src="/passwordChange.png"
          />

          <div className="flex flex-col items-center gap-8 w-full">
            <h1 className="font-semibold text-[#1a1713] text-[40px] leading-10 text-center [font-family:'Cairo',Helvetica] tracking-[0] [direction:rtl]">
              التغيير قيد المراجعة
            </h1>

            <p className="font-[number:var(--20-paragraph-font-weight)] text-[#4f4f4f] text-[length:var(--20-paragraph-font-size)] leading-[var(--20-paragraph-line-height)] text-center font-20-paragraph tracking-[var(--20-paragraph-letter-spacing)] [direction:rtl] [font-style:var(--20-paragraph-font-style)]">
              تم استلام بيانات متجرك بنجاح. حاليا في انتظار مراجعة وموافقة
              الإدارة على المعلومات المقدمة , بمجرد الموافقة، ستتمكن من تسجيل
              الدخول وبدء إدارة منتجات متجرك بسهولة.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
