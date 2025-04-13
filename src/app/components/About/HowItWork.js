import { useTranslations } from "next-intl";

const HowItWorks = () => {
  const t = useTranslations("HowItWorks");

  const steps = [
    {
      id: 1,
      title: t("Step1Title"),
      description: t("Step1Desc"),
    },
    {
      id: 2,
      title: t("Step2Title"),
      description: t("Step2Desc"),
    },
    {
      id: 3,
      title: t("Step3Title"),
      description: t("Step3Desc"),
    },
  ];

  return (
    <section
      className="relative my-sectionsSpace bg-gray-50">
      <div className="w-full max-w-7xl px-6 md:px-8 mx-auto">
        <div className="flex flex-col items-center gap-10 lg:gap-12">
          {/* Section title and description */}
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">
              {t("Title")} <span className="text-[#BB3826]">{t("Highlight")}</span>
            </h2>
            <p className="text-lg text-gray-600 mt-2 max-w-xl mx-auto">
              {t("Subtitle")}
            </p>
          </div>

          {/* Steps section displaying each phase */}
          <div className="grid gap-6 md:grid-cols-3 w-full">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center gap-3 bg-white shadow-md p-6 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                {/* Step number displayed prominently */}
                <div className="text-[#BB3826] text-5xl font-extrabold">
                  {step.id}
                </div>

                {/* Step title */}
                <h4 className="text-xl font-bold text-gray-800">
                  {step.title}
                </h4>

                {/* Step description */}
                <p className="text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
