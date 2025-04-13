import { FaGift, FaTags, FaPercent, FaStar, FaUsers } from "react-icons/fa";
import { useTranslations } from "next-intl";

const ContactBannerTwo = () => {
  const t = useTranslations("ContactBanner");

  const features = [
    { icon: <FaStar size={20} />, text: t("High_Quality") },  
    { icon: <FaUsers size={20} />, text: t("Trusted_Partners") },  
    { icon: <FaGift size={20} />, text: t("Free_Gift_Chance") },
    { icon: <FaTags size={20} />, text: t("Exclusive_Deals") }, 
    { icon: <FaPercent size={20} />, text: t("Best_Discounts") }, 
  ];

  return (
    <section className="relative" data-aos="fade-down">
      <div className="w-full container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-11 items-center p-11 border border-gray-700 rounded-xl bg-[#1A202C]">
          <div className="box max-w-md w-full text-center">
            <h2 className="font-bold text-3xl text-white">
              {t("Exclusive_Offers")}
              <span className="text-[#BB3826]"> 4P Card </span>
            </h2>
            <p className="mt-3 text-lg text-gray-300">
              {t("Unlock_Best_Deals")}
            </p>
          </div>

          <div className="grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-5 gap-y-6 xl:gap-14 w-full max-lg:max-w-xl">
            {features.map((feature, index) => (
              <div key={index} className="box flex flex-col items-center">
                <button aria-label={feature.text} title={feature.text} className="p-5 rounded-full shadow-md bg-white text-[#BB3826] flex items-center justify-center transition-all duration-500 hover:bg-[#FFF0F0]">
                  {feature.icon}
                </button>
                <p className="mt-2 font-medium text-sm text-white text-center w-[90px]">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBannerTwo;
