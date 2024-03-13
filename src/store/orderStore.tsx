import { create } from "zustand";
import { OrderDetails } from "../components/OrderButton/OrderButton";

type OrderStore = {
    orderNumber: string,
    eta: number,
    setOrderNumberEta: (data: {orderNr: string, eta: number}) => void
}

const useOrderStore = create<OrderStore>((set) => ({
    orderNumber: "",
    eta: 0,
    // setOrderDetails: (orderDetails: OrderDetails) => set({ orderDetails }),
    setOrderNumberEta: (data) => {
        set((state) => ({
            ...state, 
            orderNumber: data.orderNr,
            eta: data.eta
        }))
    }
}))

export default useOrderStore