import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ProductsProps } from "../components/products/Products";

interface CartStore {
    cart: ProductsProps[]
    addToCart: (product: ProductsProps) => void
}


const useCartStore = create( //funkar om jag tar bort CartStore...???
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product: ProductsProps) => {
                const existingProduct: ProductsProps | undefined = get().cart.find((cartItem) => cartItem.id === product.id)
                if (existingProduct) {
                    if(existingProduct.quantity > 0) {
                        existingProduct.quantity++
                    }
                    set({ cart: [...get().cart] })
                } else {
                    set({ cart: [...get().cart, { ...product, quantity: 1}] })
                }
            },

            getTotalPrice: () => {
                return get().cart.reduce((total, product) => total + product.quantity * product.price, 0)
            },

            getQuantity: () => {
                return get().cart.reduce((totalQuantity, product) => totalQuantity + product.quantity, 0)
            },

            increaseQuantity: (id: number) => {
                set((state) => ({
                    cart: state.cart.map((item) => 
                        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                }))      
            }
        }),
        {
            name: "cart:",
            storage: createJSONStorage(() => sessionStorage)
        },
    ),
) 

export default useCartStore
