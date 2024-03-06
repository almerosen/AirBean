import { create } from "zustand";

const useOrderStore = create((set) => ({
    orderNumber: "",
    setOrderNumber: (orderNumber) => set({ orderNumber }),
}))

export default useOrderStore