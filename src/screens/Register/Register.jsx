import {
  ChevronRight as ChevronRightIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalValue } from "../../Store/Store";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { LanguageToggle } from "../../components/LanguageToggle";
import { VerificationModal } from "../../components/VerificationModal";
import api from "../../Api/Axios";
import { user } from "@heroui/react";
import Swal from "sweetalert2";

export const Register = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [businessName, setBusinessName] = useState("");
const [businessDescription, setBusinessDescription] = useState("");
const [businessAddress, setBusinessAddress] = useState("");
const [businessPhone, setBusinessPhone] = useState("");
const [businessEmail, setBusinessEmail] = useState("");
const [website, setWebsite] = useState("");
const [taxId, setTaxId] = useState("");
const [tradeLicenseUrl, setTradeLicenseUrl] = useState("");
const [vatCertificateUrl, setVatCertificateUrl] = useState("");
const [businessRegistrationUrl, setBusinessRegistrationUrl] = useState("");


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/api/blogs");
        if (response.data.success) {
          console.log(response.data.data);
          setBlogs(response.data.data); // store array of blogs
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [i18n.language]);

  const isRTL = i18n.language === "ar";
  const validateForm = React.useCallback(() => {
    const newErrors = {};

    if (!businessName.trim()) newErrors.businessName = t("businessNameRequired");
if (!businessDescription.trim()) newErrors.businessDescription = t("businessDescriptionRequired");
if (!businessAddress.trim()) newErrors.businessAddress = t("businessAddressRequired");

if (!businessPhone.trim()) newErrors.businessPhone = t("businessPhoneRequired");
else if (businessPhone.length < 10) newErrors.businessPhone = t("businessPhoneInvalid");

if (!businessEmail.trim()) newErrors.businessEmail = t("businessEmailRequired");
else if (!validateEmail(businessEmail)) newErrors.businessEmail = t("businessEmailInvalid");

if (!website.trim()) newErrors.website = t("websiteRequired");
if (!taxId.trim()) newErrors.taxId = t("taxIdRequired");
if (!tradeLicenseUrl.trim()) newErrors.tradeLicenseUrl = t("tradeLicenseUrlRequired");
if (!vatCertificateUrl.trim()) newErrors.vatCertificateUrl = t("vatCertificateUrlRequired");
if (!businessRegistrationUrl.trim()) newErrors.businessRegistrationUrl = t("businessRegistrationUrlRequired");


    if (!firstName.trim()) {
      newErrors.firstName = t("firstNameRequired");
    }

    if (!lastName.trim()) {
      newErrors.lastName = t("lastNameRequired");
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = t("phoneRequired");
    } else if (phoneNumber.length !== 10) {
      newErrors.phoneNumber = t("phoneInvalid");
    }

    if (!email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!validateEmail(email)) {
      newErrors.email = t("emailInvalid");
    }

    if (!password.trim()) {
      newErrors.password = t("passwordRequired");
    } else if (!validatePassword(password)) {
      newErrors.password = t("passwordInvalid");
    }

    if (!region) {
      newErrors.region = t("regionRequired");
    }

    if (!city) {
      newErrors.city = t("cityRequired");
    }

    if (!acceptTerms) {
      // This condition remains correct
      newErrors.acceptTerms = t("termsRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    region,
    city,
    acceptTerms,
    t,
  ]);
  // Re-validate when language changes to update error messages
  React.useEffect(() => {
    if (Object.keys(touchedFields).length > 0) {
      validateForm();
    }
  }, [i18n.language, touchedFields, validateForm]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === blogs.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1));
  };

  const blog = blogs[currentIndex];

  if (!blog) return null;

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">Loading cards...</div>
    );
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasMinLength = password.length >= 12;

    return hasLowerCase && hasUpperCase && hasSymbols && hasMinLength;
  };

  const handleFieldBlur = (fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
    validateForm();
  };

  const isFormValid = () => {
    return (
      firstName.trim() &&
      lastName.trim() &&
      phoneNumber.trim() &&
      phoneNumber.length === 10 &&
      email.trim() &&
      validateEmail(email) &&
      password.trim() &&
      validatePassword(password) &&
      region &&
      city &&
      acceptTerms
    );
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    var username = firstName + " " + lastName;
    dispatch(setGlobalValue({ key: "identifierType", value: "EMAIL" }));
    dispatch(setGlobalValue({ key: "Email", value: email.trim() }));

    // Mark all fields as touched to show validation errors
    setTouchedFields({
      firstName: true,
      lastName: true,
      phoneNumber: true,
      email: true,
      password: true,
      region: true,
      city: true,
      acceptTerms: true,
        businessName: true,
  businessDescription: true,
  businessAddress: true,
  businessPhone: true,
  businessEmail: true,
  website: true,
  taxId: true,
  tradeLicenseUrl: true,
  vatCertificateUrl: true,
  businessRegistrationUrl: true,
    });

    if (validateForm() && acceptTerms) {
      try {
        const payload = {
           username: firstName + lastName,
  email,
  password,
  firstName,
  lastName,
  phoneNumber: "+966" + phoneNumber, // or full international format
  businessName,
  businessDescription,
  businessAddress,
  businessPhone,
  businessEmail,
  website,
  taxId,
  tradeLicenseUrl,
  vatCertificateUrl,
  businessRegistrationUrl,
        };

        const response = await api.post("api/auth/register-seller", payload);

        console.log("✅ Registration successful:", response.data);

        // Show verification modal after successful registration
        setTimeout(() => {
          setIsSubmitting(false);
          setShowVerificationModal(true);
        }, 500);
      } catch (error) {
        console.error(
          "❌ Registration failed:",
          error.response?.data || error.message
        );
        if (error.response?.data?.message == "Username already exists") {
          Swal.fire({
            title: t("errorTitle"),
            text: t("username_exists"),
            icon: "error",
            confirmButtonText: t("ok"),
            confirmButtonColor: "#dc3545",
            customClass: {
              popup: isRTL ? "swal-rtl" : "swal-ltr",
              title: `font-['Cairo',Helvetica] text-center`,
              htmlContainer: `font-['Cairo',Helvetica] text-center`,
              confirmButton: `font-['Cairo',Helvetica] text-lg py-3 px-8`,
            },
          });
        } else if (error.response?.data?.message == "Email already exists") {
          Swal.fire({
            title: t("errorTitle"),
            text: t("email_exists"),
            icon: "error",
            confirmButtonText: t("ok"),
            confirmButtonColor: "#dc3545",
            customClass: {
              popup: isRTL ? "swal-rtl" : "swal-ltr",
              title: `font-['Cairo',Helvetica] text-center`,
              htmlContainer: `font-['Cairo',Helvetica] text-center`,
              confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
            },
          });
        } else if (
          error.response?.data?.message == "Failed to send OTP email:"
        ) {
          Swal.fire({
            title: t("errorTitle"),
            text: t("otp_failed"),
            icon: "error",
            confirmButtonText: t("ok"),
            confirmButtonColor: "#dc3545",
            customClass: {
              popup: isRTL ? "swal-rtl" : "swal-ltr",
              title: `font-['Cairo',Helvetica] text-center`,
              htmlContainer: `font-['Cairo',Helvetica] text-center`,
              confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
            },
          });
        }
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
      console.log("Validation errors:", errors);
    }
  };

  const navigateToSignIn = () => {
    navigate("/");
  };

  return (
    <div className="bg-[#fefefe] w-full min-h-screen relative overflow-hidden">
      <LanguageToggle />

      <div
        className={`flex flex-col lg:flex-row w-full max-w-[1360px] mx-auto items-center justify-between gap-2 p-4 lg:p-2 min-h-screen ${
          isRTL ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        {/* Image Section */}
      <div
              className={`w-full sm:w-full md:w-full lg:w-[668px] flex justify-center ${
                isRTL
                  ? "lg:justify-end order-1 lg:order-2"
                  : "lg:justify-start order-1 lg:order-2"
              }`}
            >
              <div className="relative w-full max-w-[500px] lg:max-w-[668px]">
                <video
      className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[750px] rounded-[30px] lg:rounded-[50px] object-cover"
      autoPlay
      muted
      loop
      playsInline
    >
      <source src="/macbook-air-tumble.mp4" type="video/mp4" />
      متصفحك لا يدعم عرض الفيديو.
    </video>
    
    
                {/* Testimonial Card - Positioned relative to image */}
    
                <Card
                  key={blog.id}
                  className="absolute  bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 border-0 "
                >
                  <CardContent className="flex flex-col items-center justify-center gap-4 lg:gap-6 p-8 lg:p-10 bg-white/75 backdrop-blur-sm rounded-[15px] lg:rounded-[20px] shadow-sm border-0 h-[145px] sm:min-h-[160px]  md:min-h-[180px] lg:min-h-[200px] ">
                    <div
                      className={`flex flex-col w-full items-center justify-center gap-3 lg:gap-4 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <p
                        className={`text-[#1a1713] text-sm sm:text-base md:text-lg lg:text-[21px] font-normal leading-relaxed font-['Cairo',Helvetica] ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                      >
    
                        <h1>حوّل إدارة متجرك إلى تجربة ممتعة ومريحة.</h1> 
                      
                      <p>
                        واجهتنا المصممة بعناية تسهّل عليك التعامل مع كل جزء من المتجر — من أول رفع الصور وحتى متابعة الطلبات — لتعيش تجربة إدارة خالية من التعقيد.
                      </p>
                      </p>
    
                      <div
                        className={`flex flex-row-reverse w-full items-center justify-between `}
                      >
                        {/* Navigation Buttons */}
    
                        <div
                          className={`flex items-center gap-2.5 md:gap-4 lg:gap-6 ${
                            isRTL ? "flex-row" : "flex-row-reverse"
                          }`}
                        >
                         
    
                         
                        </div>
    
                        {/* User Info */}
    
                    
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

        {/* Form Section */}
        <div
          className={`flex flex-col w-full lg:w-[668px] items-center gap-8 lg:gap-20 ${
            isRTL ? "order-1 lg:order-1" : "order-1 lg:order-2"
          }`}
        >
          <div className="flex flex-col w-full max-w-[643px] items-center gap-4 lg:gap-6">
            <h1
              className={`text-2xl sm:text-3xl lg:text-[40px] font-semibold text-[#1a1713] text-center leading-tight font-['Cairo',Helvetica]`}
            >
              {t("welcome")}
            </h1>

            <h2
              className={`text-xl sm:text-2xl lg:text-[32px] font-semibold text-[#835f40] text-center leading-tight font-['Cairo',Helvetica]`}
            >
              {t("createAccount")}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-6 w-full max-w-[643px]"
          >
            <div className="flex flex-col items-start gap-6 w-full">
              {/* Name Fields Row */}
              <div className="flex gap-4 w-full">
                {/* First Name Field */}
                <div
                  className={`flex flex-col gap-3 w-full ${
                    isRTL ? "items-end" : "items-start"
                  }`}
                >
                  <Label
                    className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                      isRTL ? "text-right w-full" : "text-left w-full"
                    }`}
                  >
                    {t("firstName")}
                  </Label>

                  <Input
                    type="text"
                    placeholder={t("firstNamePlaceholder")}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onBlur={() => handleFieldBlur("firstName")}
                    className={`h-12 lg:h-14 px-4 py-2 w-full rounded-[10px] border border-solid focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] placeholder:text-[#999] ${
                      errors.firstName && touchedFields.firstName
                        ? "border-red-500"
                        : "border-[#c3c3c3]"
                    } ${isRTL ? "text-right" : "text-left"}`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  {errors.firstName && touchedFields.firstName && (
                    <p
                      className={`text-red-500 text-sm mt-1 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name Field */}
                <div
                  className={`flex flex-col gap-3 w-full ${
                    isRTL ? "items-end" : "items-start"
                  }`}
                >
                  <Label
                    className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                      isRTL ? "text-right w-full" : "text-left w-full"
                    }`}
                  >
                    {t("lastName")}
                  </Label>

                  <Input
                    type="text"
                    placeholder={t("lastNamePlaceholder")}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onBlur={() => handleFieldBlur("lastName")}
                    className={`h-12 lg:h-14 px-4 py-2 w-full rounded-[10px] border border-solid focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] placeholder:text-[#999] ${
                      errors.lastName && touchedFields.lastName
                        ? "border-red-500"
                        : "border-[#c3c3c3]"
                    } ${isRTL ? "text-right" : "text-left"}`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  {errors.lastName && touchedFields.lastName && (
                    <p
                      className={`text-red-500 text-sm mt-1 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              {/* Business Name */}
