import { notFound } from "next/navigation";
import { localApi } from "../../../../../../localUrl";
import EmptyPage from "@/app/components/EmptyPage";
import Units from "@/app/components/Eduction/Units";

const page = async ({ params }) => {
  let loading = false;
  const param = await params;
  let data;
  try {
    loading = true;
    const res = await fetch(
      `${localApi}/api/units/${param.id[0]}?lang=${param.locale}`,
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
    data = getAllData.data.units;
    if (data.length == 0) {
      return <EmptyPage />;
    }
  } catch (error) {
    loading = false;
    return notFound();
  }
  return (
    <>
      <Units data={data} loading={loading}/>
    </>
  );
};

export default page;
