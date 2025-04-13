import Image from "next/image";
import React from "react";
import NOImage from "/public/image/no-Image.webp";

const NoImage = () => {
  return (
    <>
      <Image
        className="px-4 py-3 rounded-t-lg imageHovered w-full h-[200px] object-contain rounded-lg"
        src={NOImage}
        width={200}
        height={200}
        alt="product image"
      />
    </>
  );
};

export default NoImage;
