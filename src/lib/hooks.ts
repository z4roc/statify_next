type StorageType = "session" | "local";

export const useLocalStorage = () => {
  const isClient: boolean = ((): boolean => typeof window !== "undefined")();

  const storageType = (type?: StorageType): "localStorage" | "sessionStorage" =>
    `${type ?? "session"}Storage`;

  const getItem = (key: string, type?: StorageType): string => {
    return isClient ? window[storageType(type)][key] : "";
  };

  const setItem = (key: string, value: string, type?: StorageType): boolean => {
    if (isClient) {
      window[storageType(type)].setItem(key, value);
      return true;
    }

    return false;
  };

  return { getItem, setItem };
};
