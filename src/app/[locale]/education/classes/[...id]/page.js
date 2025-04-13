import { notFound } from "next/navigation";
import { localApi } from "../../../../../../localUrl";
import EmptyPage from "@/app/components/EmptyPage";
import ClassRoom from "@/app/components/Eduction/ClassRoom";

const page = async ({ params, searchParams }) => {
  let loading = false;
  const param = await params;
  const searchParam = await searchParams;
  const { departmentId } = searchParam;
  let data;
  try {
    loading = true;
    const res = await fetch(
      `${localApi}/api/class_rooms/${param.id[0]}?departmentId=${departmentId}&lang=${param.locale}`,
      
    );
    if (!res.ok) {
      loading = false;
      return notFound();
    }
    loading = false;
    const getAllData = await res.json();
    data = getAllData.data.class_rooms;
    if (data.length == 0) {
      return <EmptyPage />;
    }
  } catch (error) {
    loading = false;
    return notFound();
  }
  return (
    <>
      <ClassRoom data={data} />
    </>
  );
};

export default page;
