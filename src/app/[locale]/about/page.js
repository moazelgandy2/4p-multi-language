import React from "react";
import WhyChooseUs from "@/app/components/About/WhyChooseUs";
import dynamic from "next/dynamic";

const HowItWorks = dynamic(() => import("@/app/components/About/HowItWork"));

export const metadata = {
  title: "4P - About Us",
};

const page = () => {
  return (
    <div>
      <WhyChooseUs />

      <HowItWorks />
    </div>
  );
};

export default page;
