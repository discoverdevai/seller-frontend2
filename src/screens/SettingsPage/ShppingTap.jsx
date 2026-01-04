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
import api from "../../Api/axios";

/* ===============================
   Shipping companies configuration
   =============================== */
const SHIPPING_COMPANIES = [
  {
    key: "SMSA_EXPRESS",
    name: "SMSA Express",
    description: "شحن سريع لجميع أنحاء المملكة",
    logo: "/image-19.png",
  },
  {
    key: "ZAJIL_EXPRESS",
    name: "Zajil Express",
    description: "شحن سريع لجميع أنحاء المملكة",
    logo: "/mask-group-3.png",
  },
  {
    key: "ARAMEX",
    name: "Aramex",
    description: "شحن سريع لجميع أنحاء المملكة",
    logo: "/image-20.png",
  },
  {
    key: "NAQEL_EXPRESS",
    name: "Naqel Express",
    description: "شحن سريع لجميع أنحاء المملكة",
    logo: "/image-22.png",
  },
];

export const ShippingTap = () => {
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
      const response = await api.get("/api/vendor/settings/shipping");

      if (response.data.success) {
        const data = response.data.data;

        setPricingType(data.pricingType ?? "");
        setMinimumFreeShipping(data.minimumFreeShipping ?? "");
        setDeliveryRegions(data.deliveryRegions ?? []);

        // 🔥 TRANSFORM API RESPONSE
        const mappedCompanies = {};
        Object.entries(data.shippingCompanies || {}).forEach(
          ([key, value]) => {
            mappedCompanies[key] = !!value.isEnabled;
          }
        );

        setShippingCompanies(mappedCompanies);
      }
    } catch (error) {
      console.error("Failed to load shipping settings:", error);
    }
  };

  fetchShippingSettings();
}, []);


  /* ===============================
     Toggle shipping company
     =============================== */
  const toggleCompany = (key, value) => {
    setShippingCompanies((prev) => ({
      ...prev,
      [key]: value,
    }));
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
      shippingCompanies: {
        SMSA_EXPRESS: !!shippingCompanies.SMSA_EXPRESS,
        ZAJIL_EXPRESS: !!shippingCompanies.ZAJIL_EXPRESS,
        ARAMEX: !!shippingCompanies.ARAMEX,
        NAQEL_EXPRESS: !!shippingCompanies.NAQEL_EXPRESS,
      },
    };

    await api.put("/api/vendor/settings/shipping", body);
    alert("تم حفظ إعدادات الشحن بنجاح");
  } catch (error) {
    console.error("Failed to save shipping settings:", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-[#fefefe] w-full min-h-screen flex">
      <div className="flex-1">
        <main className="w-full min-h-screen flex bg-[#faf9f7]">
          <div className="flex mt-8 w-full px-6 flex-col items-start gap-6">

            {/* ========== Cost & Regions Section ========== */}
            <section className="flex flex-col items-start gap-6 w-full">
              <h2 className="text-xl font-semibold">اعدادات التكلفة و المناطق</h2>

              <Card className="w-full bg-[#fefefe] rounded-[10px] border-0">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6">

                    {/* Pricing Type */}
                    <div className="flex flex-col gap-3">
                      <Label>نوع التسعير</Label>
                      <Select
                        value={pricingType}
                        onValueChange={setPricingType}
                      >
                        <SelectTrigger className="h-14">
                          <SelectValue placeholder="اختر نوع التسعير" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FIXED">ثابت</SelectItem>
                          <SelectItem value="VARIABLE">متغير</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Free Shipping Minimum */}
                    <div className="flex flex-col gap-3">
                      <Label>الحد الادني للشحن المجاني</Label>
                      <Input
                        type="number"
                        value={minimumFreeShipping}
                        onChange={(e) =>
                          setMinimumFreeShipping(e.target.value)
                        }
                        className="h-14"
                      />
                    </div>

                    {/* Delivery Regions */}
                    <div className="flex flex-col gap-3">
                      <Label>مناطق التوصيل (افصل بينهم بفاصلة)</Label>
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

            {/* ========== Shipping Companies Section ========== */}
            <section className="flex flex-col items-start gap-6 w-full">
              <h2 className="text-xl font-semibold">شركات الشحن</h2>

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
                            <div className="font-medium">{company.name}</div>
                            <div className="text-sm text-[#4f4f4f]">
                              {company.description}
                            </div>
                          </div>
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="w-14 h-14 rounded-[10px]"
                          />
                        </div>

                        <Switch
                          checked={!!shippingCompanies[company.key]}
                          onCheckedChange={(value) =>
                            toggleCompany(company.key, value)
                          }
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
              {loading ? "جاري الحفظ..." : "حفظ"}
            </Button>

          </div>
        </main>
      </div>
    </div>
  );
};
