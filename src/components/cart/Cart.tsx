import useCartStore from "../../store/cartStore"
import CartItem, { CartItemProps } from "../cartItem/CartItem"
import "./Cart.scss"
import polygon from "../../images/cart-images/caret-up-fill.svg"
import OrderButton from "../OrderButton/OrderButton"

const Cart = () => {
    const { cart, increaseQuantity , decreaseQuantity, getTotalPrice } = useCartStore()
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
                        text="Take my money!"
                    />
                </div>        
                
            </div>
        </div>
    )
}

export default Cart