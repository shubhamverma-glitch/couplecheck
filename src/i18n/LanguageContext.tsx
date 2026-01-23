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
    
    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', getTranslation(language, 'meta.description'));
    
    // Update or create OG tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', getTranslation(language, 'meta.ogTitle'));
    
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', getTranslation(language, 'meta.ogDescription'));
    
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', config.metaImage);
    
    // Update or create Twitter tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', getTranslation(language, 'meta.ogTitle'));
    
    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDesc) {
      twitterDesc = document.createElement('meta');
      twitterDesc.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDesc);
    }
    twitterDesc.setAttribute('content', getTranslation(language, 'meta.ogDescription'));
    
    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
      twitterImage = document.createElement('meta');
      twitterImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImage);
    }
    twitterImage.setAttribute('content', config.metaImage);
  }, [language]);

  const setLanguage = (lang: Language) => {
    const currentPath = location.pathname;
    // Remove existing language prefix to get clean path
    const cleanPath = currentPath.replace(/^\/(en|ar|es|fr|ja)/, '') || '/';
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
