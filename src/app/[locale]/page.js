import React from "react";
import dynamic from "next/dynamic";
import CoverHeader from "../components/Home/navbar/CoverHeader";
import { notFound } from "next/navigation";
import { localApi } from "../../../localUrl";
import PushAds from "../components/PushAds";
const CategorySlider = dynamic(() =>
  import("../components/Home/categorySlider/CategorySlider")
);
const PopularCategories = dynamic(() =>
  import(
    "../components/Home/categorySlider/PopularCategories/PopularCategories"
  )
);
const NewsCategory = dynamic(() =>
  import("../components/Home/newsCategory/NewsCategory")
);
const AboutSection = dynamic(() =>
  import("../components/Home/AboutSection/AboutSection")
);
const MobileAdsBanner = dynamic(() =>
  import("../components/About/MobileAdsBanner")
);
const ContactBannerTwo = dynamic(() =>
  import("../components/contact/contactBannerTwo")
);

const page = async ({ params }) => {
  const { locale } = await params;
  let data = null;
  try {
    const res = await fetch(`${localApi}/api/home?lang=${locale}`);
    if (!res.ok) {
      notFound();
    }
    data = await res.json();
  } catch (error) {
    return notFound();
  }

  return (
    <>
      <PushAds/>
      <CoverHeader data={data} />
      <CategorySlider data={data} />
      <PopularCategories data={data} />
      <ContactBannerTwo />
      <AboutSection />
      <MobileAdsBanner />
      <NewsCategory data={data} />
    </>
  );
};

export default page;
