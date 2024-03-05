import useCartStore from "../../store/cartStore"
import "./CartItem.scss"

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
                <button className="increase-button" onClick={handleIncreaseQuantity}>+</button>
                <div className="quantity">{quantity}</div>
                <button className="decrease-button">-</button>
            </div>
        </div>
    )
}

export default CartItem