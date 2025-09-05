let storageKey = '';

export const useLocalStorage = (key: string) => {
  storageKey = key;

  const getItem = <T>(): T | null => {
    const item = localStorage.getItem(storageKey);
    return item ? JSON.parse(item) : null;
  };

  const setItem = <T>(value: T) => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  };

  const removeItem = () => {
    localStorage.removeItem(storageKey);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};
