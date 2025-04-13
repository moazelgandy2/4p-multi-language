"use client";
import EmptyPage from "@/app/components/EmptyPage";
import Image from "next/image";
import Link from "next/link";
import { localApi } from "../../../../../../localUrl";
import { notFound } from "next/navigation";
import NoImage from "@/app/components/NoImage";

const page = async ({ params }) => {
  let loading = false;
  const param = await params;
  let data;
  try {
    loading = true;
    const res = await fetch(
      `${localApi}/api/lessons/${param.id[0]}?lang=${param.locale}`,
      
    );
    if (!res.ok) {
      loading = false;
      return notFound();
    }
    loading = false;
    const getAllData = await res.json();
    data = getAllData.data.lessons;
    if (data.length == 0) {
      return <EmptyPage />;
    }
  } catch (error) {
    loading = false;
    return notFound();
  }
  return (
    <div className="container mx-auto my-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
        Lessons
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {data?.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white p-6 mb-6 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 mb-4 flex justify-center items-center">
              <Link href={`/education/lesion/${lesson.id}/${lesson.name}`}>
                {lesson.image ? (
                  <Image
                    src={lesson.image}
                    alt={lesson.name}
                    width={80}
                    height={80}
                    className="rounded-full imageHovered"
                  />
                ) : (
                  <NoImage/>
                )}
              </Link>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 txtHover">
              {lesson.name}
            </h2>
            <p className="text-sm text-gray-500">{lesson.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