<div className="flex flex-col gap-3 w-full">
  <Label>{t("businessName")}</Label>
  <Input
    type="text"
    placeholder={t("businessNamePlaceholder")}
    value={businessName}
    onChange={(e) => setBusinessName(e.target.value)}
    onBlur={() => handleFieldBlur("businessName")}
  />
  {errors.businessName && touchedFields.businessName && (
    <p className="text-red-500 text-sm">{errors.businessName}</p>
  )}
</div>

{/* Business Description */}
<div className="flex flex-col gap-3 w-full">
  <Label>{t("businessDescription")}</Label>
  <Input
    type="text"
    placeholder={t("businessDescriptionPlaceholder")}
    value={businessDescription}
    onChange={(e) => setBusinessDescription(e.target.value)}
    onBlur={() => handleFieldBlur("businessDescription")}
  />
  {errors.businessDescription && touchedFields.businessDescription && (
    <p className="text-red-500 text-sm">{errors.businessDescription}</p>
  )}
</div>

{/* Business Address */}
<div className="flex flex-col gap-3 w-full">
  <Label>{t("businessAddress")}</Label>
  <Input
    type="text"
    placeholder={t("businessAddressPlaceholder")}
    value={businessAddress}
    onChange={(e) => setBusinessAddress(e.target.value)}
    onBlur={() => handleFieldBlur("businessAddress")}
  />
  {errors.businessAddress && touchedFields.businessAddress && (
    <p className="text-red-500 text-sm">{errors.businessAddress}</p>
  )}
