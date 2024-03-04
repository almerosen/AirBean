import { create } from "zustand";

const useCartStore = create((set) => {
    cart: []
    addToCart: (product) => set((state) => ({ cart: [...state.cart, product] }))
})

export default useCartStore