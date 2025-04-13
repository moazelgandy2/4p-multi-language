import Image from "next/image";
import cardImage2 from "/public/image/mobile-banner-1.webp";
import cardImage1 from "/public/image/sport-banner.jpg";
import Link from "next/link";
import { useTranslations } from "next-intl";

const AboutSection = () => {
  const t = useTranslations("AboutSection");

  return (
    <section className="relative my-sectionsSpace">
      <div className="w-full container px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
          {/* Images Section */}
          <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
            <div className=" md:pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
              <Image
                data-aos="zoom-in-down"
                data-aos-offset="100"
                className="rounded-xl object-cover imageHovered"
                src={cardImage2}
                alt={t("About_Image")}
                width={300}
                height={300}
                loading="lazy"
              />
            </div>
            <Image
              data-aos="zoom-in-down"
              data-aos-offset="100"
              className="sm:ml-0 ml-auto rounded-xl object-cover imageHovered"
              src={cardImage1}
              alt={t("About_Image")}
              width={300}
              height={300}
              loading="lazy"
            />
          </div>

          {/* Text Section */}
          <div
            className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex"
            data-aos="zoom-in-left"
            data-aos-offset="100"
          >
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                <h2 className="text-[#E74C3C] text-h2 font-bold font-manrope leading-normal lg:text-start text-center">
                  {t("Unlock_Deals")}
                </h2>
                <p className="text-gray-700 font-normal leading-relaxed lg:text-start text-center">
                  {t("Card_Benefits")}
                </p>
              </div>

              {/* Stats Section */}
              <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                <div className="flex-col justify-start items-start inline-flex">
                  <h3 className="text-4xl font-bold font-manrope leading-normal text-[#C0392B]">
                    50%
                  </h3>
                  <h6 className="text-gray-700 text-base font-normal leading-relaxed">
                    {t("Exclusive_Discounts")}
                  </h6>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <h4 className="text-[#C0392B] text-4xl font-bold font-manrope leading-normal">
                    100+
                  </h4>
                  <h6 className="text-gray-700 text-base font-normal leading-relaxed">
                    {t("Top_Brands")}
                  </h6>
                </div>
                <div className="flex-col justify-start items-start md:inline-flex hidden">
                  <h4 className="text-[#C0392B] text-4xl font-bold font-manrope leading-normal">
                    {t("Unlimited")}
                  </h4>
                  <h6 className="text-gray-700 text-base font-normal leading-relaxed ">
                    {t("Special_Offers")}
                  </h6>
                </div>
              </div>
            </div>

            {/* Button */}
            <button className="sm:w-fit w-full px-5 py-3 bg-[#E74C3C] hover:bg-[#C0392B] transition-all duration-300 rounded-lg shadow-md justify-center items-center flex">
              <Link href={"/vip-discounts"} className="px-1.5 text-white text-sm font-medium leading-6">
                {t("Get_Card")}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;