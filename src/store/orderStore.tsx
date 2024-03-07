import { create } from "zustand";



const useOrderStore = create((set) => ({
    orderNumber: "",
    eta: 0,
    setOrderDetails: (orderDetails) => set({ orderDetails }),
}))

export default useOrderStore