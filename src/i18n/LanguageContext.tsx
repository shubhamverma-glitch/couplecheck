import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Language, 
  languageConfigs, 
  getTranslation, 
  detectLanguageFromPath,
  getPathWithLanguage,
  LanguageConfig 
} from './translations';

interface LanguageContextType {
  language: Language;
  config: LanguageConfig;
  t: (key: string, replacements?: Record<string, string>) => string;
  setLanguage: (lang: Language) => void;
  getLocalizedPath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguageState] = useState<Language>(() => 
    detectLanguageFromPath(location.pathname)
  );

  useEffect(() => {
    const detectedLang = detectLanguageFromPath(location.pathname);
    if (detectedLang !== language) {
      setLanguageState(detectedLang);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Update document direction for RTL languages
    document.documentElement.dir = languageConfigs[language].dir;
    document.documentElement.lang = language;
    
    // Update meta tags dynamically
    const config = languageConfigs[language];
    
    // Update title
    document.title = getTranslation(language, 'meta.title');
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', getTranslation(language, 'meta.description'));
    }
    
    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', getTranslation(language, 'meta.ogTitle'));
    }
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', getTranslation(language, 'meta.ogDescription'));
    }
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', config.metaImage);
    }
    
    // Update Twitter tags
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', config.metaImage);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    const currentPath = location.pathname;
    const cleanPath = currentPath.replace(/^\/(en|ar|es|fr|ja)/, '');
    const newPath = getPathWithLanguage(cleanPath, lang);
    navigate(newPath + location.search);
  };

  const t = (key: string, replacements?: Record<string, string>) => 
    getTranslation(language, key, replacements);

  const getLocalizedPath = (path: string) => getPathWithLanguage(path, language);

  const config = languageConfigs[language];

  return (
    <LanguageContext.Provider value={{ language, config, t, setLanguage, getLocalizedPath }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
