import React from "react";
import Image from "next/image";
import { localImage } from "../../../../../localUrl";
import Link from "next/link";
import { useTranslations } from "next-intl";

const NewsCategory = ({ data }) => {
  const t = useTranslations("NewsCategory");
  const feeds = data.data.feeds;

  return (
    <div className="container text-center">
      {/* Title */}
      <h1 className="text-h1 font-bold mb-6">
        {t("Stay_Updated")} <span className="text-primary">{t("Latest_News")}</span>
      </h1>

      {/* News Grid */}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10 my-10">
        {feeds.map((item) => (
          <div
            className="card max-w-96 shadow-lg border rounded-xl overflow-hidden relative bg-white"
            key={item.id}
            data-aos="fade-up"
            data-aos-offset="10"
          >
            {/* Date Badge */}
            <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-lg">
              {new Date(item.created_at).toLocaleDateString()}
            </div>

            {/* Image */}
            <Link href={`/news/${item.id}/${item.title.replace(/\s+/g, "-")}`}>
              <figure className="p-4">
                <Image
                  src={`${localImage}/${item.image}`}
                  width={500}
                  height={250}
                  className="w-full h-[220px] object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  alt={item.title}
                  loading="lazy"
                />
              </figure>
            </Link>

            {/* Content */}
            <div className="card-body px-5 pb-5 text-start">
              <Link
                href={`/news/${item.id}/${item.title.replace(/\s+/g, "-")}`}
                className="card-title text-lg font-semibold line-clamp-1 hover:text-primary transition-colors duration-200"
              >
                {item.title}
              </Link>
              <p className="line-clamp-2 text-gray-600 mt-2">
                {item.short_description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(NewsCategory);
