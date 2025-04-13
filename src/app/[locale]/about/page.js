import React from "react";
import WhyChooseUs from "@/app/components/About/WhyChooseUs";
import dynamic from "next/dynamic";
const ContactBanner = dynamic(() => import("@/app/components/About/ConnectBanner"));
const HowItWorks = dynamic(() => import("@/app/components/About/HowItWork"));

export const metadata = {
  title: '4P - About Us',
}

const page = () => {
  return (
    <div>
      <WhyChooseUs />
      <ContactBanner />
      <HowItWorks />
    </div>
  );
};

export default page;
