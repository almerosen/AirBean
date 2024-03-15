import useCartStore, { CartStore } from "../../store/cartStore"
import { CartItemProps } from "../cartItem/CartItemComponent"
import "./Cart.scss"
import polygon from "../../images/cart-images/caret-up-fill.svg"
import OrderButton from "../OrderButton/OrderButton"
import { CartItem } from "../../store/cartStore"
import CartItemComponent from "../cartItem/CartItemComponent"
import { useEffect } from "react"

const Cart = () => {
    const { cart, increaseQuantity , decreaseQuantity, getTotalPrice } = useCartStore()
    
    useEffect(() => {
        console.log(cart)
    })

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
                    {cart.map((product: CartItem) => (
                        <CartItemComponent
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            totalPrice={product.totalPrice}
                            quantity={product.quantity}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                        />
                    ))}
                </div>
                <div className="cart__order-sum">
                    <p className="cart__order-sum__text">Total</p>
                    <p className="cart__order-sum__text">{getTotalPrice()} kr</p>
                </div>
                <p className="cart__moms-text">inkl moms + drönarleverans</p>

                <div className="cart__order-button">
                    <OrderButton 
                        text={cart.length < 1 ? "Cart is empty" : "Take my money!"}
                    />
                </div>        
                
            </div>
        </div>
    )
}

export default Cart