import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
} from "lucide-react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalValue } from "../../Store/Store";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { LanguageToggle } from "../../components/LanguageToggle";
import { VerificationModal } from "../../components/VerificationModal";
import api from "../../Api/Axios";
import Swal from "sweetalert2";
import { Select } from "@heroui/react";

export const SignIn = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isRTL = i18n.language === "ar";
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

  // Re-validate when language changes to update error messages
  React.useEffect(() => {
    if (Object.keys(touchedFields).length > 0) {
      validateForm();
    }
  }, [i18n.language]);

  // Navigation handlers
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
  const validatePassword = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasMinLength = password.length >= 12;

    return hasLowerCase && hasUpperCase && hasSymbols && hasMinLength;
  };
  const handleFieldBlur = (fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
    if (fieldName === "identifier") {
      // Trim whitespace
      const trimmed = identifier.trim();
      setIdentifier(trimmed);
      // Detect phone vs email
      const isPhone = /^\d+$/.test(trimmed);
      if (!isPhone) {
        setUserEmail(trimmed);
      } else {
        setPhoneNumber(trimmed);
      }
      dispatch(
        setGlobalValue({
          key: isPhone ? "Phone" : "Email",
          value: trimmed,
        })
      );
      dispatch(
        setGlobalValue({
          key: "identifierType",
          value: isPhone ? "PHONE" : "EMAIL",
        })
      );
    }
    validateForm();
  };
  const validateForm = () => {
    const newErrors = {};
    if (!password.trim()) {
      newErrors.password = t("passwordRequired");
    } else if (!validatePassword(password)) {
      newErrors.password = t("passwordInvalid");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* const isFormValid = () => {
    return (
      phoneNumber.trim() &&
      phoneNumber.length === 10 &&
      password.trim() &&
      validatePassword(password)
    );
  }; */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched
    setTouchedFields({
      identifier: true,
      password: true,
    });
    const trimmed = identifier.trim();
    setIdentifier(trimmed);
    const isPhone = /^\d+$/.test(trimmed);
    dispatch(
      setGlobalValue({
        key: isPhone ? "Phone" : "Email",
        value: trimmed,
      })
    );

    if (!validateForm()) {
      setIsSubmitting(false);
      console.log("Validation errors:", errors);
      return;
    }
    const payload = {
      identifierType: isPhone ? "PHONE" : "EMAIL",
      identifier: trimmed,
      password: password,
    };

    try {
      const response = await api.post("/api/auth/login-seller", payload);

      console.log("Response:", response.data);

      // ✅ Only if success = true
      if (response.data?.success === true) {
        const { email, phoneNumber } = response.data.data || {};

        // Save email/phone to local state
        if (email) setUserEmail(email);
        if (phoneNumber) setPhoneNumber(phoneNumber);

        setShowVerificationModal(true);
      }
    } catch (error) {
      console.error(
        "❌ Login failed:",
        error.response?.data?.message || error.message
      );

      if (error.response?.data?.message === "Invalid credentials") {
        // 🔴 Case 1: Invalid credentials
        Swal.fire({
          title: t("errorTitle"),
          text: t("invalidCredentials"),
          icon: "error",
          confirmButtonText: t("ok"),
          confirmButtonColor: "#dc3545", // red for error
          customClass: {
            popup: isRTL ? "swal-rtl" : "swal-ltr",
            title: "font-['Cairo',Helvetica] text-center",
            htmlContainer: "font-['Cairo',Helvetica] text-center",
            confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
          },
        });
      } else if (error.response?.data?.message?.startsWith("User not found:")) {
        // 🔴 Case 2: User not found — message includes username
        Swal.fire({
          title: t("errorTitle"),
          text: t("userNotFound"),
          icon: "error",
          confirmButtonText: t("ok"),
          confirmButtonColor: "#dc3545",
          customClass: {
            popup: isRTL ? "swal-rtl" : "swal-ltr",
            title: "font-['Cairo',Helvetica] text-center",
            htmlContainer: "font-['Cairo',Helvetica] text-center",
            confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
          },
        });
      } else {
        // 🔴 Default fallback
        Swal.fire({
          title: t("errorTitle"),
          text:
            error.response?.data?.message ||
            t("unknownError") ||
            "An unexpected error occurred.",
          icon: "error",
          confirmButtonText: t("ok"),
          confirmButtonColor: "#dc3545",
          customClass: {
            popup: isRTL ? "swal-rtl" : "swal-ltr",
            title: "font-['Cairo',Helvetica] text-center",
            htmlContainer: "font-['Cairo',Helvetica] text-center",
            confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
          },
        });
      }

      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };
  const navigateToForgotPassword = async () => {
    const trimmed = identifier.trim();
    const isPhone = /^\d+$/.test(trimmed); // check if only digits

    try {
      // 1️⃣ Call your backend API (using Axios instance)
      const response = await api.post("/api/auth/forgot-password", null, {
        params: { identifier: trimmed },
      });

      const apiData = response.data; // the full ApiResponse from backend
      console.log("API Data:", apiData);
      const identifiers = apiData?.data || {}; // expected { email, phone }
      console.log("Identifiers:", identifiers);

      // 3️⃣ Navigate to the forgot-password page, also passing state
      navigate("/forgot-password", {
        state: {
          identifiers, // contains both email and phone
        },
      });
    } catch (error) {
      console.error("Error fetching identifiers:", error);
      alert("Could not retrieve identifiers. Please try again.");
    }
  };

  return (
    <div className="bg-[#fefefe] w-full min-h-screen relative overflow-hidden">
      <LanguageToggle />

      <div
        className={`flex flex-col lg:flex-row w-full max-w-[1360px] mx-auto items-center justify-between gap-4 p-4 lg:p-10 min-h-screen ${
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
          <div className="flex flex-col w-full max-w-[503px] items-center gap-4 lg:gap-6">
            <h1
              className={`text-2xl sm:text-3xl  lg:text-[40px] font-semibold text-[#1a1713] text-center leading-tight font-['Cairo',Helvetica]`}
            >
              {t("welcome")}
            </h1>

            <h2
              className={`text-xl sm:text-2xl lg:text-[32px] font-semibold text-[#835f40] text-center leading-tight font-['Cairo',Helvetica]`}
            >
              {t("signIn")}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-6 w-full max-w-[503px]"
          >
            <div className="flex flex-col items-start gap-6 w-full">
              {/* Phone Number or Email Field */}
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
                  {t("phoneNumberOrEmail")}
                </Label>

                <div
                  className={`flex h-12 lg:h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border border-solid border-[#c3c3c3] ${
                    errors.identifier && touchedFields.identifier
                      ? "border-red-500"
                      : "border-[#c3c3c3]"
                  } ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* <div
                    className={`flex items-center gap-2 ${
                      isRTL ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div className="w-px h-8 bg-[#c3c3c3]"></div>
                    <span className="text-[#292929] text-sm font-['Cairo',Helvetica]">
                      +966
                    </span>
                  </div> */}
                  <Input
                    type="text"
                    placeholder={t("phoneNumberOrEmailPlaceholder")}
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                    }}
                    onBlur={() => {
                      handleFieldBlur("identifier");
                    }}
                    className={`flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
                {errors.identifier && touchedFields.identifier && (
                  <p
                    className={`text-red-500 text-sm mt-1 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {errors.identifier}
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
                  className={`flex h-12 lg:h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border border-solid border-[#c3c3c3] ${
                    errors.password && touchedFields.password
                      ? "border-red-500"
                      : "border-[#c3c3c3]"
                  } ${isRTL ? "flex-row" : "flex-row-reverse"}`}
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

                {identifier.trim() ? (
                  <button
                    type="button"
                    onClick={navigateToForgotPassword}
                    className={`text-sm text-[#835f40] hover:text-[#6b4a32] underline transition-colors font-['Cairo',Helvetica] ${
                      isRTL
                        ? "self-end w-full text-right"
                        : "self-start w-full text-left"
                    }`}
                  >
                    {t("forgotPassword")}
                  </button>
                ) : (
                  <span
                    className={`text-sm text-gray-400 cursor-not-allowed font-['Cairo',Helvetica] ${
                      isRTL
                        ? "self-end w-full text-right"
                        : "self-start w-full text-left"
                    }`}
                  >
                    {t("forgotPassword")}
                  </span>
                )}
              </div>

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
                    <span>{t("signInButton")}...</span>
                  </div>
                ) : (
                  t("signInButton")
                )}
              </Button>

              {/* Sign Up Link */}
              <div
                className={`flex items-center gap-2 w-full justify-center text-sm font-['Cairo',Helvetica] `}
              >
                <span className="text-[#666]">{t("noAccount")}</span>
                <button
                  type="button"
                  onClick={navigateToRegister}
                  className="text-[#835f40] hover:text-[#6b4a32] underline font-medium transition-colors"
                >
                  {t("createAccount")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <VerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        email={userEmail}
        verificationType="login"
      />
    </div>
  );
};
