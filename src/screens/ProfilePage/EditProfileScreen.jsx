import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import api from "../../Api/Axios";

export const EditProfileScreen = () => {
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
        alert("تم تحديث الملف الشخصي بنجاح");
      } else {
        alert(res.data.message || "فشل تحديث البيانات");
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("حدث خطأ أثناء حفظ البيانات");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">جاري تحميل البيانات...</div>;
  if (!profile) return <div className="p-6">تعذر تحميل البيانات</div>;

  return (
    <div className="bg-[#fefefe] w-full min-h-screen flex [direction:rtl]">
      <main className="flex-1 bg-[#faf9f7] flex justify-center">
        <div className="mt-10 w-full max-w-[1179px] px-4 flex flex-col gap-8">

          {/* Name */}
          <div className="flex flex-col gap-3">
            <Label className="text-lg text-[#1a1713]">اسم المتجر</Label>
            <Input
              value={profile.storeName || ""}
              onChange={(e) => handleChange("storeName", e.target.value)}
              className="h-14"
            />
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-3">
            <Label className="text-lg text-[#1a1713]">رقم الجوال</Label>
            <Input
              value={profile.mobileNumber || ""}
              onChange={(e) => handleChange("mobileNumber", e.target.value)}
              className="h-14"
            />
          </div>

          {/* Save */}
          <Button
            onClick={handleSave}
            disabled={saving}
            className="h-14 rounded-[10px] bg-gradient-to-r from-[#805b3c] to-[#d3baa4]"
          >
            <span className="text-white text-lg">
              {saving ? "جاري الحفظ..." : "حفظ"}
            </span>
          </Button>
        </div>
      </main>
    </div>
  );
};