</div>

{/* Business Phone */}
<div className="flex flex-col gap-3 w-full">
  <Label>{t("businessPhone")}</Label>
  <Input
    type="text"
    placeholder={t("businessPhonePlaceholder")}
    value={businessPhone}
    onChange={(e) => setBusinessPhone(e.target.value)}
    onBlur={() => handleFieldBlur("businessPhone")}
  />
  {errors.businessPhone && touchedFields.businessPhone && (
    <p className="text-red-500 text-sm">{errors.businessPhone}</p>
  )}
</div>

{/* Business Email */}
<div className="flex flex-col gap-3 w-full">
  <Label>{t("businessEmail")}</Label>
  <Input
    type="email"
    placeholder={t("businessEmailPlaceholder")}
    value={businessEmail}
    onChange={(e) => setBusinessEmail(e.target.value)}
    onBlur={() => handleFieldBlur("businessEmail")}
  />
  {errors.businessEmail && touchedFields.businessEmail && (
    <p className="text-red-500 text-sm">{errors.businessEmail}</p>
  )}
</div>

{/* Website */}
<div className="flex flex-col gap-3 w-full">
  <Label>{t("website")}</Label>
  <Input
    type="url"
    placeholder={t("websitePlaceholder")}
    value={website}
    onChange={(e) => setWebsite(e.target.value)}
    onBlur={() => handleFieldBlur("website")}
  />
  {errors.website && touchedFields.website && (
    <p className="text-red-500 text-sm">{errors.website}</p>
  )}
