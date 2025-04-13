"use client";
import Image from "next/image";
import ArabicFlag from "/public/image/32px-Flag_of_Egypt.svg.webp";
import EnglishFlag from "/public/image/32px-Flag_of_the_United_Kingdom_(3-5).svg.webp";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const LanguageSwap = () => {
  const { locale } = useParams();
  const [language, setLanguage] = useState(locale);
  const router = useRouter();

  const handelLanguage = (lang) => {
    setLanguage(lang);
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${language}`, `/${lang}`);

    router.replace(`/${lang}`);
  };

  return (
    <div className="mr-5 md:mr-0 cursor-pointer">
      {language === "en" ? (
        <div
          className="flex items-center gap-2"
          onClick={() => handelLanguage("ar")}
        >
          <Image src={EnglishFlag} alt="English" width={25} height={25} />
          <span>EN</span>
        </div>
      ) : (
        <div
          className="flex items-center gap-2"
          onClick={() => handelLanguage("en")}
        >
          <Image src={ArabicFlag} alt="Arabic" width={25} height={25} />
          <span>AR</span>
        </div>
      )}
    </div>
  );
};

export default LanguageSwap;
