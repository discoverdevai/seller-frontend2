import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Layout } from "../../components/Layout";
import { useTranslation } from "react-i18next";
import { ProductList } from "./ProductList";
import { useNavigate } from "react-router-dom";



export const ProductsPage = () => {
  const { t } = useTranslation();
    const navigate = useNavigate();


  return (
    // <Layout>
      <div className="flex flex-col gap-6 ">
        <div className="flex items-start justify-between gap-6 mb-2">
          {/* Bulk CSV Upload */}
          <Card className="flex-1 bg-[#fefefe] rounded-[22px] border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col items-start gap-2">
                  <div className="inline-flex items-center gap-3">
                    <img
                      className="w-10 h-10 object-cover"
                      alt="Image"
                      src="/image-11.png"
                    />
                    <h4 className="font-h4-medium text-[#1a1713]">
                      {t("products_bulk_upload_title")}
                    </h4>
                  </div>
                  <p className="font-medium text-[#4f4f4f] text-base leading-6">
                    {t("products_bulk_upload_desc")}
                  </p>
                </div>

                <Button className="h-12 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90">
                  <span className="font-bold text-[#fefefe] text-base">
                    {t("products_bulk_upload_button")}
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Add New Product */}
          <Card className="flex-1 bg-[#fefefe] rounded-[22px] border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col items-start gap-2">
                  <div className="inline-flex items-center gap-3">
                    <img
                      className="w-10 h-10 object-cover"
                      alt="Image"
                      src="/image-9.png"
                    />
                    <h4 className="font-h4-medium text-[#1a1713]">
                      {t("products_add_new_title")}
                    </h4>
                  </div>

                  <p className="font-medium text-[#4f4f4f] text-base leading-6">
                    {t("products_add_new_desc")}
                  </p>
                </div>

                <Button  onClick={() => navigate("/addProduct")} className="h-12 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90">
                  <span className="font-bold text-[#fefefe] text-base">
                    {t("products_add_new_button")}
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center gap-[30px] max-w-[700px] mx-auto mt-12">
          <img
            className="w-full h-[500px]"
            alt="Element"
            src="/55024598-9264826-1.svg"
          />
          <div className="flex flex-col items-center gap-4 w-full">
            <p className="font-semibold text-[#1a1713] text-xl text-center leading-[30px]">
              {t("products_empty_message")}
            </p>
          </div>
        </div>
      </div>
    // </Layout>
  );
};
