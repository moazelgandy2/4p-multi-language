import Image from "next/image";
import Link from "next/link";
import React from "react";
import { localImage } from "../../../../localUrl";

const FeedDetails = ({ data, title }) => {
  const feed = data?.data?.feed;
  return (
        <article>
          <header className="mx-auto max-w-screen-xl pt-10 text-center">
            <p className="text-gray-500">
              Published {new Date(feed.created_at).toLocaleDateString()}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-5xl">
              {feed.title}
            </h1>
            <p className="mt-6 text-lg text-gray-700">
              {feed.short_description}
            </p>

            <Image
              className="sm:h-[20rem] mt-10 w-full object-contain rounded-lg"
              src={`${localImage}/${feed.image}`}
              width={1170}
              height={500}
              alt={feed.title}
            />
          </header>

          <section className="mx-auto max-w-screen-lg px-4 py-10 text-gray-800">
            <p className="text-lg leading-relaxed">{feed.description} </p>
          </section>
        </article>
  );
};

export default React.memo(FeedDetails);
