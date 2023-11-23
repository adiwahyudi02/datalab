import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [localStorageValue, setLocalStorageValue] = useState(defaultValue);

  // this method update localStorage and state
  const setLocalStorageStateValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setLocalStorageValue(value);
  };

  useEffect(() => {
    try {
      const value = localStorage.getItem(key);

      if (value) {
        // If value is already present in localStorage
        setLocalStorageValue(JSON.parse(value));
      } else {
        // Else set default value in localStorage
        localStorage.setItem(key, JSON.stringify(defaultValue));
        setLocalStorageValue(defaultValue);
      }
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      setLocalStorageValue(defaultValue);
    }
  }, [key])

  return {
    value: localStorageValue,
    setValue: setLocalStorageStateValue,
  };
}