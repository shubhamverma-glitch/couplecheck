// LocalStorage helper to track created pranks
const CREATED_PRANKS_KEY = 'love_trap_created_pranks';

export const getCreatedPranks = (): string[] => {
  try {
    const stored = localStorage.getItem(CREATED_PRANKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addCreatedPrank = (prankId: string): void => {
  try {
    const pranks = getCreatedPranks();
    if (!pranks.includes(prankId)) {
      pranks.push(prankId);
      localStorage.setItem(CREATED_PRANKS_KEY, JSON.stringify(pranks));
    }
  } catch {
    // Silently fail if localStorage is not available
  }
};

export const isCreator = (prankId: string): boolean => {
  const pranks = getCreatedPranks();
  return pranks.includes(prankId);
};
