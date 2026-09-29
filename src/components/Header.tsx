import { useLanguageStore } from '../store/languageStore';
import { getTranslations } from '../utils/translations';

function Header() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const t = getTranslations(language);

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <h1 className="app-header__title">{t.app.title}</h1>

        <div className="app-header__language" aria-label="Language selection">
          <button
            type="button"
            className={language === 'ru' ? 'is-active' : ''}
            onClick={() => setLanguage('ru')}
            aria-pressed={language === 'ru'}
          >
            RU
          </button>

          <button
            type="button"
            className={language === 'en' ? 'is-active' : ''}
            onClick={() => setLanguage('en')}
            aria-pressed={language === 'en'}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
