import React from 'react'
import Contact from '@/app/components/contact/Contact'
import dynamic from 'next/dynamic';
const About = dynamic(() => import('@/app/components/About/About'));
const ContactBanner = dynamic(() => import('@/app/components/About/ConnectBanner'));

export const metadata = {
  title: '4P - Contact Us',
}

const page = async() => {
  return (
    <>
       <Contact/>
       <ContactBanner/>
        <About/>
    </>
  )
}

export default page
