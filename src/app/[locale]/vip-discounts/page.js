import DiscountCardPage from '@/app/components/DiscountCard/DiscountCardPage'
import { getCookie } from 'cookies-next'
import React from 'react'

const page = async({params}) => {
  const param = await params
  const {locale} = param
  return (
    <>
    <DiscountCardPage locale={locale}/>
    </>
  )
}

export default page