import { localApi } from "../../../../../localUrl";
import { notFound } from "next/navigation";

import EmptyPage from "@/app/components/EmptyPage";
import EductionProviders from "@/app/components/Eduction/EductionProviders";

const page = async ({ params, searchParams }) => {
  let loading = false;
  const param = await params;
  const searchParam = await searchParams;
  const { departmentId } = searchParam;
  let data;
  try {
    loading = true;
    const res = await fetch(
      `${localApi}/api/providers/${departmentId}?lang=${param.local}`,
      {
        cache: "force-cache",
      }
    );
    if (!res.ok) {
      loading = false;
      return notFound();
    }
    loading = false;
    const getAllData = await res.json();
    data = getAllData.data.providers;
    if (data.length == 0) {
      return <EmptyPage />;
    }
  } catch (error) {
    loading = false;
    return notFound();
  }
  return (
   <EductionProviders loading={loading} data={data} param={param} departmentId={departmentId}/>
  );
};

export default page;
