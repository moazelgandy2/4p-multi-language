import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import emptyImage from "/public/image/empty.avif";
import { useTranslations } from "next-intl"; // Assuming you're using next-intl

const EmptyPage = () => {
  const t = useTranslations("notfound");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 p-6 text-center">
      <Image
        src={emptyImage}
        alt={t("noResultsFoundAlt")}
        className="mb-6 w-full max-w-md rounded-lg"
      />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {t("noResultsFound")} 🚀
      </h2>
      <p className="text-gray-600 mb-6">
        {t("updatingContent")}
      </p>
      <Link
        href="/"
        className="flex items-center justify-center bg-[#BB3826] hover:bg-[#9A2F20] text-white font-medium py-3 px-6 rounded-full transition-all duration-300"
      >
        <IoHomeOutline className="mr-2 text-lg" />
        {t("backToHome")}
      </Link>
    </div>
  );
};

export default EmptyPage;
