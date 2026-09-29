import { create } from 'zustand';

export type Language = 'ru' | 'en';

type LanguageStore = {
  language: Language;
  setLanguage: (language: Language) => void;
};

function getInitialLanguage(): Language {
  const savedLanguage = localStorage.getItem('language');

  if (savedLanguage === 'en') {
    return 'en';
  }

  return 'ru';
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: getInitialLanguage(),

  setLanguage: (language) => {
    localStorage.setItem('language', language);

    set({
      language,
    });
  },
}));
