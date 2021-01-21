import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from '../public/locales/en-GB.json';

i18n.use(initReactI18next).init({
  lng: 'en-GB',
  fallbackLng: 'en-GB',
  debug: !process.env.CI, // don't span the ci logs with setup logs
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  resources: {
    en: {
      translation: {
        // if you want to add translations just for tests spread the translation section and add your key/value
        ...translations,
        pointsOfInterest: { ...translations.pointsOfInterest, somePoint: 'Some point' },
      },
    },
  },
});

export default i18n;
