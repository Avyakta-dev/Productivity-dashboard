import { useState } from 'react';

// Reads a value from localStorage once (on first render), and writes to
// localStorage every time the value is updated — done right inside the
// setter, so there's no need for a separate "sync" step.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Works just like useState's setter (accepts a value OR an updater
  // function), but also persists the result to localStorage.
  const setAndPersist = (next) => {
    setValue((prev) => {
      const resolved = typeof next === 'function' ? next(prev) : next;
      try {
        localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // storage full or unavailable — fail silently, app still works in-memory
      }
      return resolved;
    });
  };

  return [value, setAndPersist];
}