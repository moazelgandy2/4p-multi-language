import SubCategory from "@/app/components/categoryies/SubCategory";
import { notFound } from "next/navigation";
import React from "react";
import { localApi } from "../../../../../localUrl";
import SportingForm from "@/app/components/vendor/SportingForm";

const page = async ({ params }) => {
  const param = await params;
  const { locale } = await params;
  const getId = param.id[param.id.length - 1];
  const getParamsName = param.id[param.id.length - 2];
  let data = null;
  try {
    const res = await fetch(`${localApi}/api/vendors/${getId}?lang=${locale}`);
    if (!res.ok) {
      notFound();
    }
    data = await res.json();
  } catch (error) {
    notFound();
  }
  return (
    <div>
      <SubCategory getParamsName={getParamsName} data={data} />
      <hr className="container my-6 border-t border-gray-300" />
      <SportingForm />
    </div>
  );
};

export default page;
