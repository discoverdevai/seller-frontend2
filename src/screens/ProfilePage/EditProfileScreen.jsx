import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import api from "../../Api/Axios";
import { useTranslation } from "react-i18next";

export const EditProfileScreen = () => {
  const { t } = useTranslation();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ===============================
     Fetch profile (FULL OBJECT)
     =============================== */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/vendor/settings/general");
        if (res.data.success) {
          setProfile(res.data.data);
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* ===============================
     Handle field change
     =============================== */
  const handleChange = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /* ===============================
     Save (SEND FULL BODY)
     =============================== */
  const handleSave = async () => {
    setSaving(true);
    try {
      const body = {
        storeName: profile.storeName || "",
        storeLogoUrl: profile.storeLogoUrl || "",
        mobileNumber: profile.mobileNumber || "",
        email: profile.email || "",
        facebookLink: profile.facebookLink || "",
        instagramLink: profile.instagramLink || "",
        whatsappLink: profile.whatsappLink || "",
        defaultLanguage: profile.defaultLanguage || "ar",
        timezone: profile.timezone || "GMT+3",
        defaultCurrency: profile.defaultCurrency || "SAR",
      };

      const res = await api.put("/api/vendor/settings/general", body);

      if (res.data.success) {
        alert(t("editProfile.alert.success"));
      } else {
        alert(res.data.message || t("editProfile.alert.fail"));
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      alert(t("editProfile.alert.error"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">{t("editProfile.loading")}</div>;
  if (!profile) return <div className="p-6">{t("editProfile.loadError")}</div>;

  return (
    <div className="bg-[#fefefe] w-full min-h-screen flex ">
      <main className="flex-1 bg-[#faf9f7] flex justify-center">
        <div className="mt-10 w-full max-w-[1179px] px-4 flex flex-col gap-8">

          {/* Store Name */}
          <div className="flex flex-col gap-3">
            <Label className="text-lg text-[#1a1713]">
              {t("editProfile.storeName")}
            </Label>
            <Input
              value={profile.storeName || ""}
              onChange={(e) => handleChange("storeName", e.target.value)}
              className="h-14"
            />
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col gap-3">
            <Label className="text-lg text-[#1a1713]">
              {t("editProfile.mobileNumber")}
            </Label>
            <Input
              value={profile.mobileNumber || ""}
              onChange={(e) => handleChange("mobileNumber", e.target.value)}
              className="h-14"
            />
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={saving}
            className="h-14 rounded-[10px] bg-gradient-to-r from-[#805b3c] to-[#d3baa4]"
          >
            <span className="text-white text-lg">
              {saving ? t("editProfile.saving") : t("editProfile.save")}
            </span>
          </Button>
        </div>
      </main>
    </div>
  );
};
