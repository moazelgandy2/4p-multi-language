import VendorDetails from '@/app/components/vendor/VendorDetails'
import VendorPage from '@/app/components/vendor/VendorPage'
import { notFound } from 'next/navigation';
import React from 'react'
import { localApi } from '../../../../../localUrl';

const page = async ({ params }) => {
  const param = await params;
  const { locale } = await params;
  const getId = param.id[param.id.length - 1];
  let data = null;
  try {
    const res = await fetch(
      `${localApi}/api/vendor/${getId}?lang=${locale}`,{
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
      <VendorPage data={data}/> 
      <div className='mb-12 mt-10'>
        <VendorDetails data={data}/>
      </div>
    </>
  )
}

export default page
