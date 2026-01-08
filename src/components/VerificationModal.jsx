import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import api from "../Api/Axios";
import { useNavigate } from "react-router-dom";

import { user } from "@heroui/react";

export const VerificationModal = ({
  isOpen,
  onClose,
  email,
  verificationType = "registration",
  onSuccess,
  newPassword
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const Phone = useSelector((state) => state.global.Phone);
  const Email = useSelector((state) => state.global.Email);
  const identifierType = useSelector((state) => state.global.identifierType);

  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  const isRTL = i18n.language === "ar";
  let identifier = null;
  if (identifierType === "PHONE") {
    identifier = Phone?.trim();
  } else if (identifierType === "EMAIL") {
    identifier = Email?.trim();
  }
  /* console.log("identifierType:", identifierType);
  console.log("identifier:", identifier); */

  const encryptEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    if (!domain) return email;

    const visiblePart = localPart.slice(0, 2);
    const maskedPart = "*".repeat(Math.max(0, localPart.length - 2));

    return `${visiblePart}${maskedPart}@${domain}`;
  };

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [isOpen, timeLeft]);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(60);
      setCanResend(false);
      setVerificationCode(["", "", "", ""]);
      setIsVerifying(false);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleInputChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < verificationCode.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every((digit) => digit !== "")) {
      setTimeout(() => {
        handleVerify(newCode.join(""));
      }, 500);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    setTimeLeft(60);
    setCanResend(false);
    setVerificationCode(["", "", "", ""]);

    try {
      // Determine endpoint and params dynamically
      let endpoint = "";
      let params = {
        type: identifierType, // "PHONE" or "EMAIL"
        identifier: identifier, // from your redux state (cleaned above)
      };

      if (verificationType === "registration" || verificationType === "login") {
        endpoint = "api/auth/send-otp";
      } else if (verificationType === "forgot-password") {
        endpoint = "api/auth/forgot-password/send-otp";
      }

      if (!endpoint) {
        console.error("No endpoint defined for:", verificationType);
        return;
      }

      // ✅ Make POST request (your backend expects @RequestParam)
      const response = await api.post(endpoint, null, { params });

      Swal.fire({
        title: t("otpResentTitle"),
        text: t("otpResentMessage"),
        icon: "success",
        confirmButtonText: t("ok"),
        confirmButtonColor: "#28a745",
        customClass: {
          popup: isRTL ? "swal-rtl" : "swal-ltr",
          title: "font-['Cairo',Helvetica] text-center",
          htmlContainer: "font-['Cairo',Helvetica] text-center",
          confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
        },
      });

      // Refocus on first input
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error("Resend OTP error:", error);

      Swal.fire({
        title: t("errorTitle"),
        text: t("otpResendError"),
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

      inputRefs.current[0]?.focus();
    }
  };

  const handleVerify = async (code) => {
    if (code.length !== 4 || isVerifying) return;

    setIsVerifying(true);

    try {
      let endpoint = "";
      let params = {};
      if (verificationType === "registration") {
        params = {
          type: identifierType,
          identifier: Email,
          otp: code,
        };
        endpoint = "api/auth/verify-seller-registration";
      } else if (verificationType === "login") {
        params = {
          type: identifierType, // "PHONE" or "EMAIL"
          identifier: identifier,
          otp: code,
        };
        endpoint = "/api/auth/login-seller-verify";
      } else if (verificationType === "forgot-password") {
        params = {
          type: identifierType, // "PHONE" or "EMAIL"
          identifier: identifier,
          otp: code,
          newPassword: newPassword,
        };
        endpoint = "/api/auth/reset-password";
      }

      if (!endpoint) {
        console.log("Endpoint not configured yet for:", verificationType);
        setIsVerifying(false);
        return;
      }
      console.log("Verifying with params:", params);

      const response = await api.post(endpoint, null, { params });

      console.log("Verification response:", response.data);

      if (verificationType === "registration") {
        Swal.fire({
          title: t("accountCreatedTitle"),
          text: t("accountCreatedText"),
          icon: "success",
          confirmButtonText: t("ok"),
          confirmButtonColor: "#28a745",
          allowOutsideClick: false,
          allowEscapeKey: false,
          customClass: {
            popup: isRTL ? "swal-rtl" : "swal-ltr",
            title: `font-['Cairo',Helvetica] text-center`,
            htmlContainer: `font-['Cairo',Helvetica] text-center`,
            confirmButton: `font-['Cairo',Helvetica] text-lg py-3 px-8`,
          },
        }).then((result) => {
          if (result.isConfirmed) {
            onClose();
            navigate("/"); // Redirect to sign-in page
          }
        });
      } else if (verificationType === "login") {
        const userData = response.data;
        const token = userData.token;
        localStorage.setItem("userData", JSON.stringify(userData));

        // ======================== 🛒 Sync Local Cart ==================================

        const localCart = JSON.parse(localStorage.getItem("cart")) || [];

        if (localCart.length > 0) {
          try {
            for (const item of localCart) {
              const body = {
                productId: item.product?.id || item.productId,
                quantity: item.quantity,
                variant: item.variant || null,
              };
              await api.post(`/api/cart/add`, body);
            }
            localStorage.removeItem("cart");
          } catch (err) {
            console.error("Error syncing cart:", err);
          }
        }

        // ========================== 💖 Sync Local Wishlist =================================
        const localWishlist =
          JSON.parse(localStorage.getItem("wishlist")) || [];
        if (localWishlist.length > 0) {
          try {
            for (const productId of localWishlist) {
              await api.post(`/api/wishlist/${productId}`);
            }
            localStorage.removeItem("wishlist");
          } catch (err) {
            console.error("Error syncing wishlist:", err);
          }
        }

        Swal.fire({
          toast: true,
          position: "top",
          title: t("loginSuccessTitle"),
          text: t("loginSuccessText"),
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          background: "#ffffff",
          color: "#000000",
          iconColor: "#28a745",
          customClass: {
            title: "font-['Cairo',Helvetica] text-center",
            htmlContainer: "font-['Cairo',Helvetica] text-center",
            confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
          },
        });
        setTimeout(() => {
          onClose();
          navigate("/home");
        }, 1500);
      } else if (verificationType === "forgot-password") {
        Swal.fire({
          title: t("verificationSuccessTitle"),
          text: t("verificationSuccessText"),
          icon: "success",
          confirmButtonText: t("ok"),
          confirmButtonColor: "#28a745",
          allowOutsideClick: false,
          allowEscapeKey: false,
          customClass: {
            popup: isRTL ? "swal-rtl" : "swal-ltr",
            title: "font-['Cairo',Helvetica] text-center",
            htmlContainer: "font-['Cairo',Helvetica] text-center",
            confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            onClose();
            navigate("/"); // Redirect to reset password page
          }
        });
      }

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("Verification error:", error);
      console.log("Error response data:", error.response?.data);
      console.log(error.response?.data?.message);
      setVerificationCode(["", "", "", ""]);

      if (error.response?.data?.message == "Invalid OTP") {
        Swal.fire({
          title: t("errorTitle"),
          text: t("invalidOtpError"),
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
      } else if (error.response?.data?.message == "OTP expired") {
        Swal.fire({
          title: t("errorTitle"),
          text: t("otpExpiredError"),
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

      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <Dialog onClose={onClose}>
      <DialogContent
        className={`w-[707px] h-[526px] max-w-[90vw] max-h-[90vh] p-8 bg-white rounded-[20px] ${
          isRTL ? "text-right" : "text-left"
        }`}
        style={{ width: "min(707px, 90vw)", height: "min(526px, 90vh)" }}
        onClose={onClose}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <DialogHeader className="text-center">
            <DialogTitle
              className={`text-2xl lg:text-3xl font-semibold text-[#1a1713] font-['Cairo',Helvetica] ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("verificationCode")}
            </DialogTitle>
          </DialogHeader>

          <div className="text-center max-w-md">
            <p
              className={`text-base lg:text-lg text-[#666] font-['Cairo',Helvetica] leading-relaxed ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("verificationDescription")}
            </p>
            <p
              className={`text-base lg:text-lg text-[#1a1713] font-medium font-['Cairo',Helvetica] mt-2 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {encryptEmail(email)}
            </p>
          </div>

          <div
            className="flex gap-4 justify-center items-center"
            style={{ direction: "ltr" }}
          >
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    e.target.value.replace(/[^0-9]/g, "")
                  )
                }
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isVerifying}
                className={`w-16 h-16 lg:w-20 lg:h-20 text-center text-2xl font-bold border-2 border-[#c3c3c3] rounded-[10px] focus:border-[#835f40] focus:outline-none transition-colors font-['Cairo',Helvetica] ${
                  isVerifying ? "opacity-50 cursor-not-allowed" : ""
                }`}
                dir="ltr"
              />
            ))}
          </div>

          <div className="text-center">
            <p
              className={`text-sm lg:text-base text-[#666] font-['Cairo',Helvetica] ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("resendTimer")} {formatTime(timeLeft)} {t("seconds")}
            </p>
          </div>

          <div className="text-center">
            {canResend ? (
              <button
                onClick={handleResend}
                className={`text-[#835f40] hover:text-[#6b4a32] font-medium transition-colors font-['Cairo',Helvetica] ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("resendCode")}
              </button>
            ) : (
              <p
                className={`text-[#999] font-['Cairo',Helvetica] ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("didntReceiveCode")} {t("resendCode")}
              </p>
            )}
          </div>
          <style jsx global>{`
            .swal-rtl {
              direction: rtl;
              text-align: right;
            }
            .swal-ltr {
              direction: ltr;
              text-align: left;
            }
          `}</style>
        </div>
      </DialogContent>
    </Dialog>
  );
};