</div>

{/* Tax ID */}
<div className="flex flex-col gap-3 w-full">
  <Label>{t("taxId")}</Label>
  <Input
    type="text"
    placeholder={t("taxIdPlaceholder")}
    value={taxId}
    onChange={(e) => setTaxId(e.target.value)}
    onBlur={() => handleFieldBlur("taxId")}
  />
  {errors.taxId && touchedFields.taxId && (
    <p className="text-red-500 text-sm">{errors.taxId}</p>
  )}
</div>

{/* Trade License URL */}
<div className="flex flex-col gap-3 w-full">
  <Label>{t("tradeLicenseUrl")}</Label>
  <Input
    type="url"
    placeholder={t("tradeLicenseUrlPlaceholder")}
    value={tradeLicenseUrl}
    onChange={(e) => setTradeLicenseUrl(e.target.value)}
    onBlur={() => handleFieldBlur("tradeLicenseUrl")}
  />
  {errors.tradeLicenseUrl && touchedFields.tradeLicenseUrl && (
    <p className="text-red-500 text-sm">{errors.tradeLicenseUrl}</p>
  )}
</div>

{/* VAT Certificate URL */}
<div className="flex flex-col gap-3 w-full">
  <Label>{t("vatCertificateUrl")}</Label>
  <Input
    type="url"
    placeholder={t("vatCertificateUrlPlaceholder")}
    value={vatCertificateUrl}
    onChange={(e) => setVatCertificateUrl(e.target.value)}
    onBlur={() => handleFieldBlur("vatCertificateUrl")}
  />
  {errors.vatCertificateUrl && touchedFields.vatCertificateUrl && (
    <p className="text-red-500 text-sm">{errors.vatCertificateUrl}</p>
  )}
