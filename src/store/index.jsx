import { create } from "zustand";

export const domain = "http://localhost:1337";
export const useCategories = create((set) => ({
  data: [],
  setData: (categories) => set(() => ({ data: categories })),
  active_cat_id: 0,

  setActiveId: (activeTab) => set(() => ({ active_cat_id: activeTab })),
  resetActiveId: () => set(() => ({ active_cat_id: 0 })),
}));
