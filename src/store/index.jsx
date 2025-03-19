import { create } from "zustand";
import coldImg from "../assets/imgs/categories/cold.png";
import wokImg from "../assets/imgs/categories/wok.png";
import dessertImg from "../assets/imgs/categories/desert.png";

export const useCategories = create((set) => ({
  data: [
    { documentId: 1, name: "Cold Drinks", path: "cold", imgUrl: coldImg },
    { documentId: 2, name: "Burgers", path: "burgers", imgUrl: dessertImg },
    { documentId: 3, name: "Pizza", path: "pizza", imgUrl: coldImg },
    { documentId: 4, name: "Wok", path: "wok", imgUrl: wokImg },
    {
      documentId: 5,
      name: "Desserts",
      path: "desserts",
      imgUrl: dessertImg,
    },
    { documentId: 6, name: "Pasta", path: "pasta", imgUrl: dessertImg },
  ],
  active_cat_id: 0,

  setActiveId: (activeTab) => set(() => ({ active_cat_id: activeTab })),
  resetActiveId: () => set(() => ({ active_cat_id: 0 })),
}));
