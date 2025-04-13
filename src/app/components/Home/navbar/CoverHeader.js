"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import banner1 from "/public/image/banner-1.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import Aos from "aos";
import "aos/dist/aos.css";
import { localImage } from "../../../../../localUrl";

const CoverHeader = ({ data }) => {
  const sliderImages = data.data.banners;
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      <Swiper
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={2000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        allowTouchMove={false}
        modules={[Autoplay, EffectFade]}
        className="absolute top-0 left-0 w-full h-full lg:rounded-bl-[350px] transition-opacity duration-1000 ease-in-out"
      >
        {sliderImages.length > 0 ? (
          sliderImages.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <Image
                  fill
                  src={`${localImage}/${item.image}`}
                  alt="cover"
                  className="object-cover lg:rounded-bl-[350px]"
                  priority
                  quality={100}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
              </SwiperSlide>
            );
          })
        ) : (
          <SwiperSlide>
            <Image
              fill
              src={banner1}
              alt="cover"
              className="object-cover lg:rounded-bl-[350px]"
              priority
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
          </SwiperSlide>
        )}
      </Swiper>
    </section>
  );
};

export default React.memo(CoverHeader);
