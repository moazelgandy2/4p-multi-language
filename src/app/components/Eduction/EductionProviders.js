import React from "react";
import { renderStars } from "@/app/components/RenderStar";
import LoadingCard from "@/app/components/loadingCard/LoadingCard";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import NoImage from "@/app/components/NoImage";
import Image from "next/image";
import { localImage } from "../../../../localUrl";
import { useTranslations } from "next-intl";

const EductionProviders = ({loading , data , param , departmentId}) => {
    const t = useTranslations('Curricula')
  return (
    <div className="container mx-aut my-10">
      <h1 className="text-3xl font-bold text-center mb-6 capitalize">
        <span className="text-primary">{decodeURIComponent(param?.id)}</span> 
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full justify-center gap-6">
        {loading ? (
          <LoadingCard />
        ) : (
          data?.map((provider) => (
            <div
              key={provider.id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm "
            >
              {provider.logo.length !== 0 ? (
                <Link
                  href={`/education/classes/${provider.id}/${provider.name}?departmentId=${departmentId}`}
                >
                  <Image
                    className="px-4 py-3 rounded-t-lg imageHovered w-full h-[200px] object-contain rounded-lg"
                    src={`${localImage}/${provider.logo}`}
                    width={200}
                    height={200}
                    alt="product image"
                  />
                </Link>
              ) : (
                <Link
                  href={`/education/classes/${provider.id}/${provider.name}?departmentId=${departmentId}`}
                >
                  <NoImage />
                </Link>
              )}

              <div className="px-5 pb-5">
                <Link
                  href={
                    `/education/classes/${provider.id}/${provider.name}?departmentId=${departmentId}` ||
                    ""
                  }
                >
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900  txtHover">
                    {provider.name}
                  </h5>
                </Link>
                <div className="flex items-baseline justify-between mt-2.5 mb-5">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {renderStars(5)}
                  </div>
                  <div className="flex gap-2 mt-3 ">
                    <Link href={provider.whatsapp || ""}>
                      <FaWhatsapp size={20} className="text-green-500" />
                    </Link>
                    <Link href={provider.facebook || ""} passHref>
                      <FaFacebookF size={20} className="text-blue-600" />
                    </Link>
                    <Link href={provider.instagram || ""} passHref>
                      <FaInstagram size={20} className="text-pink-500" />
                    </Link>
                  </div>
                </div>
                <hr />
                <p className="pt-2">{provider.address}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(EductionProviders);
