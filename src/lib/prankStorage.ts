// Storage helper to track created pranks using both localStorage and cookies for reliability
const CREATED_PRANKS_KEY = 'love_trap_created_pranks';
const COOKIE_NAME = 'ltcp'; // Short cookie name to save space

// Cookie utilities
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

const setCookie = (name: string, value: string, days: number = 365): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

// Get pranks from cookie
const getPranksFromCookie = (): string[] => {
  try {
    const cookieValue = getCookie(COOKIE_NAME);
    return cookieValue ? cookieValue.split(',').filter(Boolean) : [];
  } catch {
    return [];
  }
};

// Save pranks to cookie
const savePranksToCookie = (pranks: string[]): void => {
  try {
    // Keep only last 50 pranks to avoid cookie size limits
    const recentPranks = pranks.slice(-50);
    setCookie(COOKIE_NAME, recentPranks.join(','));
  } catch {
    // Silently fail
  }
};

export const getCreatedPranks = (): string[] => {
  const localStoragePranks: string[] = [];
  const cookiePranks = getPranksFromCookie();
  
  try {
    const stored = localStorage.getItem(CREATED_PRANKS_KEY);
    if (stored) {
      localStoragePranks.push(...JSON.parse(stored));
    }
  } catch {
    // localStorage not available
  }
  
  // Merge both sources and dedupe
  const allPranks = [...new Set([...localStoragePranks, ...cookiePranks])];
  return allPranks;
};

export const addCreatedPrank = (prankId: string): void => {
  const pranks = getCreatedPranks();
  
  if (!pranks.includes(prankId)) {
    pranks.push(prankId);
    
    // Save to localStorage
    try {
      localStorage.setItem(CREATED_PRANKS_KEY, JSON.stringify(pranks));
    } catch {
      // Silently fail if localStorage is not available
    }
    
    // Save to cookie as backup
    savePranksToCookie(pranks);
  }
};

export const isCreator = (prankId: string): boolean => {
  const pranks = getCreatedPranks();
  return pranks.includes(prankId);
};
