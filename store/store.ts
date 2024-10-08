import { create } from "zustand";

type Store = {
  name: string;
  setName: (value: string) => void;
};
export const useAppStore = create<Store>((set) => ({
  name: "",
  setName: (value: string) => set(() => ({ name: value })),
}));
