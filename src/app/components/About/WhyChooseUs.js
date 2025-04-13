import React from "react";
import { useTranslations } from "next-intl";
import {
  FaChartLine,
  FaCogs,
  FaUsers,
  FaLightbulb,
  FaShieldAlt,
  FaRocket,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const t = useTranslations("WhyChooseUs");

  const features = [
    {
      title: t("Analytics"),
      description: t("AnalyticsDesc"),
      icon: <FaChartLine className="w-8 h-8 text-primary" />,
    },
    {
      title: t("Automation"),
      description: t("AutomationDesc"),
      icon: <FaCogs className="w-8 h-8 text-primary" />,
    },
    {
      title: t("Collaboration"),
      description: t("CollaborationDesc"),
      icon: <FaUsers className="w-8 h-8 text-primary" />,
    },
    {
      title: t("Innovation"),
      description: t("InnovationDesc"),
      icon: <FaLightbulb className="w-8 h-8 text-primary" />,
    },
    {
      title: t("Security"),
      description: t("SecurityDesc"),
      icon: <FaShieldAlt className="w-8 h-8 text-primary" />,
    },
    {
      title: t("Growth"),
      description: t("GrowthDesc"),
      icon: <FaRocket className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <section className="bg-gray-100 py-14">
      <div className="px-6 mx-auto max-w-screen-xl">
        <div className="text-center flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            {t("Title")} <span className="text-primary">{t("OurWebsite")}</span>
          </h1>
          <p className="text-gray-600 max-w-xl mt-2">{t("Subtitle")}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon }) => (
            <div
              key={title}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 text-center border border-gray-200"
            >
              <div className="flex justify-center items-center w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                {icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <p className="text-gray-600 mt-2">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
