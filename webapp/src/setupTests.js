// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { render } from "@testing-library/react";

import trans_es from "./locale/es/translation.json";
import trans_en from "./locale/en/translation.json";


i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    debug: true, 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: trans_en
      },
      es: {
        translation: trans_es
      }
    }
  });

export { render };
