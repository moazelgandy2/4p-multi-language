import Image from "next/image";
import React from "react";
import { localImage } from "../../../../localUrl";
import FeedsPagination from "./FeedsPagination";
import { notFound } from "next/navigation";
import Link from "next/link";
import NewBadge from "../NewBadge";

const AllFeeds = ({ data }) => {
  const getData = data.data.feeds.data;
  const getTotalPages = data.data.feeds.last_page;
  return (
    <div className="container min-h-screen bg-gray-10 p-5">
      <h1 className="text-h1 text-center mb-10">
        Trending <span className="text-primary">News</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {getData.map((feed) => {
          return (
            <div
              className="card  max-w-96 shadow-xl relative"
              key={feed.id}
            >
             <NewBadge/>
              <Link
                href={`/news/${feed.id}/${feed.title.replace(/\s+/g, "-")}`}
              >
                <figure className="pt-10 px-3 rounded-lg">
                  <Image
                    src={`${localImage}/${feed.image}`}
                    width={500}
                    height={100}
                    className="w-full h-[200px] object-contain rounded-lg imageHovered"
                    alt={feed.title.replace(/\s+/g, "-")}
                    loading="lazy"
                  />
                </figure>
              </Link>
              <div className="card-body">
                <Link
                  href={`/news/${feed.id}/${feed.title.replace(/\s+/g, "-")}`}
                  className="card-title line-clamp-1 text-start txtHover"
                >
                  {feed.title}
                </Link>
                <p className="line-clamp-2 text-start">
                  {feed.short_description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {getTotalPages > 1 ? (
        <FeedsPagination getTotalPages={getTotalPages} />
      ) : getTotalPages == 1 ? (
        ""
      ) : (
        notFound()
      )}
    </div>
  );
};

export default AllFeeds;