</div>

{/* Business Registration URL */}
<div className="flex flex-col gap-3 w-full">
  <Label>{t("businessRegistrationUrl")}</Label>
  <Input
    type="url"
    placeholder={t("businessRegistrationUrlPlaceholder")}
    value={businessRegistrationUrl}
    onChange={(e) => setBusinessRegistrationUrl(e.target.value)}
    onBlur={() => handleFieldBlur("businessRegistrationUrl")}
  />
  {errors.businessRegistrationUrl && touchedFields.businessRegistrationUrl && (
    <p className="text-red-500 text-sm">{errors.businessRegistrationUrl}</p>
  )}
</div>


              {/* Phone Number Field */}
              <div
                className={`flex flex-col gap-3 w-full ${
                  isRTL ? "items-end" : "items-start"
                }`}
              >
                <Label
                  className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                    isRTL ? "text-right w-full" : "text-left w-full"
                  }`}
                >
                  {t("phoneNumber")}
                </Label>

                <div
                  className={`flex h-12 lg:h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border border-solid ${
                    errors.phoneNumber && touchedFields.phoneNumber
                      ? "border-red-500"
                      : "border-[#c3c3c3]"
                  } ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      isRTL ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <span className="text-[#292929] text-sm font-['Cairo',Helvetica]">
                      +966
                    </span>
                    <div className="w-px h-8 bg-[#c3c3c3]"></div>
                  </div>
                  <Input
                    type="text"
                    value={phoneNumber}
                    placeholder={t("phoneNumberPlaceholder")}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => {
                      const onlyDigits = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 10);
                      setPhoneNumber(onlyDigits);
                    }}
                    onBlur={() => handleFieldBlur("phoneNumber")}
                    className={`flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
                {errors.phoneNumber && touchedFields.phoneNumber && (
                  <p
                    className={`text-red-500 text-sm mt-1 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div
                className={`flex flex-col gap-3 w-full ${
                  isRTL ? "items-end" : "items-start"
                }`}
              >
                <Label
                  className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                    isRTL ? "text-right w-full" : "text-left w-full"
                  }`}
                >
                  {t("email")}
                </Label>

                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleFieldBlur("email")}
                  className={`h-12 lg:h-14 px-4 py-2 w-full rounded-[10px] border border-solid focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] placeholder:text-[#999] ${
                    errors.email && touchedFields.email
                      ? "border-red-500"
                      : "border-[#c3c3c3]"
                  } ${isRTL ? "text-right" : "text-left"}`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                {errors.email && touchedFields.email && (
                  <p
                    className={`text-red-500 text-sm mt-1 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div
                className={`flex flex-col gap-3 w-full ${
                  isRTL ? "items-end" : "items-start"
                }`}
              >
                <Label
                  className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                    isRTL ? "text-right w-full" : "text-left w-full"
                  }`}
                >
                  {t("password")}
                </Label>

                <div
                  className={`flex h-12 lg:h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border border-solid ${
                    errors.password && touchedFields.password
                      ? "border-red-500"
                      : "border-[#c3c3c3]"
                  } ${isRTL ? "flex-row" : "flex-row"}`}
                >
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("passwordPlaceholder")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleFieldBlur("password")}
                    className={`flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] placeholder:text-[#999] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#666]" />
                    ) : (
                      <EyeIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#666]" />
                    )}
                  </button>
                </div>
                {errors.password && touchedFields.password && (
                  <p
                    className={`text-red-500 text-sm mt-1 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Region and City Fields Row */}
              <div className="flex gap-4 w-full">
                {/* Region Field */}
                <div
                  className={`flex flex-col gap-3 w-full ${
                    isRTL ? "items-end" : "items-start"
                  }`}
                >
                  <Label
                    className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                      isRTL ? "text-right w-full" : "text-left w-full"
                    }`}
                  >
                    {t("region")}
                  </Label>

                  <div
                    className={`flex h-12 lg:h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border border-solid border-[#c3c3c3] ${
                      isRTL ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className={`flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] appearance-none ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <option value="">{t("selectRegion")}</option>
                      <option value="riyadh">{t("riyadh")}</option>
                      <option value="makkah">{t("makkah")}</option>
                      <option value="eastern">{t("eastern")}</option>
                    </select>
                    <ChevronDownIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#666]" />
                  </div>
                  {errors.region && touchedFields.region && (
                    <p
                      className={`text-red-500 text-sm mt-1 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {errors.region}
                    </p>
                  )}
                </div>

                {/* City Field */}
                <div
                  className={`flex flex-col gap-3 w-full ${
                    isRTL ? "items-end" : "items-start"
                  }`}
                >
                  <Label
                    className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                      isRTL ? "text-right w-full" : "text-left w-full"
                    }`}
                  >
                    {t("city")}
                  </Label>

                  <div
                    className={`flex h-12 lg:h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border border-solid border-[#c3c3c3] ${
                      isRTL ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] appearance-none ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <option value="">{t("selectCity")}</option>
                      <option value="riyadh-city">{t("riyadhCity")}</option>
                      <option value="jeddah">{t("jeddah")}</option>
                      <option value="dammam">{t("dammam")}</option>
                    </select>
                    <ChevronDownIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#666]" />
                  </div>
                  {errors.city && touchedFields.city && (
                    <p
                      className={`text-red-500 text-sm mt-1 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {errors.city}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div
                className={`flex items-start gap-3 w-full ${
                  isRTL ? "flex-row" : "flex-row"
                }`}
              >
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                  }}
                  className=" w-4 h-4 text-[#835f40] bg-gray-100 border-gray-300 rounded focus:ring-[#835f40] focus:ring-2"
                />
                <label
                  htmlFor="terms"
                  className={`text-xs text-[#666] font-['Cairo',Helvetica] cursor-pointer ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("termsAndConditions")}
                </label>
              </div>

              {/* Terms and Conditions Error */}
              {errors.acceptTerms && touchedFields.acceptTerms && (
                <p
                  className={`text-red-500 text-sm ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("termsRequired")}
                </p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-12 lg:h-14 text-white font-bold text-lg font-['Cairo',Helvetica] rounded-[10px] transition-all duration-200 border-0 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:bg-[linear-gradient(270deg,rgba(128,91,60,0.9)_0%,rgba(211,186,164,0.9)_100%)]"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t("createAccountButton")}...</span>
                  </div>
                ) : (
                  t("createAccountButton")
                )}
              </Button>

              {/* Sign In Link */}
              <div
                className={`flex items-center gap-2 w-full justify-center text-sm font-['Cairo',Helvetica]`}
              >
                <span className="text-[#666]">{t("haveAccount")}</span>
                <button
                  type="button"
                  onClick={navigateToSignIn}
                  className="text-[#835f40] hover:text-[#6b4a32] underline font-medium transition-colors"
                >
                  {t("signIn")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        email={email}
        verificationType="registration"
      />
    </div>
  );
};
