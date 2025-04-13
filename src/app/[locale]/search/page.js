import React from "react";
import { localApi, localImage } from "../../../../localUrl";
import { notFound } from "next/navigation";
import EmptyPage from "@/app/components/EmptyPage";
import Image from "next/image";
import defaultImage from "/public/image/no-Image.webp";
import Link from "next/link";

export const metadata = {
  title: "4P - Search",
};

const Page = async ({ searchParams }) => {
  const param = await searchParams;
  const { search } = param;
  let data;

  try {
    const res = await fetch(
      `${localApi}/api/search?search=${search}&type=vendor`
    );
    if (!res.ok) {
      return notFound();
    }
    data = await res.json();
  } catch (error) {
    return notFound();
  }

  if (!data?.data?.vendors || data.data.vendors.length === 0) {
    return <EmptyPage message="No results found" />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-gray-900 ">
        Search Results
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.data.vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white rounded-xl shadow-lg p-4 transform transition duration-300 hover:scale-105"
          >
            <div className="w-full flex justify-center">
              <div className="w-full h-32 rounded-lg overflow-hidden flex items-center justify-center object-contain">
                <Link href={`/vendor/${vendor.name}/${vendor.id}`}>
                  <Image
                    src={
                      vendor.logo
                        ? `${localImage}/${vendor.logo}`
                        : defaultImage
                    }
                    alt={vendor.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-contain p-2 imageHovered"
                  />
                </Link>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-center mt-4 text-gray-900  txtHover">
              <Link href={`/vendor/${vendor.name}/${vendor.id}`}>
                {vendor.name}
              </Link>
            </h3>

            <p className="text-gray-600 text-sm text-center mt-2">
              {vendor.description || "No description available"}
            </p>

            <div className="mt-4 flex justify-center">
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold transition hover:bg-primary/65">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
