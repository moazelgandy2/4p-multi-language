import React from "react";
import Image from "next/image";
import { localImage } from "../../../../../../localUrl";
import Link from "next/link";
import { useTranslations } from "next-intl";
import NewBadge from "@/app/components/NewBadge";
const PopularCategories = ({ data }) => {
    const t = useTranslations("HomePage");
  const getData = data.data.vendors;
  return (
    <section className="container text-center my-sectionsSpace">
      <div className="text-center">
        <span className="text-xl font-semibold text-gray-700">
          {t("Discover")}
        </span>
        <h1 className="text-4xl font-bold text-black">
          {t("Find_the_Best")}
          <span className="text-[#BB3826]">{t("Stores_and_Brands")}</span>
          {t("Near_You")}
        </h1>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 gap-10 sm:grid-cols-2 justify-center my-10 ">
        {getData.map((item, index) => {
          return (
            <div
              className="card  max-w-96 shadow-xl relative"
              key={index}
              data-aos="fade-up"
              data-aos-offset="10"
            >
             <NewBadge/>
              <Link href={`/vendor/${item.name}/${item.id}`} key={item.id}>
                <figure className="pt-10 px-3 rounded-lg">
                  <Image
                    src={`${localImage}/${item.cover}`}
                    width={500}
                    height={100}
                    className="w-full h-[200px] object-contain rounded-lg imageHovered"
                    alt="news"
                    loading="lazy"
                  />
                </figure>
              </Link>
              <div className="card-body">
                <Link
                  href={`/vendor/${item.name}/${item.id}`}
                  className="card-title txtHover line-clamp-1 text-start"
                >
                  {item.name}
                </Link>
                <p className="line-clamp-2 text-start">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default React.memo(PopularCategories);
