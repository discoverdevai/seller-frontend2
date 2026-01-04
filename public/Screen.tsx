import { SearchIcon, UserIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const statsCards = [
  {
    title: "منتجات مخفية",
    count: "100",
    unit: "منتج",
    bgColor: "bg-[#f4f4f4]",
    textColor: "text-[#4f4f4f]",
    iconBg: "bg-[#4f4f4f]",
    icon: "/mask-group-3.png",
  },
  {
    title: "غير المتوفرة",
    count: "50",
    unit: "منتج",
    bgColor: "bg-[#fff3f3]",
    textColor: "text-[#b90000]",
    iconBg: "bg-[#b90000]",
    icon: "/mask-group-4.png",
  },
  {
    title: "منخفضة المخزون",
    count: "600",
    unit: "منتج",
    bgColor: "bg-[#fffcf3]",
    textColor: "text-[#926e00]",
    iconBg: "bg-[#ffc107]",
    icon: "/mask-group-5.png",
  },
  {
    title: "المنتجات المتوفرة",
    count: "8250",
    unit: "منتج",
    bgColor: "bg-emerald-50",
    textColor: "text-[#005b10]",
    iconBg: "bg-[#005b10]",
    icon: "/mask-group-6.png",
  },
  {
    title: "إجمالي المنتجات",
    count: "9000",
    unit: "منتج",
    bgColor: "bg-[#f3f5fe]",
    textColor: "text-[#0b27a5]",
    iconBg: "bg-[#0b27a5]",
    icon: "/mask-group-7.png",
  },
];

const sidebarIcons = [
  { icon: "/home.svg", alt: "Home" },
  { icon: "/mask-group.png", alt: "Mask group" },
  { icon: "/mask-group-1.png", alt: "Mask group" },
  { icon: "/mask-group-2.png", alt: "Mask group", active: true },
  { icon: "/chart.svg", alt: "Chart" },
  { icon: "/presention-chart-style7.svg", alt: "Presention chart" },
];

const tableHeaders = [
  { label: "صورة المنتج", width: "w-[94px]" },
  { label: "اسم المنتج", width: "w-[120px]" },
  { label: "الرمز التعريفي", width: "w-[100px]" },
  { label: "الفئة", width: "w-[103px]" },
  { label: "الكمية الحالية", width: "w-[120px]" },
  { label: "الحد الادني", width: "w-[126px]" },
  { label: "الحالة", width: "w-[107px]" },
  { label: "اخر تعديل", width: "w-[137px]" },
  { label: "اقتراح اعادة التخزين", width: "w-[204px]" },
  { label: "الاجراءات", width: "w-[177px]" },
];

const tableData = [
  {
    image: "/203-1-11.png",
    name: "كرسي",
    id: "PRD-001",
    category: "الكراسي",
    quantity: "20000",
    minStock: "400",
    status: "متوفر",
    statusBg: "bg-emerald-50",
    statusColor: "text-[#005b10]",
    lastModified: "12-9-2025",
    suggestion: "أضف 20 قطعة الي مخزونك",
    isHidden: false,
    visibilityIcon: "/component-1.svg",
  },
  {
    image: "/203-1-11.png",
    name: "كرسي",
    id: "PRD-001",
    category: "الكراسي",
    quantity: "20000",
    minStock: "400",
    status: "منخفض",
    statusBg: "bg-[#fff3f3]",
    statusColor: "text-[#b90000]",
    lastModified: "12-9-2025",
    suggestion: "أضف 20 قطعة الي مخزونك",
    isHidden: false,
    visibilityIcon: "/component-1.svg",
  },
  {
    image: "/203-1-11.png",
    name: "كرسي",
    id: "PRD-001",
    category: "الكراسي",
    quantity: "20000",
    minStock: "400",
    status: "مخفي",
    statusBg: "bg-[#f4f4f4]",
    statusColor: "text-[#4f4f4f]",
    lastModified: "12-9-2025",
    suggestion: "المنتج مخفي من قبل المتجر",
    isHidden: true,
    visibilityIcon: "/component-1-8.svg",
  },
  {
    image: "/203-1-11.png",
    name: "كرسي",
    id: "PRD-001",
    category: "الكراسي",
    quantity: "20000",
    minStock: "400",
    status: "متوفر",
    statusBg: "bg-emerald-50",
    statusColor: "text-[#005b10]",
    lastModified: "12-9-2025",
    suggestion: "أضف 20 قطعة الي مخزونك",
    isHidden: false,
    visibilityIcon: "/component-1.svg",
  },
  {
    image: "/203-1-11.png",
    name: "كرسي",
    id: "PRD-001",
    category: "الكراسي",
    quantity: "20000",
    minStock: "400",
    status: "متوفر",
    statusBg: "bg-emerald-50",
    statusColor: "text-[#005b10]",
    lastModified: "12-9-2025",
    suggestion: "أضف 20 قطعة الي مخزونك",
    isHidden: false,
    visibilityIcon: "/component-1.svg",
  },
  {
    image: "/203-1-11.png",
    name: "كرسي",
    id: "PRD-001",
    category: "الكراسي",
    quantity: "20000",
    minStock: "400",
    status: "متوفر",
    statusBg: "bg-emerald-50",
    statusColor: "text-[#005b10]",
    lastModified: "12-9-2025",
    suggestion: "أضف 20 قطعة الي مخزونك",
    isHidden: false,
    visibilityIcon: "/component-1.svg",
  },
  {
    image: "/203-1-11.png",
    name: "كرسي",
    id: "PRD-001",
    category: "الكراسي",
    quantity: "20000",
    minStock: "400",
    status: "متوفر",
    statusBg: "bg-emerald-50",
    statusColor: "text-[#005b10]",
    lastModified: "12-9-2025",
    suggestion: "أضف 20 قطعة الي مخزونك",
    isHidden: false,
    visibilityIcon: "/component-1.svg",
  },
  {
    image: "/203-1-11.png",
    name: "كرسي",
    id: "PRD-001",
    category: "الكراسي",
    quantity: "20000",
    minStock: "400",
    status: "متوفر",
    statusBg: "bg-emerald-50",
    statusColor: "text-[#005b10]",
    lastModified: "12-9-2025",
    suggestion: "أضف 20 قطعة الي مخزونك",
    isHidden: false,
    visibilityIcon: "/component-1.svg",
  },
  {
    image: "/203-1-11.png",
    name: "كرسي",
    id: "PRD-001",
    category: "الكراسي",
    quantity: "20000",
    minStock: "400",
    status: "متوفر",
    statusBg: "bg-emerald-50",
    statusColor: "text-[#005b10]",
    lastModified: "12-9-2025",
    suggestion: "أضف 20 قطعة الي مخزونك",
    isHidden: false,
    visibilityIcon: "/component-1.svg",
  },
  {
    image: "/203-1-11.png",
    name: "كرسي",
    id: "PRD-001",
    category: "الكراسي",
    quantity: "20000",
    minStock: "400",
    status: "متوفر",
    statusBg: "bg-emerald-50",
    statusColor: "text-[#005b10]",
    lastModified: "12-9-2025",
    suggestion: "أضف 20 قطعة الي مخزونك",
    isHidden: false,
    visibilityIcon: "/component-1.svg",
  },
  {
    image: "/203-1-11.png",
    name: "كرسي",
    id: "PRD-001",
    category: "الكراسي",
    quantity: "20000",
    minStock: "400",
    status: "متوفر",
    statusBg: "bg-emerald-50",
    statusColor: "text-[#005b10]",
    lastModified: "12-9-2025",
    suggestion: "أضف 20 قطعة الي مخزونك",
    isHidden: false,
    visibilityIcon: "/component-1.svg",
  },
];

export const Screen = (): JSX.Element => {
  return (
    <div className="bg-white flex min-h-screen" dir="rtl">
      <aside className="w-[104px] bg-[#835f40] flex flex-col items-center py-8 px-4 gap-8">
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center justify-center px-[42px] py-5 rounded-[15px] border border-solid border-[#fefefe] h-[42px] w-full">
            <div className="font-normal text-[#fefefe] text-xl leading-5 [font-family:'Cairo',Helvetica] text-center tracking-[0] whitespace-nowrap">
              اللوجو
            </div>
          </div>
        </div>

        <nav className="flex flex-col items-center gap-4 w-[58px]">
          {sidebarIcons.map((item, index) => (
            <button
              key={index}
              className={`flex items-center justify-center p-2 rounded-[10px] w-[58px] h-[58px] ${
                item.active ? "bg-[#fefefe]" : ""
              }`}
            >
              <img className="w-6 h-6" alt={item.alt} src={item.icon} />
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-20 bg-[#fefefe] border-b border-solid border-[#f2f2f2] flex items-center px-12">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-6">
              <Button
                variant="outline"
                size="icon"
                className="rounded-[50px] border-[#1a1713]"
              >
                <UserIcon className="w-6 h-6" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="rounded-[50px] border-[#1a1713]"
              >
                <div className="w-6 h-6 bg-[url(/notification.svg)] bg-[100%_100%]" />
              </Button>
            </div>

            <div className="flex items-center gap-2 px-3 py-4 rounded-[10px] border border-solid border-[#c3c3c3] w-[812px]">
              <SearchIcon className="w-6 h-6" />
              <Input
                placeholder="البحث"
                className="border-0 font-[number:var(--placeholder-font-weight)] text-[#4f4f4f] text-[length:var(--placeholder-font-size)] leading-[var(--placeholder-line-height)] font-placeholder tracking-[var(--placeholder-letter-spacing)] [font-style:var(--placeholder-font-style)] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 bg-[#fefefe] p-12">
          <div className="flex flex-col gap-8 max-w-[1288px]">
            <h1 className="font-h2-semiboald font-[number:var(--h2-semiboald-font-weight)] text-black text-[length:var(--h2-semiboald-font-size)] tracking-[var(--h2-semiboald-letter-spacing)] leading-[var(--h2-semiboald-line-height)] [font-style:var(--h2-semiboald-font-style)]">
              المخزون
            </h1>

            <div className="flex flex-col gap-12">
              <div className="flex items-center gap-6">
                {statsCards.map((card, index) => (
                  <div
                    key={index}
                    className={`${card.bgColor} rounded-[10px] overflow-hidden h-20 flex-1`}
                  >
                    <div className="flex items-center justify-center gap-3 p-4">
                      <div className="flex flex-col items-end justify-center gap-2">
                        <div className="font-[number:var(--h-5-font-weight)] text-[#1a1713] text-[length:var(--h-5-font-size)] leading-[var(--h-5-line-height)] font-h-5 tracking-[var(--h-5-letter-spacing)] [font-style:var(--h-5-font-style)]">
                          {card.title}
                        </div>

                        <div className="flex items-center gap-2">
                          <div
                            className={`${card.textColor} [font-family:'Cairo',Helvetica] font-normal text-2xl tracking-[0] leading-6 whitespace-nowrap`}
                          >
                            <span className="font-semibold">{card.count} </span>
                            <span className="font-medium text-base leading-4">
                              {card.unit}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${card.iconBg} flex w-11 h-11 items-center justify-center p-2 rounded-[50px] rotate-180`}
                      >
                        <img
                          className="w-6 h-6 -rotate-180"
                          alt={card.title}
                          src={card.icon}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <Button className="w-[376px] h-14 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] font-button-text font-[number:var(--button-text-font-weight)] text-white text-[length:var(--button-text-font-size)] tracking-[var(--button-text-letter-spacing)] leading-[var(--button-text-line-height)] [font-style:var(--button-text-font-style)]">
                    إضافة منتج جديد
                  </Button>

                  <div className="flex items-center gap-3">
                    <img
                      className="w-14"
                      alt="Frame"
                      src="/frame-1984081823.svg"
                    />

                    <div className="flex items-center gap-2 px-3 py-4 rounded-[10px] border border-solid border-[#c3c3c3] w-[501px]">
                      <SearchIcon className="w-6 h-6" />
                      <Input
                        placeholder="البحث"
                        className="border-0 font-[number:var(--placeholder-font-weight)] text-[#4f4f4f] text-[length:var(--placeholder-font-size)] leading-[var(--placeholder-line-height)] font-placeholder tracking-[var(--placeholder-letter-spacing)] [font-style:var(--placeholder-font-style)] focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-0">
                        {tableHeaders.map((header, index) => (
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
                      {tableData.map((row, rowIndex) => (
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

                          <TableCell className="w-[120px] h-16 border border-solid border-[#f1f2f4] text-center font-medium text-[#121212] text-sm leading-[14px] [font-family:'Cairo',Helvetica] tracking-[0]">
                            {row.name}
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
                              <button>
                                <img
                                  className="w-6 h-6"
                                  alt="Trash"
                                  src="/trash.svg"
                                />
                              </button>

                              <button>
                                <img
                                  className="w-6 h-6"
                                  alt="Component"
                                  src={row.visibilityIcon}
                                />
                              </button>

                              <button>
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
    </div>
  );
};
