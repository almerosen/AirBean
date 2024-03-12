import { create } from "zustand";
import { OrderDetails } from "../components/OrderButton/OrderButton";

type OrderStore = {
    orderNumber: string,
    eta: number
}

const useOrderStore = create<OrderStore>((set) => ({
    orderNumber: "",
    eta: 0,
    setOrderDetails: (orderDetails: OrderDetails) => set({ orderDetails }),
    // setOrderDetails: (newOrderNumber: string, newEta: number) => {
    //     set((state) => ({
    //         ...state, 
    //         orderNumber: newOrderNumber,
    //         eta: newEta
    //     }))
    // }
}))

export default useOrderStore