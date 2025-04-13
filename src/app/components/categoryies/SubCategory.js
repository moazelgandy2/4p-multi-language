import React from "react";
import Image from "next/image";
import { localImage } from "../../../../localUrl";
import Link from "next/link";
import EmptyPage from "../EmptyPage";
import NewBadge from "../NewBadge";

const SubCategory = ({ getParamsName, data }) => {
  const getData = data.data.vendors;
  return getData.length !== 0 ? (
    <section className="container text-center my-sectionsSpace">
      <h1 className="text-h1">
        <span className="text-primary">
          {decodeURIComponent(getParamsName)}
        </span>
      </h1>
      <div className="grid lg:grid-cols-3 gap-10 sm:grid-cols-2 justify-center my-10">
        {getData.map((item, index) => {
          return (
            <div
              className="card  max-w-96 shadow-xl relative"
              key={index}
            >
              <NewBadge />
              <Link href={`/vendor/${item.id}`}>
                <figure>
                  <Image
                    src={`${localImage}/${item.logo}`}
                    width={500}
                    height={300}
                    className="w-full object-cover h-[200px] imageHovered"
                    alt={item.name}
                    loading="lazy"
                  />
                </figure>
              </Link>
              <div className="card-body">
                <Link
                  href={`/vendor/${item.id}`}
                  className="card-title text-xl font-semibold text-gray-700 txtHover"
                >
                  {item.name}
                </Link>
                <p className="line-clamp-2 text-start">{item.description}</p>
                {/* <div className="card-actions justify-end">
                  <div className="badge badge-outline text-primary">
                    Fashion
                  </div>
                  <div className="badge badge-outline text-primary">
                    Products
                  </div>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  ) : (
    <EmptyPage />
  );
};

export default React.memo(SubCategory);
