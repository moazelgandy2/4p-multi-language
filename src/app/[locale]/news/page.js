import AllCats from "@/app/components/categoryies/AllCats";
import { notFound } from "next/navigation";
import React from "react";
import { localApi } from "../../../../localUrl";
import AllFeeds from "@/app/components/newsComponent/AllFeeds";

const page = async ({ params, searchParams }) => {
  const param = await params;
  const { locale } = param;
  const { page } = await searchParams;
  let data = null;
  try {
    const res = await fetch(
      `${localApi}/api/feeds?page=${page}&lang=${locale}`,
      
    );
    if (!res.ok) {
      notFound();
    }
    data = await res.json();
  } catch (error) {
    notFound();
  }
  return (
    <>
      <AllFeeds data={data} />
    </>
  );
};

export default page;
