import { useTranslations } from "next-intl";
import React from "react";

const NewBadge = () => {
    const t = useTranslations('new')
  return (
    <div className="absolute top-0 right-0">
      <div className="badge bg-primary text-white">{t('new_Badge')}</div>
    </div>
  );
};

export default NewBadge;
