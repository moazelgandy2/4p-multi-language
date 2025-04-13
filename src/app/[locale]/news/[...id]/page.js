import FeedDetails from '@/app/components/feeds/FeedDetails';
import { notFound } from 'next/navigation';
import React from 'react'
import { localApi } from '../../../../../localUrl';

export const metadata = {
  title: "4P - News And Blog",
};

const page = async ({ params }) => {
  const param = await params;
  const { locale } = await params;
  const getId = param.id[param.id.length - 2];
  const getTitle = param.id[param.id.length - 1]
  let data = null;
  try {
    const res = await fetch(
      `${localApi}/api/feed/details/${getId}?lang=${locale}`,{
      }
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
      <FeedDetails data={data} title={getTitle}/>
    </>
  )
}

export default page
