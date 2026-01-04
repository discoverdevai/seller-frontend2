import React, { useEffect, useState } from "react";
import axios from "../../Api/Axios";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";

const IMAGE_MAP = {
  MADA: "/image-23.png",
  VISA: "/image-26.png",
  STC_PAY: "/image-24.png",
  CASH_ON_DELIVERY: "/image-25.png",
};

export const PaymentTab = () => {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(false);

  /* =======================
     GET payment settings
     ======================= */
  useEffect(() => {
    const fetchPaymentSettings = async () => {
      try {
        const res = await axios.get(
          "/api/vendor/settings/payment"
        );

        const apiData = res.data?.data || {};

        const mappedMethods = Object.entries(apiData).map(
          ([key, value]) => ({
            key, // MADA, VISA, ...
            title: value.method,
            description: value.description,
            enabled: value.isEnabled,
            image: IMAGE_MAP[key],
          })
        );

        setMethods(mappedMethods);
      } catch (error) {
        console.error("Failed to fetch payment settings", error);
      }
    };

    fetchPaymentSettings();
  }, []);

  /* =======================
     Toggle switch
     ======================= */
  const toggleMethod = (key, value) => {
    setMethods((prev) =>
      prev.map((m) =>
        m.key === key ? { ...m, enabled: value } : m
      )
    );
  };

  /* =======================
     SAVE (PUT)
     ======================= */
  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        paymentMethods: methods.reduce((acc, method) => {
          acc[method.key] = method.enabled;
          return acc;
        }, {}),
      };

      await axios.put(
        "/api/vendor/settings/payment",
        payload
      );

      alert("تم حفظ إعدادات الدفع بنجاح");
    } catch (error) {
      console.error("Failed to save payment settings", error);
      alert("حدث خطأ أثناء الحفظ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fefefe] w-full min-h-screen flex flex-col">
      <main className="bg-[#faf9f7] flex-1 p-8">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-8">
          <h2 className="text-xl font-semibold text-right">
            طرق الدفع
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {methods.map((method) => (
              <Card
                key={method.key}
                className="flex rounded-lg border border-[#c3c3c3]"
              >
                <CardContent className="flex items-center justify-between p-4 w-full">
                  <div className="flex items-center gap-4">
                    <img
                      src={method.image}
                      alt={method.title}
                      className="w-14 h-14 object-cover"
                    />

                    <div className="flex flex-col gap-1 text-right">
                      <span className="text-lg font-medium">
                        {method.title}
                      </span>
                      <span className="text-sm text-[#4f4f4f]">
                        {method.description}
                      </span>
                    </div>
                  </div>

                  <Switch
                    checked={method.enabled}
                    onCheckedChange={(value) =>
                      toggleMethod(method.key, value)
                    }
                    className="
                      data-[state=checked]:bg-[#835f40]
                      data-[state=unchecked]:bg-[#c3c3c3]
                    "
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            onClick={handleSave}
            disabled={loading}
            className="h-14 w-full rounded-lg bg-gradient-to-r from-[#835f40] to-[#d3baa4]"
          >
            {loading ? "جاري الحفظ..." : "حفظ"}
          </Button>
        </div>
      </main>
    </div>
  );
};
