import { useTranslations } from "next-intl";
import Link from "next/link";
import DiscountCard from "./DiscountCard2";

export default function DiscountCardPage({locale}) {
  const t = useTranslations("AboutSection");
 
  return (
    <section className="relative bg-white text-gray-900 my-5">
      <div className="container px-4 md:px-5 lg:px-5 mx-auto">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-12 items-center ">
          {/* card Section */}
          <DiscountCard />

          {/* Text Section */}
          <div className={`w-full md:flex hidden flex-col justify-center items-center gap-10 md:items-start md:text-left ${locale == 'en' ? 'order-2 lg:order-2': ''}`}>
            {/* Title & Description */}
            <div className="w-full flex flex-col justify-center items-center md:items-start gap-8">
              <div className="w-full flex flex-col justify-start gap-3">
                <h2 className="text-[#E74C3C] text-h2 font-bold font-manrope leading-normal text-start">
                  {t("Unlock_Deals")}
                </h2>
                <p className="text-gray-700 font-normal leading-relaxed max-w-md text-start">
                  {t("Card_Benefits")}
                </p>
              </div>

              {/* Stats Section */}
              <div className="w-full flex flex-wrap justify-center md:justify-start items-center gap-5 sm:gap-10">
                {[
                  { value: "50%", label: t("Exclusive_Discounts") },
                  { value: "100+", label: t("Top_Brands") },
                  { value: t("Unlimited"), label: t("Special_Offers") },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center md:items-start"
                  >
                    <h3 className="text-4xl font-bold font-manrope leading-normal text-[#C0392B]">
                      {stat.value}
                    </h3>
                    <p className="text-gray-700 text-base font-normal leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <Link href="/about">
              <button className="sm:w-fit w-full px-5 py-3 bg-[#E74C3C] hover:bg-[#C0392B] transition-all duration-300 rounded-lg shadow-md flex justify-center items-center text-white text-sm font-medium leading-6">
                {t("Get_Card")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
