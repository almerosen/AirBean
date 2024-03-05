import useCartStore from "../../store/cartStore"
import "./CartItem.scss"
import upArrow from "../../images/cart-images/Vector 2.svg"
import downArrow from "../../images/cart-images/Vector 3.svg"

export type CartItemProps = {
    id: string
    title: string
    price: number
    quantity: number
    increaseQuantity: (id: string) => void
}

const CartItem = ({id, title, price, quantity, increaseQuantity}: CartItemProps) => {

    const handleIncreaseQuantity = () => {
        {increaseQuantity(id)}
    }

    return (
        <div className="cartItem">
            <div className="cartItem__title">
                <h2>{title}</h2>
                <p>{price} kr</p>
            </div>
            <div className="cartItem__quantity">
                <button className="increase-button" onClick={handleIncreaseQuantity}>
                    <img src={upArrow} alt="increase-logo" />
                </button>
                <div className="quantity">
                    <p className="quantity__number">{quantity}</p>
                </div>
                <button className="decrease-button">
                    <img src={downArrow} alt="decrease-logo" />
                </button>
            </div>
        </div>
    )
}

export default CartItem