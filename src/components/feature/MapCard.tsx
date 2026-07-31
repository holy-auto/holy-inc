import { type FC } from 'react';
import FadeIn from '@/components/base/FadeIn';

interface MapCardProps {
  title: string;
  mapUrl: string;
  address: string;
  access: string;
  routeUrl: string;
  routeLabel: string;
  delay?: number;
  phone?: string;
  hours?: string;
  services?: string[];
}

const MapCard: FC<MapCardProps> = ({
  title,
  mapUrl,
  address,
  access,
  routeUrl,
  routeLabel,
  delay = 0,
  phone,
  hours,
  services,
}) => {
  return (
    <FadeIn delay={delay}>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        {/* Header badge */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-50 flex-shrink-0">
            <i className="ri-map-pin-2-fill text-teal-600" />
          </span>
          <h3 className="text-slate-800 font-bold text-base">{title}</h3>
        </div>

        {/* Map */}
        <div className="relative aspect-[16/9] bg-slate-100">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={title}
            className="w-full h-full"
          />
          {/* Pin drop animation overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
            <div className="animate-pin-drop">
              <span className="w-10 h-10 flex items-center justify-center">
                <i className="ri-map-pin-2-fill text-teal-600 text-2xl drop-shadow-lg" />
              </span>
            </div>
            {/* Shadow pulse under pin */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1">
              <div className="w-3 h-1 bg-teal-600/20 rounded-full animate-ping" />
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="p-5 md:p-6 space-y-5">
          {/* Address */}
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 flex-shrink-0 mt-0.5">
              <i className="ri-map-pin-line text-slate-500" />
            </span>
            <div>
              <p className="text-xs text-slate-400 font-medium mb-0.5 uppercase tracking-wide">
                住所
              </p>
              <p className="text-slate-700 text-sm leading-relaxed">{address}</p>
            </div>
          </div>

          {/* Access */}
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 flex-shrink-0 mt-0.5">
              <i className="ri-train-line text-slate-500" />
            </span>
            <div>
              <p className="text-xs text-slate-400 font-medium mb-0.5 uppercase tracking-wide">
                アクセス
              </p>
              <p className="text-slate-700 text-sm leading-relaxed">{access}</p>
            </div>
          </div>

          {/* Phone */}
          {phone && (
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 flex-shrink-0 mt-0.5">
                <i className="ri-phone-line text-slate-500" />
              </span>
              <div>
                <p className="text-xs text-slate-400 font-medium mb-0.5 uppercase tracking-wide">
                  電話番号
                </p>
                <a
                  href={`tel:${phone}`}
                  className="text-slate-700 text-sm leading-relaxed hover:text-teal-600 transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>
          )}

          {/* Hours */}
          {hours && (
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 flex-shrink-0 mt-0.5">
                <i className="ri-time-line text-slate-500" />
              </span>
              <div>
                <p className="text-xs text-slate-400 font-medium mb-0.5 uppercase tracking-wide">
                  営業時間
                </p>
                <p className="text-slate-700 text-sm leading-relaxed">{hours}</p>
              </div>
            </div>
          )}

          {/* Services tags */}
          {services && services.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {services.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 bg-slate-50 text-slate-500 text-xs rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <div className="pt-2">
            <a
              href={routeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-direction-line" />
              </span>
              {routeLabel}
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-external-link-line" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default MapCard;