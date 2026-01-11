import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { VerificationModal } from "../../components/VerificationModal";
import api from "../../Api/Axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

export const ChangePasswordScreen = () => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const email = userData.email || "";

  const handleSave = async () => {
    if (!newPassword || !confirmPassword) {
      Swal.fire(t("changePassword.errorTitle"), t("changePassword.fillFields"), "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire(
        t("changePassword.errorTitle"),
        t("changePassword.passwordMismatch"),
        "error"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post(
        `/api/auth/forgot-password/send-otp`,
        null,
        {
          params: {
            type: "EMAIL",
            identifier: email,
          },
        }
      );

      if (response.data.success) {
        setShowVerificationModal(true);
      } else {
        Swal.fire(
          t("changePassword.errorTitle"),
          response.data.message || t("changePassword.updateFailed"),
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        t("changePassword.errorTitle"),
        error.response?.data?.message || t("changePassword.updateError"),
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fefefe] w-full min-h-[1024px] flex ">
      <main className="flex-1 flex flex-col">
        <section className="flex-1 bg-[#faf9f7]">
          <div className="flex flex-col items-start gap-8 mt-10 mx-6 w-[1179px]">
            <div className="flex flex-col items-start gap-8 w-full">
              {/* New Password */}
              <div className="flex flex-col w-full gap-3">
                <Label htmlFor="password" className="font-h4-medium text-[#1a1713]">
                  {t("changePassword.newPassword")}
                </Label>
                <div className="flex h-14 items-center px-4 py-2 w-full rounded-[10px] border border-[#c3c3c3]">
                  <div className="flex items-center justify-between flex-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("changePassword.newPasswordPlaceholder")}
                      className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 "
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <img
                      className="w-6 h-6 cursor-pointer"
                      alt="toggle-visibility"
                      src={showPassword ? "/eye-slash.png" : "/component-1.svg"}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col w-full gap-3">
                <Label htmlFor="confirm-password" className="font-h4-medium text-[#1a1713]">
                  {t("changePassword.confirmPassword")}
                </Label>
                <div className="flex h-14 items-center px-4 py-2 w-full rounded-[10px] border border-[#c3c3c3]">
                  <div className="flex items-center justify-between flex-1">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t("changePassword.confirmPasswordPlaceholder")}
                      className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <img
                      className="w-6 h-6 cursor-pointer"
                      alt="toggle-visibility"
                      src={showConfirmPassword ? "/eye-slash.png" : "/component-1.svg"}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                disabled={isSubmitting}
                className="h-14 w-full rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90"
              >
                <span className="text-[#fefefe] text-lg font-medium">
                  {isSubmitting ? t("changePassword.saving") : t("changePassword.save")}
                </span>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        email={email}
        verificationType="forgot-password"
        newPassword={newPassword}
      />
    </div>
  );
};
