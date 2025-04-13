"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import cardImage from "/public/image/banner-1.webp";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { localApi } from "../../../../localUrl";
import { redirect } from "next/navigation";
import { FaCreditCard } from "react-icons/fa";

const DiscountCard = () => {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(false);
  const t = useTranslations("DiscountCard");
  const getDataFromCookies = getCookie("userDetails");
  const getDataFormCookie =
    getDataFromCookies && JSON.parse(getDataFromCookies);
  useEffect(() => {
    if (getDataFormCookie) {
      const getUser = getDataFormCookie.user;
      const { code } = getUser;
      if (code) {
        redirect('/setting')
      }
    }
  }, [getDataFormCookie]);
  const handleSave = async () => {
    setLoading(true);
    if (getDataFormCookie) {
      try {
        const res = await fetch(`${localApi}/api/payment`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getDataFormCookie.token}`,
          },
        });

        if (!res.ok) {
          setLoading(false);
          throw new Error("Update failed, please try again.");
        }

        const data = await res.json();
        setLoading(false);
        if (data.status == true) {
          window.open(data.data.link, "_blank");
        }
      } catch (error) {
        setLoading(false);
      }
    } else {
      redirect("/login");
    }
  };

  useEffect(()=>{
    const getPrice = async ()=>{
      const res = await fetch(`${localApi}/api/config?lang=en`)
      if(!res.ok){
        return ''
      }
      const data = await res.json()
      setPrice(data.data.config.price_of_card)
    }
    getPrice()
  },[])
  return (
    <>
      <div className="flex flex-col items-center md:justify-center order-2 md:order-1">
        <div className="relative max-w-md space-y-6 bg-white p-6 rounded-md shadow-xl md:border md:border-gray-200 flex flex-col items-center">
          {/* Image */}
          <Image
            src={cardImage}
            alt={t("Card_Image_Alt")}
            width={350}
            height={220}
            className="rounded-lg shadow-lg"
          />

          {/* Title & Description */}
          <h1 className="text-3xl font-bold text-primary">
            {t("Get_Your_Card")}
          </h1>
          <p className="text-lg text-secondary">{t("Save_Money")}</p>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 w-full">
            {[
              t("Discounts_Up_To_50"),
              t("Easy_Use"),
              t("Valid_One_Year"),
              t("Support_24_7"),
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="text-primary" size={24} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}

          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-4 bg-[#E74C3C] hover:bg-[#C0392B] transition-all duration-300 rounded-lg shadow-md px-6 py-3 text-white text-lg font-semibold"
          >
            <span className="tracking-wide">{t('Get_Card')}</span>

            <span className="bg-white text-[#E74C3C] px-3 py-1 rounded-full text-base font-bold shadow-sm">
              {price} EGP
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DiscountCard;
