import { useState } from "react"
import useCartStore from "../../store/cartStore"
import CartItem, { CartItemProps } from "../cartItem/CartItem"
import "./Cart.scss"
import polygon from "../../images/cart-images/caret-up-fill.svg"

const Cart = () => {
    const { cart, increaseQuantity ,getTotalPrice } = useCartStore()
    console.log(cart)

    // const [total, setTotal] = useState(0)
    // const totalSum = cart.map((item) => )


    return (
        <div className="cart">
            {/* <div className="cart-icon">
                <img src={bag} alt="" className="bag-icon"/>
                <div className="quantity-logo">7</div>
            </div> */}
            <div className="cart__order">
                <img src={polygon} alt="" className="polygon"/>
                <h1>Din beställning</h1>
                <div className="cart__products">
                    {cart.map((product: CartItemProps) => (
                        <CartItem 
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            quantity={product.quantity}
                            increaseQuantity={increaseQuantity}
                        />
                    ))}
                </div>
                <div className="cart__order-sum">
                    <div>Total</div>
                    <div>{getTotalPrice()} kr</div>
                </div>
                <p>inkl moms + drönarleverans</p>
            </div>
        </div>
    )
}

export default Cart