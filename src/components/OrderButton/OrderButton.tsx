import { useState } from "react"
import "./OrderButton.scss"
import useCartStore from "../../store/cartStore"
import useOrderStore from "../../store/orderStore"
import { Navigate, useNavigate } from "react-router-dom"
import useAuthStore from "../../store/useAuthStore"

type OrderButton = {
    text: string
}

export type OrderDetails = {
    title: string
    price: number
    totalPrice: number
    quantity: number
}


const tokenVerification = async () => {
    const token = sessionStorage.getItem("token")
    try {
        const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/status", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        if (!response.ok) {
            throw new Error (`Failed fetch data with status ${response.status}`)
        } else {
        }   const data = await response.json()
        console.log("Token verification:", data)

    } catch (error) {
        console.error(error)
        }
}



const OrderButton = (props: OrderButton) => {
    const navigate = useNavigate()
    const { cart, clearCart } = useCartStore() 
    const { orderNumber,  } = useOrderStore()
    const { setOrderNumberEta } = useOrderStore()
    const { isLoggedIn } = useAuthStore()


    
    const sendOrder = async () => {
        try {

            // if(cart.length === 0 ) { Disabled the button instead...
            //     return
            // }
            if(isLoggedIn) {
                const token = sessionStorage.getItem("token")
                if (!token) {
                    alert("Sign in or create a new account to place an order")
                    return
                }
                if (token) {
                    await tokenVerification()
                }

                const orderDetails = {
                    details: {
                        order: cart.map((item: OrderDetails) => ({
                            name: item.title,
                            price: item.price, // (item.price * item.quantity) gives error...
                            quantity: item.quantity,
                            totalPrice: (item.price * item.quantity)
                        })),
                    },
                }
                console.log("Cart:", cart)
                console.log("Order details:", orderDetails)

                const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(orderDetails)
                })
                if (!response.ok) {
                    throw new Error (`Failed fetch data with status ${response.status}`)
                } else {
                    const data = await response.json()
                    console.log("data response:", data)

                    setOrderNumberEta(data)

                    // useOrderStore.setState((state) => ({
                    //     ...state,
                    //     orderNumber: data.orderNr,
                    //     eta: data.eta
                    // }))

                }


            // When not signed in...
            } else {
                const orderDetails = {
                    details: {
                        order: cart.map((item: OrderDetails) => ({
                            name: item.title,
                            price: item.price, // (item.price * item.quantity) gives error...
                            quantity: item.quantity,
                            totalPrice: (item.price * item.quantity)
                        })),
                    },
                }
                const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderDetails)
                })
                if (!response.ok) {
                    throw new Error (`Failed fetch data - status ${response.status}`)
                } else {
                    const data = await response.json()
                    setOrderNumberEta(data)
                }
            }
            

        } catch (error) {
            console.error(error)
        }

        clearCart()

        navigate("/orderstatus")
    }



    return (
        <button 
            className={`order-button ${cart.length === 0 ? "disabled" : ""}`}
            onClick={sendOrder}
            disabled={cart.length === 0}
        >
            {props.text}
        </button>
    )
}


export default OrderButton