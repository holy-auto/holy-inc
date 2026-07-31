import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import i18n from '@/i18n';

/**
 * Syncs i18n language with URL ?lang= parameter (two-way).
 * - On mount / search param change: if ?lang= differs from i18n, update i18n
 * - On i18n language change: update URL query param without full reload
 */
export function useLanguageSync() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Direction 1: URL param -> i18n
  useEffect(() => {
    const langFromUrl = searchParams.get('lang');
    const currentLng = i18n.language;

    if (langFromUrl && (langFromUrl === 'ja' || langFromUrl === 'en')) {
      if (currentLng !== langFromUrl) {
        i18n.changeLanguage(langFromUrl);
      }
    } else if (!langFromUrl && currentLng !== 'ja') {
      // No lang param and i18n is not default -> reset to default
      i18n.changeLanguage('ja');
    }
  }, [searchParams]);

  // Direction 2: i18n -> URL param
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      const currentLang = searchParams.get('lang');
      if (lng === 'ja') {
        if (currentLang) {
          // Remove lang param when it's the default
          const newParams = new URLSearchParams(searchParams);
          newParams.delete('lang');
          setSearchParams(newParams, { replace: true });
        }
      } else if (currentLang !== lng) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('lang', lng);
        setSearchParams(newParams, { replace: true });
      }
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [searchParams, setSearchParams]);
}