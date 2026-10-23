import { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { Bilingual, Locale } from '../content/site';
const Context = createContext({
  locale: 'ar' as Locale,
  t: (ar: string, _en: string) => ar,
  localPath: (path: string) => path,
  pick: (value: Bilingual) => value.ar,
});
export function LocaleProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const locale: Locale = /^\/en(?:\/|$)/.test(pathname) ? 'en' : 'ar';
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);
  return (
    <Context.Provider
      value={{
        locale,
        t: (ar, en) => (locale === 'ar' ? ar : en),
        localPath: (path) => (locale === 'ar' ? path : path === '/' ? '/en' : `/en${path}`),
        pick: (value) => value[locale],
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useLocale = () => useContext(Context);
