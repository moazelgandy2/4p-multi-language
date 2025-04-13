"use client";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { localImage } from "../../../../../localUrl";
import Link from "next/link";
import { useTranslations } from "next-intl";

const CategorySlider = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = data.data.categories;
  const t = useTranslations("HomePage");
  return (
    <section className="container my-sectionsSpace">
      <div className="text-center flex justify-center items-center flex-col">
        <h1 className="text-h1 font-semibold text-black">
          {t("Explore")}
          <span className="text-[#BB3826]">{t("Top_Categories")}</span>{" "}
          {t("of_Our_Website")}
        </h1>
        <p className="max-w-md text-gray-700">{t("Find_All_Categories")}</p>
      </div>

      <div className="my-5" data-aos="fade-up" data-aos-offset="100">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 2000 }}
          navigation={false}
          modules={[Autoplay, Navigation]}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="mySwiper"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        >
          {categories.map((item, index) => (
            <SwiperSlide key={item.id} className="w-[300px]">
              <Link
                href={`/categories/${item.name.replace(/\s+/g, "-")}/${item.id}${item.is_sport == 1 ? "?sport=true": null}`}
              >
                <div
                  className={`py-8 px-4 flex flex-col justify-center items-center
               rounded-[10px] shadow-lg transition-all duration-300 ease-in-out
               ${
                 activeIndex === index
                   ? "bg-primary text-white scale-110"
                   : "bg-gray-100 hover:scale-105"
               }`}
                >
                  <div className="w-[80px] h-[80px] relative">
                    <Image
                      src={`${localImage}/${item.image}`}
                      alt={'logo'}
                      fill
                      className="rounded-full object-contain"
                      loading="lazy"
                      priority={false}
                      
                    />
                  </div>

                  <span className="my-2 text-xl font-semibold ">{item.name}</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default React.memo(CategorySlider);
