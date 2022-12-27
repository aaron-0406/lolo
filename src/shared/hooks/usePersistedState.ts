import { useCallback, useState } from "react";
import storage from "../utils/storage";

export const usePersistedState = <T>(key: string, initialValue: T) => {
  function getInitialValue() {
    try {
      const storedState = storage.get<T>(key);

      return storedState || initialValue;
    } catch (error) {
      return initialValue;
    }
  }

  const [storedValue, setStoredValue] = useState<T>(getInitialValue());

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      const stateToPersist =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(stateToPersist);
      storage.set(key, stateToPersist);
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
};
