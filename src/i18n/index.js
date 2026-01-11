import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ar: {
    translation: {
 home: "الرئيسية",
          product: "المنتجات",
          orde: "الطلبات",
          inventor: "المخزون",
          analytics: "التحليلات",
          settings: "إعدادات المتجر",
          logo: "اللوجو",
          collapse: "تصغير",
         welcome: "مرحبا بك في (اسم الويب سايت)",
      signIn: "تسجيل الدخول",
      phoneNumberOrEmail: "رقم الجوال/البريد الإلكتروني",
      phoneNumberOrEmailPlaceholder: "ادخل رقم الجوال أو البريد الإلكتروني",
      phoneNumber: "رقم الجوال",
      phoneNumberPlaceholder: "ادخل رقم الجوال",
      password: "كلمة المرور",
      passwordPlaceholder: "ادخل كلمة المرور",
      signInButton: "تسجيل دخول",
      forgotPassword: "نسيت كلمة المرور؟",
      noAccount: "ليس لديك حساب ؟",
      createAccount: "إنشاء حساب الآن",
      createAccountButton: "إنشاء حساب",
      haveAccount: "لديك حساب بالفعل ؟",
      firstName: "الاسم الأول",
      lastName: "الاسم الأخير",
      firstNamePlaceholder: "ادخل الاسم الأول",
      lastNamePlaceholder: "ادخل الاسم الأخير",
      email: "البريد الإلكتروني",
      emailPlaceholder: "ادخل البريد الإلكتروني",
      region: "المنطقة",
      city: "المدينة",
      selectRegion: "اختر المنطقة",
      selectCity: "اختر المدينة",
      riyadh: "الرياض",
      makkah: "مكة المكرمة",
      eastern: "المنطقة الشرقية",
      riyadhCity: "الرياض",
      jeddah: "جدة",
      dammam: "الدمام",
      termsAndConditions:
        'أوافق على شروط الاستخدام وسياسة الخصوصية الخاصة بـ "اسم الويب سايت"',
      testimonial:
        "تصاميم فخمة وتفاصيل مرتبة، حسيت البيت تغير 180 درجة التسوق في الموقع سهل وواضح، ما ضيعت وقت في البحث.",
      userName: "تركي القحطاني",
      date: "12 يوليو 2025",
      // Validation messages
      firstNameRequired: "الاسم الأول مطلوب",
      lastNameRequired: "الاسم الأخير مطلوب",
      phoneRequired: "رقم الجوال مطلوب",
      phoneInvalid: "رقم الجوال يجب أن يكون 10 أرقام",
      emailRequired: "البريد الإلكتروني مطلوب",
      emailInvalid: "البريد الإلكتروني غير صحيح (مثال: user@domain.com)",
      passwordRequired: "كلمة المرور مطلوبة",
      passwordInvalid:
        "كلمة المرور يجب أن تحتوي على حرف صغير وكبير ورموز و12 حرف على الأقل",
      regionRequired: "المنطقة مطلوبة",
      cityRequired: "المدينة مطلوبة",
      termsRequired: "يجب الموافقة على الشروط والأحكام",
      recently_arrived:"وصل حيثا",
      
      // Verification modal
      verificationCode: "رمز التحقق",
      verificationDescription:
        "يرجى إدخال رمز التحقق المكون من 4 أرقام، الذي تم إرساله إلى بريدك الإلكتروني",
      otpExpiredError: "انتهت صلاحية رمز التحقق الخاص بك. يرجى طلب رمز جديد.",

      resendTimer: "يمكنك إعادة إرسال الرمز خلال",
      seconds: "ثانية",
      resendCode: "إعادة إرسال الرمز",
      didntReceiveCode: "لم يصلك الرمز؟",
      verify: "تحقق",
      accountCreatedTitle: "تم إنشاء الحساب بنجاح!",
      accountCreatedText:
        "مرحباً بك! تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول.",
      errorTitle: "خطأ",
      ok: "حسناً",
      invalidOtpError: "رمز التحقق غير صحيح. حاول مرة أخرى.",
      otpResentTitle: "تم إرسال الرمز!",
      otpResentMessage: "تم إرسال رمز تحقق جديد إلى بريدك الإلكتروني.",
      otpResendError: "فشل في إعادة إرسال رمز التحقق. يرجى المحاولة لاحقًا.",
      loginSuccessTitle: "تم تسجيل الدخول!",
      loginSuccessText: "تم تسجيل دخولك بنجاح. مرحباً بك في منصتنا الإلكترونية",
      verificationSuccessTitle: "تم التحقق بنجاح!",
      verificationSuccessText:
        "تم التحقق من رمز OTP بنجاح. يمكنك الآن إعادة تعيين كلمة المرور.",
      invalidCredentials:
        "اسم المستخدم أو كلمة المرور غير صحيحة. حاول مرة أخرى.",
      userNotFound:
        "المستخدم غير موجود. يرجى التحقق من اسم المستخدم والمحاولة مرة أخرى.",
      //registeration massages
      otp_failed: "فشل في إرسال رمز التحقق عبر البريد الإلكتروني",
      email_exists: "البريد الإلكتروني موجود بالفعل",
      username_exists: "اسم المستخدم موجود بالفعل",
      // Forgot Password
      forgotPasswordTitle: "نسيت كلمة المرور ؟",
      forgotPasswordDescription:
        "يرجى اختيار إحدى الوسيلتين لاستلام رمز التحقق الخاص باستعادة كلمة المرور",
      sendButton: "إرسال",
      backToSignIn: "العودة إلى ",
      viaSMS: "عبر الرسائل",
      viaEmail: "عبر البريد الإلكتروني",
      // Reset Password
      resetPasswordTitle: "إعادة تعيين كلمة المرور",
      resetPasswordDescription:
        "يرجي إدخال كلمة مرور جديد لحسابكم , والتأكد من مطابقتها في الحقلين أدناه",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      newPasswordPlaceholder: "ادخل كلمة المرور الجديدة",
      confirmPasswordPlaceholder: "أعد إدخال كلمة المرور",
      confirmPasswordRequired: "تأكيد كلمة المرور مطلوب",
      passwordsDoNotMatch: "كلمات المرور غير متطابقة",
      savePasswordButton: "حفظ كلمة المرور",
      passwordResetSuccessTitle: "تم تغيير كلمة المرور بنجاح!",
      passwordResetSuccessText:
        "تم تحديث كلمة المرور الخاصة بك. يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.",
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
      low_stock_title: " منخفضة المخزون",
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
      analytics_low_stock_title: "منخفضة المخزون",
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

       "common": {
    "loading": "جاري التحميل..."
  },
  "products": {
    "selected": "تم الاختيار",
    "clear": "مسح الفلاتر",
    "filterBy": "تصفية الأعمدة",
    "showColumns": "إظهار الأعمدة",
    "search": "ابحث عن المنتجات...",
    "selectAll": "تحديد الكل",
    "clearAll": "إلغاء التحديد",
    "title": "المنتجات",
    "addNew": "إضافة منتج جديد",
    "basicInfo": "البيانات الأساسية",
    "category": "الفئة",
    "selectCategory": "اختر الفئة",
    "images": "إضافة الصور",
    "addImage": "أضف صورة جديدة",
    "name": "أدخل اسم المنتج",
    "price": "السعر",
    "discount": "الخصم",
    "priceAfterDiscount": "السعر بعد الخصم",
    "quantity": "الكمية",
    "description": "اكتب الوصف",
    "height": "الارتفاع",
    "width": "العرض",
    "length": "الطول",
    "material": "الخامة",
    "save": "حفظ المنتج",
    "previewName": "اسم المنتج",
    "previewDescription": "وصف المنتج",
    "title": "المنتجات",
    "addNew": "إضافة منتج جديد",
    "search": "البحث",
    "loadingStats": "جاري تحميل الإحصائيات...",
    "table": {
      "image": "صورة المنتج",
      "name": "اسم المنتج",
      "sku": "الرمز التعريفي",
      "category": "الفئة",
      "quantity": "الكمية الحالية",
      "minStock": "الحد الأدنى",
      "status": "الحالة",
      "lastModified": "آخر تعديل",
      "suggestion": "اقتراح إعادة التخزين",
      "actions": "الإجراءات"
    },
    "loading": "جاري تحميل المنتجات...",
    "status": {
      "active": "نشط",
      "inactive": "موقوف"
    },
    "suggestion": {
      "restock": "أضف إلى مخزونك",
      "inactive": "المنتج موقوف من قبل المتجر"
    }
     
  },
   "statistics": {
    "all": "كل المنتجات",
    "available": "المنتجات المتاحة",
    "lowStock": " منخفضة المخزون",
    "notAvailable": "غير متاح",
    "hidden": "مخفية",
    "unit": "منتج"
  },
  "delete": {
    "confirmation": "هل أنت متأكد أنك تريد حذف المنتج \"{{name}}\"؟",
    "warning": "لا يمكن استرجاع المنتج بعد الحذف.",
    "cancel": "إلغاء",
    "confirm": "حذف المنتج",
    "deleting": "جارٍ الحذف...",
    "success": "تم حذف المنتج بنجاح",
    "error": "حدث خطأ أثناء حذف المنتج"
  },
   "visibility": {
    "confirm_hide": "هل أنت متأكد أنك تريد إخفاء المنتج \"{{name}}\"؟",
    "confirm_unhide": "هل أنت متأكد أنك تريد إظهار المنتج \"{{name}}\"؟",
    "hide_warning": "يمكن إعادة تفعيله في أي وقت من إعدادات المنتج.",
    "unhide_warning": "سيظهر المنتج للعملاء مرة أخرى.",
    "hide": "إخفاء المنتج",
    "unhide": "إظهار المنتج",
    "cancel": "إلغاء",
    "processing": "جارٍ التنفيذ...",
    "hide_success": "تم إخفاء المنتج بنجاح",
    "unhide_success": "تم إظهار المنتج بنجاح",
    "error": "حدث خطأ أثناء تغيير حالة المنتج"
  },
    "details": {
    "edit_product": "تعديل المنتج",
    "price": "السعر",
    "quantity": "الكمية",
    "discount": "الخصم %",
    "price_after_discount": "السعر بعد الخصم",
    "material": "الخامة",
    "description": "الوصف",
    "status": "الحالة",
    "status_available": "متوفر",
    "cancel": "إلغاء",
    "save_changes": "حفظ التعديلات",
    "saving": "جارٍ الحفظ...",
    "success_update": "تم تحديث المنتج بنجاح",
    "failed_update": "فشل تحديث المنتج"
  },
   "order": {
    "details_title": "تفاصيل الطلب",
    "id": "رقم الطلب :",
    "customer_name": "اسم العميل :",
    "date": "تاريخ الطلب :",
    "payment_method": "طريقة الدفع :",
    "status": "الحالة",
    "total": "الإجمالي"
  },
  "general": {
    "loadingSettings": "جاري تحميل الإعدادات...",
    "unableToLoadSettings": "تعذر تحميل الإعدادات",
    "aboutStore": "عن المتجر",
    "storeLogo": "شعار المتجر",
    "clickToUploadLogo": "انقر لرفع الشعار",
    "uploadGuidelines": "JPG / PNG، الحجم الأقصى 5 ميغابايت.",
    "storeName": "اسم المتجر",
    "mobileNumber": "رقم الجوال",
    "email": "البريد الإلكتروني",
    "facebookLink": "رابط فيسبوك",
    "instagramLink": "رابط إنستجرام",
    "whatsappLink": "رابط واتساب",
    "contactInformation": "بيانات التواصل",
    "generalSettings": "الإعدادات العامة",
    "defaultLanguage": "اللغة الافتراضية",
    "timezone": "المنطقة الزمنية",
    "defaultCurrency": "العملة الافتراضية",
    "save": "حفظ",
    "saving": "جارٍ الحفظ...",
    "settingsSaved": "تم حفظ الإعدادات بنجاح!",
    "settingsSaveError": "فشل في حفظ الإعدادات",
    "settingsSaveErrorGeneric": "حدث خطأ أثناء حفظ الإعدادات."
  },
   "tabs": {
    "generalSettings": "الإعدادات العامة",
    "users": "المستخدمين",
    "orders": "الطلبات",
    "shipping": "الشحن",
    "payment": "الدفع"
  },
   "loadingTeamMembers": "جاري تحميل أعضاء الفريق...",
  "team": {
    "currentMembers": "أعضاء الفريق الحاليين",
    "addNewMember": "إضافة عضو جديد"
  },
  "user": "المستخدم",
  "edit": "تعديل",
  "delete": "حذف",

  "orders": {
    "returnPolicyTitle": "سياسة الارجاع و الاستبدال",
    "returnPeriodDays": "فترة الارجاع المسموحة (بالأيام)",
    "returnPolicyText": "نص سياسة الارجاع",
    "orderPolicyTitle": "سياسة الطلب",
    "minimumOrderLimit": "الحد الأدنى للطلب",
    "orderProcessingTime": "مدة معالجة الطلب (بالأيام)",
    "savedSuccessfully": "تم حفظ الإعدادات بنجاح",
    "saveFailed": "فشل حفظ الإعدادات",
    "saving": "جاري الحفظ...",
    "save": "حفظ"
  },
  "shipping": {
    "costRegionsTitle": "إعدادات التكلفة والمناطق",
    "pricingType": "نوع التسعير",
    "pricingTypePlaceholder": "اختر نوع التسعير",
    "fixed": "ثابت",
    "variable": "متغير",
    "minimumFreeShipping": "الحد الأدنى للشحن المجاني",
    "deliveryRegions": "مناطق التوصيل (افصل بينهم بفاصلة)",
    "shippingCompanies": "شركات الشحن",
    "savedSuccessfully": "تم حفظ إعدادات الشحن بنجاح",
    "saveFailed": "فشل حفظ إعدادات الشحن",
    "saving": "جاري الحفظ...",
    "save": "حفظ",
    "companies": {
      "SMSA_EXPRESS": { "name": "SMSA إكسبريس", "description": "شحن سريع لجميع أنحاء المملكة" },
      "ZAJIL_EXPRESS": { "name": "زاجل إكسبريس", "description": "شحن سريع لجميع أنحاء المملكة" },
      "ARAMEX": { "name": "أرامكس", "description": "شحن سريع لجميع أنحاء المملكة" },
      "NAQEL_EXPRESS": { "name": "ناقل إكسبريس", "description": "شحن سريع لجميع أنحاء المملكة" }
    }
  },
  "payment": {
    "title": "طرق الدفع",
    "savedSuccessfully": "تم حفظ إعدادات الدفع بنجاح",
    "saveFailed": "حدث خطأ أثناء الحفظ",
    "saving": "جاري الحفظ...",
    "save": "حفظ"
  },
  "deleteUser": {
    "confirmation": "هل أنت متأكد أنك تريد حذف العضو \"{{name}}\"؟",
    "warning": "هل انت متاكد من حذف ذلك العضو؟ سيتم ازالة جميع بياناته ولن يمكن التراجع عن هذا الاجراء",
    "cancel": "إلغاء",
    "deleteMember": "حذف العضو",
    "deleting": "جاري الحذف...",
    "failed": "فشل حذف العضو: ",
    "error": "حدث خطأ أثناء الحذف: "
  },
   "addMember": {
    "editTitle": "تعديل بيانات العضو",
    "addTitle": "إضافة عضو جديد",
    "username": "اسم المستخدم",
    "password": "كلمة المرور",
    "email": "البريد الإلكتروني",
    "firstName": "الاسم الأول",
    "lastName": "اسم العائلة",
    "phoneNumber": "رقم الجوال",
    "role": "الصلاحيات",
    "cancel": "إلغاء",
    "addNew": "إضافة العضو الجديد",
    "saveChanges": "حفظ التعديلات",
    "saving": "جاري الحفظ...",
    "saveFailed": "فشل حفظ التعديلات",
    "createFailed": "فشل إنشاء العضو الجديد",
      "saveSuccess": "تم تحديث العضو بنجاح!",
    "createSuccess": "تم إنشاء العضو بنجاح!",
    "saveFailed": "فشل تحديث العضو.",
    "createFailed": "فشل إنشاء العضو."
  },
  "inventory": {
    "title": "المخزون",
    "loadingStats": "جاري تحميل الإحصائيات...",
    "addProduct": "إضافة منتج جديد",
    "search": "البحث",

    "unit": {
      "product": "منتج"
    },

    "stats": {
      "allProducts": "إجمالي المنتجات",
      "availableProducts": "المنتجات المتوفرة",
      "lowStockProducts": "منخفضة المخزون",
      "notAvailableProducts": "غير المتوفرة",
      "hiddenProducts": "منتجات مخفية"
    },

    "table": {
      "productImage": "صورة المنتج",
      "productName": "اسم المنتج",
      "productCode": "الرمز التعريفي",
      "category": "الفئة",
      "quantity": "الكمية الحالية",
      "minStock": "الحد الأدنى",
      "status": "الحالة",
      "lastUpdate": "آخر تعديل",
      "restockSuggestion": "اقتراح إعادة التخزين"
    },

    "status": {
      "available": "متوفر",
      "lowStock": "منخفض",
      "outOfStock": "غير متوفر",
      "hidden": "مخفي"
    },

    "suggestion": {
      "available": "المنتج متوفر",
      "lowStock": "أضف كمية للمخزون",
      "outOfStock": "المنتج غير متوفر حاليًا",
      "hidden": "المنتج مخفي من قبل المتجر"
    }
  },
  "editProfile": {
    "storeName": "اسم المتجر",
    "mobileNumber": "رقم الجوال",
    "save": "حفظ",
    "saving": "جاري الحفظ...",
    "loading": "جاري تحميل البيانات...",
    "loadError": "تعذر تحميل البيانات",
    "alert": {
      "success": "تم تحديث الملف الشخصي بنجاح",
      "fail": "فشل تحديث البيانات",
      "error": "حدث خطأ أثناء حفظ البيانات"
    }
  },
   "notifications": {
    "type": "نوع التنبيه",
    "dashboard": "داخل الداشبورد",
    "sms": "رسائل الجوال \"SMS\"",
    "save": "حفظ",
    "notification": {
      "newOrder": "تنبيهات عند استلام طلب جديد",
      "statusChange": "إشعار عند تغيير حالة الطلب",
      "orderCanceled": "إشعار عند إلغاء الطلب",
      "lowStockProduct": "تنبيه عند انخفاض كمية منتج",
      "outOfStock": "إشعار عند نفاد المخزون",
      "newReview": "إشعار عند إضافة تقييم جديد"
    }
  },
   "changePassword": {
    "newPassword": "كلمة المرور",
    "newPasswordPlaceholder": "ادخل كلمة المرور الجديدة",
    "confirmPassword": "تأكيد كلمة المرور",
    "confirmPasswordPlaceholder": "اعد إدخال كلمة المرور",
    "save": "حفظ",
    "saving": "جاري الحفظ...",
    "errorTitle": "خطأ",
    "fillFields": "الرجاء ملء الحقول",
    "passwordMismatch": "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
    "updateFailed": "فشل تغيير كلمة المرور",
    "updateError": "حدث خطأ أثناء تغيير كلمة المرور"
  },
  "logOutModal": {
    "iconAlt": "رمز تسجيل الخروج",
    "confirmTitle": "تأكيد تسجيل الخروج",
    "confirmMessage": "هل أنت متأكد أنك تريد تسجيل الخروج من الحساب؟",
    "cancel": "إلغاء",
    "logout": "تسجيل الخروج"
  },
    "profileTabs": {
    "editProfile": "تعديل الملف الشخصي",
    "notifications": "التنبيهات",
    "changePassword": "تغيير كلمة المرور",
    "logout": "تسجيل الخروج"
  },
  "orders_search_placeholder": "ابحث في الطلبات...",
  "orders_date_label": "اختر نطاق التاريخ",
  "orders_no_orders_message": "لا توجد طلبات للعرض",
  "orders_th_id": "رقم الطلب",
  "orders_th_customer": "العميل",
  "orders_th_date": "التاريخ",
  "orders_th_payment": "طريقة الدفع",
  "orders_th_total": "المجموع",
  "orders_th_status": "الحالة",
  "orders_th_actions": "الإجراءات",
  "orders_action_view": "عرض",

  "filters": {
    "id": "رقم الطلب",
    "customer": "العميل",
    "date": "التاريخ",
    "payment": "طريقة الدفع",
    "total": "المجموع",
    "status": "الحالة"
  }

    },
  },

  en: {
    translation: {
        home: "Home",
          product: "Products",
          orde: "Orders",
          inventor: "Inventory",
          analytics: "Analytics",
          settings: "Store Settings",
          logo: "Logo",
          collapse: "Collapse",
        login:"Login",
      welcome: "Welcome to (Website Name)",
      signIn: "Sign In",
      phoneNumberOrEmail: "Phone Number/Email",
      phoneNumberOrEmailPlaceholder: "Enter phone number or email",
      phoneNumber: "Phone Number",
      phoneNumberPlaceholder: "Enter Phone number",
      password: "Password",
      passwordPlaceholder: "Enter password",
      signInButton: "Sign In",
      forgotPassword: "Forgot Password?",
      noAccount: "Don't have an account?",
      createAccount: "Create Account Now",
      createAccountButton: "Create Account",
      haveAccount: "Already have an account?",
      firstName: "First Name",
      lastName: "Last Name",
      firstNamePlaceholder: "Enter first name",
      lastNamePlaceholder: "Enter last name",
      email: "Email",
      emailPlaceholder: "Enter email address",
      region: "Region",
      city: "City",
      selectRegion: "Select Region",
      selectCity: "Select City",
      riyadh: "Riyadh",
      makkah: "Makkah",
      eastern: "Eastern Province",
      riyadhCity: "Riyadh",
      jeddah: "Jeddah",
      dammam: "Dammam",
      termsAndConditions:
        'I agree to the Terms of Use and Privacy Policy of "Website Name"',
      testimonial:
        "Luxurious designs and organized details, I felt the house changed 180 degrees. Shopping on the site is easy and clear, I didn't waste time searching.",
      userName: "Turki Al-Qahtani",
      date: "July 12, 2025",
      // Validation messages
      firstNameRequired: "First name is required",
      lastNameRequired: "Last name is required",
      phoneRequired: "Phone number is required",
      phoneInvalid: "Phone number must be exactly 10 digits",
      emailRequired: "Email is required",
      emailInvalid: "Invalid email format (example: user@domain.com)",
      passwordRequired: "Password is required",
      passwordInvalid:
        "Password must contain lowercase, uppercase, symbols and be at least 12 characters",
      regionRequired: "Region is required",
      cityRequired: "City is required",
      termsRequired: "Terms and Conditions must be accepted.",
      // Verification modal
      verificationCode: "Verification Code",
      verificationDescription:
        "Please enter the 4-digit verification code that was sent to your email",
      resendTimer: "You can resend the code in",
      seconds: "seconds",
      resendCode: "Resend Code",
      didntReceiveCode: "Didn't receive the code?",
      verify: "Verify",
      accountCreatedTitle: "Account Created Successfully!",
      accountCreatedText:
        "Welcome! Your account has been created successfully. You can now sign in.",
      ok: "OK",
      errorTitle: "Error",
      invalidOtpError: "Invalid OTP. Please try again.",
      otpExpiredError: "Your OTP code has expired. Please request a new one.",
      otpResentTitle: "OTP Sent!",
      otpResentMessage: "A new verification code has been sent to your email.",
      otpResendError: "Failed to resend the OTP. Please try again later.",
      loginSuccessTitle: "Login Successful!",
      loginSuccessText:
        "You have been successfully logged in. welcome at our e-commerce platform",
      verificationSuccessTitle: "Verification Successful!",
      verificationSuccessText:
        "OTP verified successfully. You can now reset your password.",
      invalidCredentials: "Invalid username or password. Please try again.",
      userNotFound: "User not found. Please check your username and try again.",
      //registeration massages
      otp_failed: "Failed to send OTP email",
      email_exists: "Email already exists",
      username_exists: "Username already exists",
      // Forgot Password
      forgotPasswordTitle: "Forgot Password?",
      forgotPasswordDescription:
        "Please choose one of the two methods to receive the verification code for password recovery",
      sendButton: "Send",
      backToSignIn: "Back to",
      viaSMS: "Via SMS",
      viaEmail: "Via Email",
      // Reset Password
      resetPasswordTitle: "Reset Password",
      resetPasswordDescription:
        "Please enter a new password for your account, and make sure it matches the two fields below.",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      newPasswordPlaceholder: "Enter new password",
      confirmPasswordPlaceholder: "Re-enter password",
      confirmPasswordRequired: "Password confirmation is required",
      passwordsDoNotMatch: "Passwords do not match",
      savePasswordButton: "Save Password",
      passwordResetSuccessTitle: "Password Reset Successfully!",
      passwordResetSuccessText:
        "Your password has been updated. You can now sign in with your new password.",
      warning: "Warning",
      منتج: "Product",


      طلب: "order",

      all_products_title: "All products",
      available_products_title: "Available ",
      low_stock_products_title: "Low Stock",
      not_available_products_title: "Not Available",
      hidden_products_title: "Hidden",

      // Dashboard - Low Stock
      low_stock_title: "Low Stock",
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
      inventory_available_products: "Available ",
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

       "common": {
    "loading": "Loading..."
  },
  "products": {
    "selected": "selected",
    "clear": "Clear filters",
    "filterBy": "Filter columns",
    "showColumns": "Show columns",
    "search": "Search products...",
    "selectAll": "Select all",
    "clearAll": "Clear all",
    "title": "Products",
    "addNew": "Add New Product",
    "basicInfo": "Basic Information",
    "category": "Category",
    "selectCategory": "Select category",
    "images": "Product Images",
    "addImage": "Add new image",
    "name": "Enter product name",
    "price": "Price",
    "discount": "Discount",
    "priceAfterDiscount": "Price after discount",
    "quantity": "Quantity",
    "description": "Write description",
    "height": "Height",
    "width": "Width",
    "length": "Length",
    "material": "Material",
    "save": "Save Product",
    "previewName": "Product Name",
    "previewDescription": "Product description",
    "title": "Products",
    "addNew": "Add New Product",
    "search": "Search",
    "loadingStats": "Loading statistics...",
    "table": {
      "image": "Product Image",
      "name": "Product Name",
      "sku": "SKU",
      "category": "Category",
      "quantity": "Current Quantity",
      "minStock": "Minimum Stock",
      "status": "Status",
      "lastModified": "Last Modified",
      "suggestion": "Restock Suggestion",
      "actions": "Actions"
    },
      "loading": "Loading products...",
  "status": {
    "active": "Active",
    "inactive": "Inactive"
  },
  "suggestion": {
    "restock": "Add to your stock",
    "inactive": "This product is suspended by the store"
  }
  },

  "statistics": {
    "all": "All Products",
    "available": "Available ",
    "lowStock": "Low Stock ",
    "notAvailable": "Not Available",
    "hidden": "Hidden Products",
    "unit": "item"
  },
  "delete": {
    "confirmation": "Are you sure you want to delete the product \"{{name}}\"?",
    "warning": "This action cannot be undone.",
    "cancel": "Cancel",
    "confirm": "Delete Product",
    "deleting": "Deleting...",
    "success": "Product deleted successfully",
    "error": "An error occurred while deleting the product"
  },
    "visibility": {
    "confirm_hide": "Are you sure you want to hide the product \"{{name}}\"?",
    "confirm_unhide": "Are you sure you want to unhide the product \"{{name}}\"?",
    "hide_warning": "It can be reactivated anytime from the product settings.",
    "unhide_warning": "The product will be visible to customers again.",
    "hide": "Hide Product",
    "unhide": "Unhide Product",
    "cancel": "Cancel",
    "processing": "Processing...",
    "hide_success": "Product hidden successfully",
    "unhide_success": "Product unhidden successfully",
    "error": "An error occurred while changing the product visibility"
  },
  "details": {
    "edit_product": "Edit Product",
    "price": "Price",
    "quantity": "Quantity",
    "discount": "Discount %",
    "price_after_discount": "Price After Discount",
    "material": "Material",
    "description": "Description",
    "status": "Status",
    "status_available": "Available",
    "cancel": "Cancel",
    "save_changes": "Save Changes",
    "saving": "Saving...",
    "success_update": "Product updated successfully",
    "failed_update": "Failed to update product"
  },
  "order": {
    "details_title": "Order Details",
    "id": "Order ID:",
    "customer_name": "Customer Name:",
    "date": "Order Date:",
    "payment_method": "Payment Method:",
    "status": "Status",
    "total": "Total"
  },
  "general": {
    "loadingSettings": "Loading settings...",
    "unableToLoadSettings": "Unable to load settings",
    "aboutStore": "About Store",
    "storeLogo": "Store Logo",
    "clickToUploadLogo": "Click to upload logo",
    "uploadGuidelines": "JPG / PNG, max size 5MB.",
    "storeName": "Store Name",
    "mobileNumber": "Mobile Number",
    "email": "Email",
    "facebookLink": "Facebook Link",
    "instagramLink": "Instagram Link",
    "whatsappLink": "WhatsApp Link",
    "contactInformation": "Contact Information",
    "generalSettings": "General Settings",
    "defaultLanguage": "Default Language",
    "timezone": "Time Zone",
    "defaultCurrency": "Default Currency",
    "save": "Save",
    "saving": "Saving...",
    "settingsSaved": "Settings saved successfully!",
    "settingsSaveError": "Failed to save settings",
    "settingsSaveErrorGeneric": "An error occurred while saving settings."
  },
   "tabs": {
    "generalSettings": "General Settings",
    "users": "Users",
    "orders": "Orders",
    "shipping": "Shipping",
    "payment": "Payment"
  },
   "loadingTeamMembers": "Loading team members...",
  "team": {
    "currentMembers": "Current Team Members",
    "addNewMember": "Add New Member"
  },
  "user": "User",
  "edit": "Edit",
  "delete": "Delete",

  "orders": {
  "returnPolicyTitle": "Return & Exchange Policy",
  "returnPeriodDays": "Allowed Return Period (in days)",
  "returnPolicyText": "Return Policy Text",
  "orderPolicyTitle": "Order Policy",
  "minimumOrderLimit": "Minimum Order Limit",
  "orderProcessingTime": "Order Processing Time (in days)",
  "savedSuccessfully": "Settings saved successfully",
  "saveFailed": "Failed to save settings",
  "saving": "Saving...",
  "save": "Save"
},
"shipping": {
    "costRegionsTitle": "Cost & Regions Settings",
    "pricingType": "Pricing Type",
    "pricingTypePlaceholder": "Select pricing type",
    "fixed": "Fixed",
    "variable": "Variable",
    "minimumFreeShipping": "Minimum Free Shipping",
    "deliveryRegions": "Delivery Regions (comma-separated)",
    "shippingCompanies": "Shipping Companies",
    "savedSuccessfully": "Shipping settings saved successfully",
    "saveFailed": "Failed to save shipping settings",
    "saving": "Saving...",
    "save": "Save",
    "companies": {
      "SMSA_EXPRESS": { "name": "SMSA Express", "description": "Fast shipping across the kingdom" },
      "ZAJIL_EXPRESS": { "name": "Zajil Express", "description": "Fast shipping across the kingdom" },
      "ARAMEX": { "name": "Aramex", "description": "Fast shipping across the kingdom" },
      "NAQEL_EXPRESS": { "name": "Naqel Express", "description": "Fast shipping across the kingdom" }
    }
  },
   "payment": {
    "title": "Payment Methods",
    "savedSuccessfully": "Payment settings saved successfully",
    "saveFailed": "Failed to save payment settings",
    "saving": "Saving...",
    "save": "Save"
  },
  "deleteUser": {
    "confirmation": "Are you sure you want to delete the member \"{{name}}\"?",
    "warning": "This action will remove all their data and cannot be undone.",
    "cancel": "Cancel",
    "deleteMember": "Delete Member",
    "deleting": "Deleting...",
    "failed": "Failed to delete user: ",
    "error": "An error occurred while deleting the user: "
  },

  "addMember": {
    "editTitle": "Edit Member",
    "addTitle": "Add New Member",
    "username": "Username",
    "password": "Password",
    "email": "Email",
    "firstName": "First Name",
    "lastName": "Last Name",
    "phoneNumber": "Phone Number",
    "role": "Role",
    "cancel": "Cancel",
    "addNew": "Add New Member",
    "saveChanges": "Save Changes",
    "saving": "Saving...",
    "saveFailed": "Failed to save changes",
    "createFailed": "Failed to create new member",
    "saveSuccess": "Member updated successfully!",
    "createSuccess": "Member created successfully!",
    "saveFailed": "Failed to update member.",
    "createFailed": "Failed to create member."
  },

   "inventory": {
    "title": "Inventory",
    "loadingStats": "Loading statistics...",
    "addProduct": "Add New Product",
    "search": "Search",

    "unit": {
      "product": "Product"
    },

    "stats": {
      "allProducts": "Total Products",
      "availableProducts": "Available ",
      "lowStockProducts": "Low Stock",
      "notAvailableProducts": "Out of Stock",
      "hiddenProducts": "Hidden Products"
    },

    "table": {
      "productImage": "Product Image",
      "productName": "Product Name",
      "productCode": "Product Code",
      "category": "Category",
      "quantity": "Current Quantity",
      "minStock": "Minimum Stock",
      "status": "Status",
      "lastUpdate": "Last Updated",
      "restockSuggestion": "Restock Suggestion"
    },

    "status": {
      "available": "Available",
      "lowStock": "Low Stock",
      "outOfStock": "Out of Stock",
      "hidden": "Hidden"
    },

    "suggestion": {
      "available": "Product is available",
      "lowStock": "Add more stock",
      "outOfStock": "Product is currently out of stock",
      "hidden": "Product is hidden by the store"
    }
  },
   "editProfile": {
    "storeName": "Store Name",
    "mobileNumber": "Mobile Number",
    "save": "Save",
    "saving": "Saving...",
    "loading": "Loading profile...",
    "loadError": "Failed to load profile",
    "alert": {
      "success": "Profile updated successfully",
      "fail": "Failed to update profile",
      "error": "An error occurred while saving data"
    }
  },

   "notifications": {
    "type": "Notification Type",
    "dashboard": "Dashboard",
    "sms": "SMS",
    "save": "Save",
    "notification": {
      "newOrder": "New Order Received",
      "statusChange": "Order Status Changed",
      "orderCanceled": "Order Canceled",
      "lowStockProduct": "Low Stock Product",
      "outOfStock": "Out of Stock",
      "newReview": "New Review Added"
    }
  },
   "changePassword": {
    "newPassword": "New Password",
    "newPasswordPlaceholder": "Enter your new password",
    "confirmPassword": "Confirm Password",
    "confirmPasswordPlaceholder": "Re-enter your password",
    "save": "Save",
    "saving": "Saving...",
    "errorTitle": "Error",
    "fillFields": "Please fill in all fields",
    "passwordMismatch": "Password and confirmation do not match",
    "updateFailed": "Failed to change password",
    "updateError": "An error occurred while changing the password"
  },
  "logOutModal": {
    "iconAlt": "Logout icon",
    "confirmTitle": "Confirm Logout",
    "confirmMessage": "Are you sure you want to log out of your account?",
    "cancel": "Cancel",
    "logout": "Log Out"
  },
  "profileTabs": {
    "editProfile": "Edit Profile",
    "notifications": "Notifications",
    "changePassword": "Change Password",
    "logout": "Log Out"
  },
   "orders_search_placeholder": "Search orders...",
  "orders_date_label": "Select date range",
  "orders_no_orders_message": "No orders to display",
  "orders_th_id": "Order ID",
  "orders_th_customer": "Customer",
  "orders_th_date": "Date",
  "orders_th_payment": "Payment",
  "orders_th_total": "Total",
  "orders_th_status": "Status",
  "orders_th_actions": "Actions",
  "orders_action_view": "View",
   "filters": {
    "id": "ID",
    "customer": "Customer",
    "date": "Date",
    "payment": "Payment",
    "total": "Total",
    "status": "Status"
  }


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
