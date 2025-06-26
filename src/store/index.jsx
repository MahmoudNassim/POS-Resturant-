import { act } from "react";
import { create } from "zustand";

export const domain = "http://localhost:1337";
export const useCategories = create((set) => ({
  data: [],
  setData: (categories) => set(() => ({ data: categories })),
  active_cat_id: 0,

  setActiveId: (activeTab) => set(() => ({ active_cat_id: activeTab })),
  resetActiveId: () => set(() => ({ active_cat_id: 0 })),
}));

export const useCart = create((set) => ({
  productsInCart: [],
  cartIndex: false,
  checkOutIndex: false,

  openCart: () => set(() => ({ cartIndex: true })),
  closeCart: () => set(() => ({ cartIndex: false })),

  openCheckOut: () => set(() => ({ checkOutIndex: true })),
  closeCheckOut: () => set(() => ({ checkOutIndex: false })),

  decrementQty: (documentId) =>
    set((state) => {
      let copyArray = [...state.productsInCart];
      let index = copyArray.findIndex((el) => el.documentId == documentId);
      if (copyArray[index].qty > 1) {
        copyArray[index].qty--;
      } else {
        copyArray.splice(index, 1);
      }
      let obj = { productsInCart: copyArray };
      return obj;
    }),

  incrementQty: (documentId) =>
    set((state) => {
      let copyArray = [...state.productsInCart];
      let index = copyArray.findIndex((el) => el.documentId == documentId);
      copyArray[index].qty++;

      let obj = { productsInCart: copyArray };
      return obj;
    }),

  addToCart: (product) =>
    set((state) => {
      let copy = [...state.productsInCart];
      let obj = copy.find((el) => el.documentId == product.documentId);
      if (obj) {
        state.incrementQty(product.documentId);
      } else {
        copy.push(product);
      }
      return { productsInCart: copy };
    }),
  resetCart: () => set(() => ({ productsInCart: [] })),
}));

export const useInvoiceDetails = create((set) => ({
  index: false,
  activeInvoiceId: null,
  openDetails: () => set(() => ({ index: true })),
  closeDetails: () => set(() => ({ index: false })),

  setActiveId: (id) =>
    set(() => ({
      activeInvoiceId: id,
    })),
  resetActiveId: () =>
    set(() => ({
      activeInvoiceId: null,
    })),
}));
