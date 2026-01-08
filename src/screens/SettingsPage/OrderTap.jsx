import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import api from "../../Api/Axios";
import { useTranslation } from "react-i18next";

export const OrderTap = () => {
  const { t } = useTranslation();

  const [returnPeriodDays, setReturnPeriodDays] = useState("");
  const [returnPolicyText, setReturnPolicyText] = useState("");
  const [minimumOrderLimit, setMinimumOrderLimit] = useState("");
  const [orderProcessingTimeDays, setOrderProcessingTimeDays] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     Fetch order settings
     ========================= */
  useEffect(() => {
    const fetchOrderSettings = async () => {
      try {
        const response = await api.get("/api/vendor/settings/orders");
        if (response.data.success) {
          const data = response.data.data;
          setReturnPeriodDays(data.returnPeriodDays ?? "");
          setReturnPolicyText(data.returnPolicyText ?? "");
          setMinimumOrderLimit(data.minimumOrderLimit ?? "");
          setOrderProcessingTimeDays(data.orderProcessingTimeDays ?? "");
        }
      } catch (error) {
        console.error("Failed to load order settings:", error);
      }
    };

    fetchOrderSettings();
  }, []);

  /* =========================
     Save order settings
     ========================= */
  const handleSave = async () => {
    setLoading(true);
    try {
      const body = {
        minimumOrderLimit:
          minimumOrderLimit === "" ? null : Number(minimumOrderLimit),
        orderProcessingTimeDays:
          orderProcessingTimeDays === "" ? null : Number(orderProcessingTimeDays),
        returnPeriodDays: Number(returnPeriodDays),
        returnPolicyText: returnPolicyText || null,
      };

      const response = await api.put("/api/vendor/settings/orders", body);

      if (response.data.success) {
        alert(t("orders.savedSuccessfully"));
      }
    } catch (error) {
      console.error("Failed to save order settings:", error);
      alert(t("orders.saveFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fefefe] w-full min-h-screen flex flex-col">
      <main className="bg-[#faf9f7] flex-1 p-4 sm:p-8">
        <div className="max-w-[1288px] w-full mx-auto flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Return Policy */}
            <Card className="bg-[#fefefe] rounded-[10px] border-0">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6">
                  <h2 className="text-xl font-semibold">{t("orders.returnPolicyTitle")}</h2>

                  <div className="flex flex-col gap-3">
                    <label>{t("orders.returnPeriodDays")}</label>
                    <Input
                      type="number"
                      value={returnPeriodDays}
                      onChange={(e) => setReturnPeriodDays(e.target.value)}
                      className="h-14"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label>{t("orders.returnPolicyText")}</label>
                    <Input
                      value={returnPolicyText}
                      onChange={(e) => setReturnPolicyText(e.target.value)}
                      className="h-14"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Policy */}
            <Card className="bg-[#fefefe] rounded-[10px] border-0">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6">
                  <h2 className="text-xl font-semibold">{t("orders.orderPolicyTitle")}</h2>

                  <div className="flex flex-col gap-3">
                    <label>{t("orders.minimumOrderLimit")}</label>
                    <Input
                      type="number"
                      value={minimumOrderLimit}
                      onChange={(e) => setMinimumOrderLimit(e.target.value)}
                      className="h-14"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label>{t("orders.orderProcessingTime")}</label>
                    <Input
                      type="number"
                      value={orderProcessingTimeDays}
                      onChange={(e) =>
                        setOrderProcessingTimeDays(e.target.value)
                      }
                      className="h-14"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button
            className="h-14 w-full rounded-[10px] bg-gradient-to-r from-[#805b3c] to-[#d3bac4]"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? t("orders.saving") : t("orders.save")}
          </Button>
        </div>
      </main>
    </div>
  );
};
