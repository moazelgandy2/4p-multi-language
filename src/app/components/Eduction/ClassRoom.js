import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { localImage } from '../../../../localUrl';
import NoImage from '../NoImage';
import { useTranslations } from 'next-intl';

const ClassRoom = ({ data }) => {
  const t = useTranslations('other');

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">{t('Classrooms')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full justify-center gap-6">
        {data.map((classRoom) => (
          <div
            key={classRoom.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-90 h-90 mb-4">
              {classRoom.image.length !== 0 ? (
                <Link
                  href={`/education/units/${classRoom.id}/${classRoom.name}`}
                >
                  <Image
                    src={`${localImage}/${classRoom.image}`}
                    alt={classRoom.name}
                    width={128}
                    height={128}
                    className="rounded-full h-[128px] imageHovered border-2 border-primary"
                  />
                </Link>
              ) : (
                <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 text-sm">
                  <NoImage />
                </div>
              )}
            </div>

            <Link
              href={`/education/units/${classRoom.id}/${classRoom.name}`}
              className="text-xl font-semibold txtHover  hover:text-primary"
            >
              {classRoom.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ClassRoom);
