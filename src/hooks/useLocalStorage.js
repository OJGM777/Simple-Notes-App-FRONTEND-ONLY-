import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Si el item no existe o es null, devuelve initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error parsing localStorage item:", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage item:", error);
    }
  };

  return [storedValue, setValue];
}
