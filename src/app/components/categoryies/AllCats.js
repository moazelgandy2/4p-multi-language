import Image from "next/image";
import React from "react";
import { localImage } from "../../../../localUrl";
import Link from "next/link";
import { useTranslations } from "next-intl"; // Assuming you're using next-intl for translations

const AllCats = ({ data }) => {
  const t = useTranslations("AllCats");
  const getData = data.data.categories;
  return (
    <div className="container min-h-screen p-5">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        {t("findCategories")} <span className="text-[#BB3826]">{t("thatSuitYou")}</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {getData.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative w-full h-48">
              <Link href={`categories/${category.name}/${category.id}${category.is_sport == 1 ? "?sport=true": null}`}>
                <Image
                  src={`${localImage}/${category.image}`}
                  alt={category.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-lg imageHovered"
                />
              </Link>
            </div>
            <div className="p-4 text-center">
              <Link
                href={`categories/${category.name}/${category.id}`}
                className="text-xl font-semibold text-gray-800 hover:text-[#BB3826] transition-all duration-300"
              >
                {category.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(AllCats);
