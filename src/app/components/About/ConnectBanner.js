import Link from "next/link";
import { useTranslations } from "next-intl";
import { FaArrowRight } from "react-icons/fa";

const ContactBanner = () => {
  const t = useTranslations("ContactBanner2");

  return (
    <section>
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 my-6">
        <div className="lg:px-20 p-10 rounded-2xl bg-gradient-to-r from-[#BB3826] to-[#E0442E] flex flex-wrap items-center justify-between text-center lg:text-left gap-6">
          <div className="flex-1">
            <h2 className="font-manrope text-4xl text-white font-semibold mb-3">
              {t("Title")}
            </h2>
            <p className="text-lg text-gray-100">{t("Subtitle")}</p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-3 bg-white rounded-full shadow-lg text-lg text-[#D45A37] font-semibold py-4 px-8 transition-all duration-300 hover:bg-gray-200 hover:shadow-xl"
          >
            {t("Button")}
            <FaArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;
