import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ar: {
    translation: {
      warning: "تنبيه",
      low_stock_message_with_count: "{{count}} منتجات على وشك النفاد",
      طلب: "طلب",

      منتج: "منتج",

      all_products_title: "إجمالي المنتجات",
      available_products_title: "المنتجات المتوفرة",
      low_stock_products_title: "منخفضة المخزون",
      not_available_products_title: "غير المتوفرة",
      hidden_products_title: "منتجات مخفية",

      //      order_new_title: "طلبات جديدة",
      // order_active_title: "طلبات نشطة",
      // order_completed_title: "طلبات مكتملة",
      // order_canceled_title: "طلبات ملغاة",

      // Dashboard - Low Stock
      low_stock_title: "المنتجات منخفضة المخزون",
      low_stock_message:
        "لديك 5 منتجات أوشكت على النفاد، يرجى تحديث المخزون لتجنب فقدان المبيعات.",
      low_stock_button: "عرض المنتجات",

      // Orders section
      orders_title: "الطلبات",
      this_week: "هذا الاسبوع",

      order_new_title: "الطلبات الجديدة",
      order_new_desc: "طلبات بانتظار المعالجة",

      order_active_title: "الطلبات النشطة",
      order_active_desc: "طلبات قيد التجهيز أو الشحن",

      order_completed_title: "الطلبات المكتملة",
      order_completed_desc: "تم تسليمها بنجاح",

      order_canceled_title: "الطلبات الملغاة",
      order_canceled_desc: "ألغيت من قبل العميل أو المتجر",

      // Sales section
      sales_title: "المبيعات",
      sales_total: "اجمالي المبيعات",
      sales_day: "الاربعاء",
      sales_value: "المبيعات :",

      // Week Days
      saturday: "السبت",
      friday: "الجمعة",
      thursday: "الخميس",
      wednesday: "الاربعاء",
      tuesday: "الثلاثاء",
      monday: "الاثنين",
      sunday: "الاحد",

      // Customers section
      customers_title: "العملاء",
      customer_new: "عملاء جدد",
      customer_active: "عملاء نشطون",
      customer_repeat: "عملاء متكررون",
      customer_inactive: "عملاء غير نشطين",
      customer_vip: "عملاء كبار(VIP)",
      products_bulk_upload_title: "رفع منتجات بالجملة (CSV)",
      products_bulk_upload_desc: "يمكنك رفع عدة منتجات دفعة واحدة الي متجرك عبر ملف CSV",
      products_bulk_upload_button: "إضافة منتجات بالجملة",

      products_add_new_title: "إضافة منتج جديد",
      products_add_new_desc: "أضف أول منتج إلى متجرك واملأ التفاصيل (الاسم، السعر، الصور، المخزون).",
      products_add_new_button: "إضافة منتجات جديدة",

      products_empty_message: "لا توجد منتجات بعد. ابدأ بإضافة أول منتج لك لتظهر هنا.",
      orders_tabs_all: "كل الطلبات",
      orders_tabs_new: "الطلبات الجديدة",
      orders_tabs_preparing: "الطلبات قيد التجهيز",
      orders_tabs_shipping: "الطلبات قيد الشحن",
      orders_tabs_completed: "الطلبات المكتملة",
      orders_tabs_cancelled: "الطلبات الملغاه",

      orders_search_placeholder: "البحث",
      orders_date_label: "الأحد 28-9-2025",

      orders_th_id: "رقم الطلب",
      orders_th_customer: "اسم العميل",
      orders_th_date: "تاريخ الطلب",
      orders_th_payment: "طريقة الدفع",
      orders_th_total: "الإجمالي",
      orders_th_status: "الحالة",
      orders_th_actions: "الإجراءات",

      orders_action_view: "عرض",
      orders_action_edit: "تعديل",

      inventory_title: "المخزون",
      inventory_search_placeholder: "البحث",
      inventory_add_product_button: "إضافة منتج جديد",

      // Stats Cards
      inventory_total_products: "إجمالي المنتجات",
      inventory_available_products: "المنتجات المتوفرة",
      inventory_low_stock: "منخفضة المخزون",
      inventory_out_of_stock: "غير المتوفرة",
      inventory_hidden_products: "منتجات مخفية",
      inventory_product_unit: "منتج",

      // Table Headers
      inventory_th_image: "صورة المنتج",
      inventory_th_name: "اسم المنتج",
      inventory_th_id: "الرمز التعريفي",
      inventory_th_category: "الفئة",
      inventory_th_quantity: "الكمية الحالية",
      inventory_th_min_stock: "الحد الادني",
      inventory_th_status: "الحالة",
      inventory_th_last_modified: "اخر تعديل",
      inventory_th_restock_suggestion: "اقتراح اعادة التخزين",
      inventory_th_actions: "الاجراءات",

      // Status Labels
      inventory_status_available: "متوفر",
      inventory_status_low: "منخفض",
      inventory_status_hidden: "مخفي",
      inventory_status_out_of_stock: "غير متوفر", analytics_title: "التحليلات",
      analytics_date_label: "الاحد  28-9-2025",

      // Alert Card
      analytics_alert_title: "تنبيه",
      analytics_low_stock_title: "المنتجات منخفضة المخزون",
      analytics_low_stock_message: "لديك 5 منتجات أوشكت على النفاد، يرجى تحديث المخزون لتجنب فقدان المبيعات.",
      analytics_view_products_button: "عرض المنتجات",

      // Orders Section
      analytics_orders_title: "الطلبات",
      analytics_new_orders: "الطلبات الجديدة",
      analytics_new_orders_count: "100 طلب",
      analytics_new_orders_desc: "طلبات بانتظار المعالجة",

      analytics_active_orders: "الطلبات النشطة",
      analytics_active_orders_count: "150 طلب",
      analytics_active_orders_desc: "طلبات قيد التجهيز أو الشحن",

      analytics_completed_orders: "الطلبات المكتملة",
      analytics_completed_orders_count: "1000 طلب",
      analytics_completed_orders_desc: "تم تسليمها بنجاح",

      analytics_cancelled_orders: "الطلبات الملغاة",
      analytics_cancelled_orders_count: "20 طلب",
      analytics_cancelled_orders_desc: "ألغيت من قبل العميل أو المتجر",

      // Sales Section
      analytics_sales_title: "المبيعات",
      analytics_total_sales: "اجمالي المبيعات",
      analytics_sales_day: "الاربعاء :",
      analytics_sales_label: "المبيعات :",
      orders_no_orders_message: "لا توجد طلبات",

      // Customers Section
      analytics_customers_title: "العملاء",
      analytics_repeat_customers: "عملاء متكررون",
      analytics_active_customers: "عملاء نشطون",
      analytics_new_customers: "عملاء جدد",
      analytics_vip_customers: "عملاء كبار(VIP)",
      analytics_inactive_customers: "عملاء غير نشطين",

      // Payment Methods Section
      analytics_payment_methods_title: "طرق الدفع",

      // Filter
      analytics_filter_this_week: "هذا الاسبوع",

    },
  },

  en: {
    translation: {
      warning: "Warning",
      منتج: "Product",


      طلب: "order",

      all_products_title: "All products",
      available_products_title: "Available ",
      low_stock_products_title: "Low Stock",
      not_available_products_title: "Not Available",
      hidden_products_title: "Hidden",

      // Dashboard - Low Stock
      low_stock_title: "Low Stock Products",
      low_stock_message_with_count: " You have {{count}} products that are almost out of stock. Please update inventory to avoid losing sales.",

      low_stock_message:
        "You have 5 products that are almost out of stock. Please update inventory to avoid losing sales.",
      low_stock_button: "View Products",

      // Orders section
      orders_title: "Orders",
      this_week: "This Week",

      order_new_title: "New Orders",
      order_new_desc: "Orders awaiting processing",

      order_active_title: "Active Orders",
      order_active_desc: "Orders being prepared or shipped",

      order_completed_title: "Completed Orders",
      order_completed_desc: "Successfully delivered",

      order_canceled_title: "Canceled Orders",
      order_canceled_desc: "Canceled by customer or store",

      // Sales section
      sales_title: "Sales",
      sales_total: "Total Sales",
      sales_day: "Wednesday",
      sales_value: "Sales :",

      // Week Days
      saturday: "Saturday",
      friday: "Friday",
      thursday: "Thursday",
      wednesday: "Wednesday",
      tuesday: "Tuesday",
      monday: "Monday",
      sunday: "Sunday",

      // Customers section
      customers_title: "Customers",
      customer_new: "New Customers",
      customer_active: "Active Customers",
      customer_repeat: "Repeat Customers",
      customer_inactive: "Inactive Customers",
      customer_vip: "VIP Customers",
      products_bulk_upload_title: "Bulk Product Upload (CSV)",
      products_bulk_upload_desc: "You can upload several products at once to your store using a CSV file",
      products_bulk_upload_button: "Add Bulk Products",

      products_add_new_title: "Add New Product",
      products_add_new_desc: "Add your first product to your store and fill in the details.",
      products_add_new_button: "Add New Products",

      products_empty_message: "No products yet. Start by adding your first product to display here.",
      orders_tabs_all: "All Orders",
      orders_tabs_new: "New Orders",
      orders_tabs_preparing: "Preparing",
      orders_tabs_shipping: "Shipping",
      orders_tabs_completed: "Completed",
      orders_tabs_cancelled: "Cancelled",

      orders_search_placeholder: "Search",
      orders_date_label: "Sunday 28-9-2025",

      orders_th_id: "Order ID",
      orders_th_customer: "Customer Name",
      orders_th_date: "Order Date",
      orders_th_payment: "Payment Method",
      orders_th_total: "Total",
      orders_th_status: "Status",
      orders_th_actions: "Actions",

      orders_action_view: "View",
      orders_action_edit: "Edit",
      inventory_title: "Inventory",
      inventory_search_placeholder: "Search",
      inventory_add_product_button: "Add New Product",

      // Stats Cards
      inventory_total_products: "Total Products",
      inventory_available_products: "Available Products",
      inventory_low_stock: "Low Stock",
      inventory_out_of_stock: "Out of Stock",
      inventory_hidden_products: "Hidden Products",
      inventory_product_unit: "product",

      // Table Headers
      inventory_th_image: "Product Image",
      inventory_th_name: "Product Name",
      inventory_th_id: "Product ID",
      inventory_th_category: "Category",
      inventory_th_quantity: "Current Quantity",
      inventory_th_min_stock: "Minimum Stock",
      inventory_th_status: "Status",
      inventory_th_last_modified: "Last Modified",
      inventory_th_restock_suggestion: "Restock Suggestion",
      inventory_th_actions: "Actions",

      // Status Labels
      inventory_status_available: "Available",
      inventory_status_low: "Low",
      inventory_status_hidden: "Hidden",
      inventory_status_out_of_stock: "Out of Stock",
      analytics_title: "Analytics",
      analytics_date_label: "Sunday 28-9-2025",

      // Alert Card
      analytics_alert_title: "Alert",
      analytics_low_stock_title: "Low Stock Products",
      analytics_low_stock_message: "You have 5 products that are almost out of stock. Please update inventory to avoid losing sales.",
      analytics_view_products_button: "View Products",

      // Orders Section
      analytics_orders_title: "Orders",
      analytics_new_orders: "New Orders",
      analytics_new_orders_count: "100 orders",
      analytics_new_orders_desc: "Orders awaiting processing",
      orders_no_orders_message: "No orders",

      analytics_active_orders: "Active Orders",
      analytics_active_orders_count: "150 orders",
      analytics_active_orders_desc: "Orders being prepared or shipped",

      analytics_completed_orders: "Completed Orders",
      analytics_completed_orders_count: "1000 orders",
      analytics_completed_orders_desc: "Successfully delivered",

      analytics_cancelled_orders: "Cancelled Orders",
      analytics_cancelled_orders_count: "20 orders",
      analytics_cancelled_orders_desc: "Cancelled by customer or store",

      // Sales Section
      analytics_sales_title: "Sales",
      analytics_total_sales: "Total Sales",
      analytics_sales_day: "Wednesday:",
      analytics_sales_label: "Sales:",

      // Customers Section
      analytics_customers_title: "Customers",
      analytics_repeat_customers: "Repeat Customers",
      analytics_active_customers: "Active Customers",
      analytics_new_customers: "New Customers",
      analytics_vip_customers: "VIP Customers",
      analytics_inactive_customers: "Inactive Customers",

      // Payment Methods Section
      analytics_payment_methods_title: "Payment Methods",

      // Filter
      analytics_filter_this_week: "This Week",


    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: sessionStorage.getItem("language") || "ar",
  fallbackLng: "ar",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  sessionStorage.setItem("language", lng);
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
});

const currentLang = i18n.language;
document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
document.documentElement.lang = currentLang;

export default i18n;
