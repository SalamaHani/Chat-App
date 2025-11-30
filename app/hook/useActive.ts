import { create } from "zustand";

interface StoreActiveListe {
  mempers: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
}

export const useActive = create<StoreActiveListe>((set) => ({
  mempers: [],
  add: (id) => set((stes) => ({ mempers: [...stes.mempers, id] })),
  remove: (id) =>
    set((stes) => ({
      mempers: stes.mempers.filter((memperId) => memperId != id),
    })),
  set: (ids) => set({ mempers: ids }),
}));
