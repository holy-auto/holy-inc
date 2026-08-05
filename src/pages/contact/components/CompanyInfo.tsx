import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface CompanyRow {
  label: string;
  value: string;
}

const CompanyInfo: FC = () => {
  const { t } = useTranslation('common');
  const infoRows = t('contact.companyRows', { returnObjects: true }) as CompanyRow[];

  return (
    <div className="neu-card rounded-[20px] overflow-hidden">
      {infoRows.map((row, i) => (
        <div
          key={row.label}
          className={`flex flex-col sm:flex-row gap-1 sm:gap-0 px-5 py-4 ${
            i !== infoRows.length - 1 ? 'border-b border-slate-50' : ''
          }`}
        >
          <dt className="sm:w-32 flex-shrink-0 text-sm font-medium text-slate-600">
            {row.label}
          </dt>
          <dd className="text-sm text-slate-800 leading-relaxed">{row.value}</dd>
        </div>
      ))}
    </div>
  );
};

export default CompanyInfo;