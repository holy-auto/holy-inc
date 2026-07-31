import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface Store {
  name: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
}

const StoreList: FC = () => {
  const { t } = useTranslation('common');
  const stores = t('contact.stores', { returnObjects: true }) as Store[];

  return (
    <div className="space-y-4">
      {stores.map((store) => (
        <div
          key={store.name}
          className="bg-white rounded-lg border border-slate-100 p-5 hover:border-teal-300 transition-colors"
        >
          <h3 className="font-bold text-slate-800 mb-3">{store.name}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className="ri-map-pin-line text-teal-500" />
              </span>
              <span className="text-slate-600">{store.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <i className="ri-phone-line text-teal-500" />
              </span>
              <a
                href={`tel:${store.phone}`}
                className="text-slate-600 hover:text-teal-600 transition-colors"
              >
                {store.phone}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className="ri-time-line text-teal-500" />
              </span>
              <span className="text-slate-600">{store.hours}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-50">
            {store.services.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 bg-slate-50 text-slate-500 text-xs rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreList;