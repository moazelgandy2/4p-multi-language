"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingCard from "@/app/components/loadingCard/LoadingCard";
import { BookOpen, Book, ArrowRightCircle } from "lucide-react";
import { localImage } from "../../../../localUrl";
import NoImage from "../NoImage";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const Units = ({ data, loading }) => {
  const t = useTranslations("other");
  const parm = useParams();
  const { locale } = parm;
  return (
    <div className="container mx-auto my-10">
      <h1
        className="text-4xl font-bold text-center text-gray-900 mb-8 flex items-center justify-center gap-3">
        <BookOpen className="text-primary animate-bounce" size={40} />
        <span className="text-gray-900">
        Educational <span className="text-primary">Units</span>
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {loading ? (
          <LoadingCard />
        ) : (
          data.map((unit, index) => (
            <div
              key={unit.id}
              className="bg-white p-4 mb-6 rounded-md shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-start mb-4 space-x-4 gap-3">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <Link href={unit.link || "#"}>
                    {unit.image ? (
                      <Image
                        src={`${localImage}/${unit.image}`}
                        alt={unit.name}
                        width={80}
                        height={80}
                        className="rounded-full w-[80px] h-[80px] imageHovered border-2 border-red-500"
                        priority={index === 0}
                      />
                    ) : (
                      <NoImage />
                    )}
                  </Link>
                </div>

                <div>
                  <Link
                    href={unit.link || "#"}
                    className="text-xl font-semibold text-gray-800 flex items-center gap-2 hover:text-primary transition"
                  >
                    <Book className="text-primary" size={20} />
                    {unit.name}
                  </Link>
                  <p className="text-sm text-gray-600 truncate">
                    {unit.description}
                  </p>
                </div>
              </div>

              {unit.lessons.length > 0 ? (
                <div className="space-y-3 mt-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <BookOpen className="text-primary" size={20} />
                    Lessons:
                  </h3>
                  <div className="space-y-2">
                    {unit.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-md border hover:shadow-lg transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-primary text-white p-2 rounded-full">
                            <BookOpen className="text-white" size={20} />
                          </div>
                          <div>
                            <Link
                              href={lesson.link || "#"}
                              className="text-md font-semibold text-gray-700 hover:underline flex items-center gap-2"
                            >
                              {lesson.name}
                              <ArrowRightCircle
                                className="text-primary"
                                size={18}
                              />
                            </Link>
                            <p className="text-sm text-gray-500 line-clamp-2">
                              {lesson.description}
                            </p>
                          </div>
                        </div>
                        <button
                          className={`px-3 py-1 rounded-md font-semibold transition ${
                            lesson.link
                              ? "bg-primary text-white hover:bg-primary/80"
                              : "bg-gray-400 text-gray-200 cursor-not-allowed"
                          }`}
                          disabled={!lesson.link}
                        >
                          Start
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-4 text-gray-600 flex items-center gap-2 italic">
                  🎉 Stay tuned for upcoming lessons!
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(Units);
