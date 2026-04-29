export const loadFromStorage = (key, fallback) => {
  try {
    const storedValue = localStorage.getItem(key);
    const parsedValue = storedValue ? JSON.parse(storedValue) : fallback;

    return Array.isArray(fallback) && !Array.isArray(parsedValue)
      ? fallback
      : parsedValue;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can fail in private browsing or when quota is exceeded.
  }
};
