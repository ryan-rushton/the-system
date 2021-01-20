import React from 'react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { render as rtlRender } from '@testing-library/react';

import translations from '../public/locales/en-GB.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  react: {
    useSuspense: false,
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

export const renderWithI18n = (ui, options) => {
  function Wrapper({ children }) {
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
  }
  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...options }),
  };
};

export default i18n;
