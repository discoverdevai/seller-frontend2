import React, { useState, useEffect } from "react";
import api from "../../Api/Axios";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { useTranslation } from "react-i18next";

const contactFields = [
  { key: "mobileNumber", labelKey: "general.mobileNumber", type: "phone" },
  { key: "email", labelKey: "general.email" },
  { key: "facebookLink", labelKey: "general.facebookLink" },
  { key: "instagramLink", labelKey: "general.instagramLink" },
  { key: "whatsappLink", labelKey: "general.whatsappLink" },
];

export const GeneralSettingsTab = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch general settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("/api/vendor/settings/general");
        if (response.data.success) {
          setSettings(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch general settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await api.put("/api/vendor/settings/general", settings);
      if (response.data.success) {
        alert(t("general.settingsSaved"));
      } else {
        alert(t("general.settingsSaveError") + ": " + response.data.message);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert(t("general.settingsSaveErrorGeneric"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>{t("general.loadingSettings")}</div>;
  if (!settings) return <div>{t("general.unableToLoadSettings")}</div>;

  return (
    <div className="flex flex-col gap-6 w-full ">
      {/* About Store */}
      <section className="flex flex-col items-start gap-6 w-full">
        <h2 className="text-[#1a1713] text-xl font-semibold ">
          {t("general.aboutStore")}
        </h2>
        <div className="w-full bg-[#fefefe] rounded-3xl overflow-hidden p-6 flex flex-col gap-8">
          <div className="flex flex-col items-start gap-3 w-full">
            <Label className="text-[#1a1713] font-medium">
              {t("general.storeLogo")} <span className="text-[#b90000]">*</span>
            </Label>
            <div className="w-full h-36 rounded-lg overflow-hidden border border-dashed border-[#c3c3c3] flex items-center justify-center">
              {settings.storeLogoUrl ? (
                <img
                  src={settings.storeLogoUrl}
                  alt={t("general.storeLogo")}
                  className="h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <img className="w-6 h-6" alt="Gallery export" src="/gallery-export.svg" />
                  <div className="text-center text-[#4f4f4f] text-sm leading-5 ">
                    {t("general.clickToUploadLogo")}
                    <br />
                    <span className="text-xs">{t("general.uploadGuidelines")}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6 w-full">
            <div className="flex flex-col flex-1 items-start gap-3 w-full">
              <Label className="text-[#1a1713] font-medium">
                {t("general.storeName")}
              </Label>
              <Input
                className="h-14 px-4 py-2 w-full rounded-[10px] border border-solid border-[#c3c3c3] text-right"
                value={settings.storeName || ""}
                onChange={(e) => handleChange("storeName", e.target.value)}
              />
            </div>

            <div className="flex flex-col flex-1 items-start gap-3 w-full">
              <Label className="text-[#1a1713] font-medium">
                {t("general.mobileNumber")}
              </Label>
              <Input
                className="h-14 px-4 py-2 w-full rounded-[10px] border border-solid border-[#c3c3c3] text-right"
                value={settings.mobileNumber || ""}
                onChange={(e) => handleChange("mobileNumber", e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="flex flex-col items-start gap-6 w-full">
        <h2 className="text-[#1a1713] text-xl font-semibold ">
          {t("general.contactInformation")}
        </h2>
        <div className="w-full bg-[#fefefe] rounded-3xl overflow-hidden p-6 flex flex-col gap-4">
          {contactFields.map((field, index) => (
            <div key={index} className="flex flex-col items-start gap-3 w-full">
              <Label className="text-[#1a1713] font-medium">
                {t(field.labelKey)}
              </Label>
              <Input
                className="h-14 px-4 py-2 w-full rounded-[10px] border border-solid border-[#c3c3c3] text-right"
                value={settings[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* General Settings */}
      <section className="flex flex-col items-start gap-6 w-full">
        <h2 className="text-[#1a1713] text-xl font-semibold ">
          {t("general.generalSettings")}
        </h2>
        <div className="w-full bg-[#fefefe] rounded-3xl overflow-hidden p-6 flex flex-col gap-4">
          <div className="flex flex-col items-start gap-3 w-full">
            <Label className="text-[#1a1713] font-medium">{t("general.defaultLanguage")}</Label>
            <Input
              className="h-14 px-4 py-2 w-full rounded-[10px] border border-solid border-[#c3c3c3] text-right"
              value={settings.defaultLanguage || ""}
              onChange={(e) => handleChange("defaultLanguage", e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start gap-3 w-full">
            <Label className="text-[#1a1713] font-medium w-full text-right">{t("general.timezone")}</Label>
            <Input
              className="h-14 px-4 py-2 w-full rounded-[10px] border border-solid border-[#c3c3c3] text-right"
              value={settings.timezone || ""}
              onChange={(e) => handleChange("timezone", e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start gap-3 w-full">
            <Label className="text-[#1a1713] font-medium">{t("general.defaultCurrency")}</Label>
            <Input
              className="h-14 px-4 py-2 w-full rounded-[10px] border border-solid border-[#c3c3c3] text-right"
              value={settings.defaultCurrency || ""}
              onChange={(e) => handleChange("defaultCurrency", e.target.value)}
            />
          </div>
        </div>
      </section>

      <Button
        className="h-14 w-full rounded-[10px] bg-gradient-to-r from-[#835b3c] to-[#d3baa4] hover:opacity-90"
        onClick={handleSave}
        disabled={saving}
      >
        <span className="text-white font-medium">
          {saving ? t("general.saving") : t("general.save")}
        </span>
      </Button>
    </div>
  );
};
