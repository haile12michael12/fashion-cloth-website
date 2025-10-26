import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="dropdown">
      <button 
        className="btn btn-outline-secondary dropdown-toggle" 
        type="button" 
        id="languageDropdown" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        {i18n.language === 'en' && 'English'}
        {i18n.language === 'es' && 'Español'}
        {i18n.language === 'fr' && 'Français'}
      </button>
      <ul className="dropdown-menu" aria-labelledby="languageDropdown">
        <li>
          <button 
            className="dropdown-item" 
            onClick={() => changeLanguage('en')}
          >
            English
          </button>
        </li>
        <li>
          <button 
            className="dropdown-item" 
            onClick={() => changeLanguage('es')}
          >
            Español
          </button>
        </li>
        <li>
          <button 
            className="dropdown-item" 
            onClick={() => changeLanguage('fr')}
          >
            Français
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LanguageSwitcher;