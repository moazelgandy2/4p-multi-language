import AllCats from '@/app/components/categoryies/AllCats';
import { notFound } from 'next/navigation';
import React from 'react'
import { localApi } from '../../../../localUrl';

export const metadata = {
  title: '4P - Categories',
}

const page = async ({ params }) => {
  const param = await params;
  const { locale } =  param;
  let data = null;
  try {
    const res = await fetch(
      `${localApi}/api/categories?lang=${locale}`,
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
      <AllCats data={data}/>
    </>
  )
}

export default page
