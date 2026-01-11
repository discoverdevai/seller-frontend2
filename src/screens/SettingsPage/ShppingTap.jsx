// pages/Settings/ShippingTap.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import api from "../../Api/Axios";
import { useTranslation } from "react-i18next";
import { DashboardSkeleton } from "../../components/skeleton";

/* ===============================
   Shipping companies configuration
   =============================== */
const SHIPPING_COMPANIES = [
  { key: "SMSA_EXPRESS", logo: "/image-19.png" },
  { key: "ZAJIL_EXPRESS", logo: "/mask-group-3.png" },
  { key: "ARAMEX", logo: "/image-20.png" },
  { key: "NAQEL_EXPRESS", logo: "/image-22.png" },
];

export const ShippingTap = () => {
  const { t } = useTranslation();
  const [pricingType, setPricingType] = useState("");
  const [minimumFreeShipping, setMinimumFreeShipping] = useState("");
  const [deliveryRegions, setDeliveryRegions] = useState([]);
  const [shippingCompanies, setShippingCompanies] = useState({});
  const [loading, setLoading] = useState(false);

  /* ===============================
     Fetch shipping settings
     =============================== */
  useEffect(() => {
    const fetchShippingSettings = async () => {
      try {
         setLoading(true);
        const response = await api.get("/api/vendor/settings/shipping");
         
        if (response.data.success) {

          const data = response.data.data;
          setPricingType(data.pricingType ?? "");
          setMinimumFreeShipping(data.minimumFreeShipping ?? "");
          setDeliveryRegions(data.deliveryRegions ?? []);

          const mappedCompanies = {};
          Object.entries(data.shippingCompanies || {}).forEach(
            ([key, value]) => {
              mappedCompanies[key] = !!value.isEnabled;
            }
          );
          setShippingCompanies(mappedCompanies);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to load shipping settings:", error);
        setLoading(false);
      }
    };

    fetchShippingSettings();
  }, []);

  /* ===============================
     Toggle shipping company
     =============================== */
  const toggleCompany = (key, value) => {
    setShippingCompanies((prev) => ({ ...prev, [key]: value }));
  };

  /* ===============================
     Save shipping settings
     =============================== */
  const handleSave = async () => {
    setLoading(true);
    try {
      const body = {
        pricingType: pricingType || "FIXED",
        minimumFreeShipping: Number(minimumFreeShipping || 0),
        deliveryRegions,
        shippingCompanies: SHIPPING_COMPANIES.reduce((acc, c) => {
          acc[c.key] = !!shippingCompanies[c.key];
          return acc;
        }, {}),
      };

      await api.put("/api/vendor/settings/shipping", body);
      alert(t("shipping.savedSuccessfully"));
    } catch (error) {
      console.error("Failed to save shipping settings:", error);
      alert(t("shipping.saveFailed"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="bg-[#fefefe] w-full min-h-screen flex">
      <div className="flex-1">
        <main className="w-full min-h-screen flex bg-[#faf9f7]">
          <div className="flex mt-8 w-full px-6 flex-col items-start gap-6">

            {/* Cost & Regions Section */}
            <section className="flex flex-col items-start gap-6 w-full">
              <h2 className="text-xl font-semibold">{t("shipping.costRegionsTitle")}</h2>

              <Card className="w-full bg-[#fefefe] rounded-[10px] border-0">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6">

                    <div className="flex flex-col gap-3">
                      <Label>{t("shipping.pricingType")}</Label>
                      <Select value={pricingType} onValueChange={setPricingType}>
                        <SelectTrigger className="h-14">
                          <SelectValue placeholder={t("shipping.pricingTypePlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FIXED">{t("shipping.fixed")}</SelectItem>
                          <SelectItem value="VARIABLE">{t("shipping.variable")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Label>{t("shipping.minimumFreeShipping")}</Label>
                      <Input
                        type="number"
                        value={minimumFreeShipping}
                        onChange={(e) => setMinimumFreeShipping(e.target.value)}
                        className="h-14"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <Label>{t("shipping.deliveryRegions")}</Label>
                      <Input
                        value={deliveryRegions.join(", ")}
                        onChange={(e) =>
                          setDeliveryRegions(
                            e.target.value
                              .split(",")
                              .map((r) => r.trim())
                              .filter(Boolean)
                          )
                        }
                        className="h-14"
                      />
                    </div>

                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Shipping Companies Section */}
            <section className="flex flex-col items-start gap-6 w-full">
              <h2 className="text-xl font-semibold">{t("shipping.shippingCompanies")}</h2>

              <Card className="w-full bg-[#fefefe] rounded-[10px] border-0">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SHIPPING_COMPANIES.map((company) => (
                      <div
                        key={company.key}
                        className="flex items-center justify-between p-4 rounded-[10px] border"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col w-[180px] gap-2">
                            <div className="font-medium">{t(`shipping.companies.${company.key}.name`)}</div>
                            <div className="text-sm text-[#4f4f4f]">
                              {t(`shipping.companies.${company.key}.description`)}
                            </div>
                          </div>
                          <img
                            src={company.logo}
                            alt={company.key}
                            className="w-14 h-14 rounded-[10px]"
                          />
                        </div>

                        <Switch
                          checked={!!shippingCompanies[company.key]}
                          onCheckedChange={(value) => toggleCompany(company.key, value)}
                          className="data-[state=checked]:bg-[#835f40]"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            <Button
              className="h-14 w-full rounded-[10px] bg-gradient-to-r from-[#805b3c] to-[#d3bac4]"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? t("shipping.saving") : t("shipping.save")}
            </Button>

          </div>
        </main>
      </div>
    </div>
  );
};
