import Image from "next/image";
import React from "react";
import { FaRegAddressCard } from "react-icons/fa";
import Link from "next/link";
import facebookIcon from "/public/image/facebook (2).svg";
import locationIcon from "/public/image/location.png";
import whatsappIcon from "/public/image/whatsapp.svg";
import { localImage } from "../../../../localUrl";
import { useTranslations } from "next-intl";

const VendorPage = ({ data }) => {
      const t = useTranslations("card");
  const vendorData = data.data.vendor;
  return (
    <section className="relative pt-40 ">
      <Image
        src={`${localImage}/${vendorData.cover}`}
        alt="cover-image"
        width={1200}
        height={300}
        className="w-full absolute top-0 left-0 z-0 h-60 object-cover"
      />
      <div className="w-full container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
          <Image
            src={`${localImage}/${vendorData.logo}`}
            width={500}
            height={100}
            alt="user-avatar-image"
            className="border-4 border-solid border-white h-[100px] w-[100px] rounded-full imageHovered" 
          />
        </div>
        <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
          <div className="block">
            <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center">
              {vendorData.name}
            </h3>
            <p className="font-normal text-base leading-7 text-gray-500  max-sm:text-center">
              {vendorData.description}
              <br className="hidden sm:block" />
              {vendorData.address}
            </p>
          </div>
          <button className="py-3.5 px-5 flex rounded-full bg-primary items-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-secondary">
            <FaRegAddressCard size={25} className="text-white" />
            <Link href={'/vip-discounts'} className="px-2 font-semibold text-base leading-7 text-white">
              {t("Buy_the_card")}
            </Link>
          </button>
        </div>
        <div className="flex gap-5 mb-5 rounded-full justify-center md:justify-start">
          <Link href={vendorData.google_map_link || ''}>
            <Image
              src={locationIcon}
              alt="location icon"
              width={30}
              height={30}
            />
          </Link>
          <Link href={vendorData.facebook || ''}>
            <Image
              src={facebookIcon}
              alt="location icon"
              width={30}
              height={30}
            />
          </Link>
          <Link href={`https://wa.me/${vendorData.whatsapp}` || ''}>
            <Image
              src={whatsappIcon}
              alt="location icon"
              width={30}
              height={30}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default React.memo(VendorPage);
