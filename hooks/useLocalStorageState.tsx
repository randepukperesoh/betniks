import { useEffect } from "react";
import { useAppStore } from "../store/store";

export const useLocalStorageState = () => {
  const { name, setName } = useAppStore();

  useEffect(() => {
    setName(localStorage.getItem("name") ?? "");
  }, []);

  const setInlocalStorageAndStore = (value: string) => {
    localStorage.setItem("name", value);
    setName(value);
  };

  return { name, setInlocalStorageAndStore };
};
