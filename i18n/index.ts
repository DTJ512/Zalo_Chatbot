import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../translations/en/common.json';
import vi from '../translations/vi/common.json';



export const languageResources = {
  en: { translation: en },
  vi: { translation: vi }
} as const;

//  react-i18next:: You will need to pass in an i18next instance by using initReactI18next 
// fix: 

i18n.use(initReactI18next).init({
    resources: languageResources,
    lng: 'vi',
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export default i18n;
