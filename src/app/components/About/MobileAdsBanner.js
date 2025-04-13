import Image from "next/image";
import Link from "next/link";
import mobileBanner from "/public/image/mobile-banner-2 (1).webp";
import { useTranslations } from "next-intl";
import { appUrl, IOSURL } from "../../../../localUrl";

const MobileAdsBanner = () => {
  const t = useTranslations("MobileAdsBanner");

  return (
    <section className="my-sectionsSpace">
      <div>
        <div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          data-aos="flip-down"
        >
          <div
            className="xl:p-24 gap-x-20 gap-y-10 p-12 rounded-2xl bg-gradient-to-r from-[#BB3826] to-[#D45A37]
             flex flex-col-reverse lg:flex-row justify-between"
          >
            {/* Image Section */}
            <div className="w-full lg:w-2/6 relative">
              <Image
                src={mobileBanner}
                loading="lazy"
                alt={t("App_Alt")}
                width={220}
                height={220}
                quality={75}
                priority={false}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="xl:absolute xl:bottom-0 rounded-t-3xl -mb-12 mx-auto lg:-mb-12 xl:-mb-24 lg:mx-0 object-cover"
              />
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-2/3 text-center lg:text-left">
              <h1 className="font-manrope text-h1 text-white font-semibold mb-7">
                {t("Heading")}
              </h1>
              <p className="text-lg text-white leading-8 mb-12">
                {t("Description")}
              </p>

              {/* Buttons */}
              <div className="flex items-center flex-col gap-7 md:flex-row lg:justify-start justify-center">
                <Link
                  target="_blank"
                  href={IOSURL}
                  className="cursor-pointer bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
                >
                  {t("AppStore")}
                </Link>
                <Link
                  target="_blank"
                  href={appUrl}
                  className="cursor-pointer bg-[#1a202c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
                >
                  {t("PlayStore")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAdsBanner;
