import { Translations } from '../types';

const useTranslate = (translations?: Translations) => {
  const localTranslations: Translations = {
    in: 'In',
  };

  const translate = (word: string) => {
    if (translations) return translations[word];

    return localTranslations[word] || word;
  };

  return { translate };
};

export default useTranslate;
