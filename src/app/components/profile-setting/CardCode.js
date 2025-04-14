import Link from 'next/link'
import React from 'react'
import { useTranslations } from 'next-intl'

const CardCode = ({code}) => {
  const t = useTranslations('CardCode')

  return (
    <>
    {/* Code Card Section */}
<div className="relative w-full max-w-lg bg-gradient-to-r from-[#BB3826] to-[#962E1E] text-white p-6 rounded-xl shadow-lg overflow-hidden">
  {/* Decorative Overlay */}
  <div className="absolute inset-0 bg-white opacity-10 rounded-xl"></div>

  {/* Card Content */}
  <div className="relative flex flex-col gap-4">
    <h3 className="text-2xl font-bold tracking-wide">{t('title', { fallback: '4P Card' })}</h3>

    {/* Code Display */}
    <div className="flex items-center justify-between bg-white bg-opacity-20 px-4 py-3 rounded-lg">
      <span className="text-lg font-medium">{t('code_label', { fallback: 'Code:' })}</span>
      <span className="text-xl font-semibold tracking-widest">{code.code}</span>
    </div>

    {/* Date Info */}
    <div className="grid grid-cols-2 gap-4 text-sm font-medium">
      <div className="flex flex-col">
        <span className="text-gray-200">{t('start_date', { fallback: 'Start Date:' })}</span>
        <span className="text-white text-lg font-semibold">{code.start_date}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-200">{t('end_date', { fallback: 'End Date:' })}</span>
        <span className="text-white text-lg font-semibold">{code.end_date}</span>
      </div>
    </div>

    {/* CTA */}
    <div className="mt-4 flex justify-end">
    <Link href={'/about'}>
      <button className="bg-white text-[#BB3826] font-bold px-5 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-all">
        {t('view_details', { fallback: 'View Details' })}
      </button>
      </Link>
    </div>
  </div>
</div>
    </>
  )
}

export default CardCode
