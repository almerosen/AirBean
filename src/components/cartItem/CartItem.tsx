import "./CartItem.scss"
import upArrow from "../../images/cart-images/Vector 2.svg"
import downArrow from "../../images/cart-images/Vector 3.svg"

export type CartItemProps = {
    id: string
    title: string
    price: number
    quantity: number
    increaseQuantity: (id: string) => void
    decreaseQuantity: (id: string) => void
}

const CartItem = ({id, title, price, quantity, increaseQuantity, decreaseQuantity}: CartItemProps) => {

    
    const handleDecreaseQuantity = () => {
        decreaseQuantity(id)
    }

    const handleIncreaseQuantity = () => {
        {increaseQuantity(id)}
    }

    const renderDots = () => {
        return "." .repeat(30)
    }

    return (
        <div className="cartItem">
            <div className="cartItem__title">
                <div className="cartItem__title-div">
                    <p>{renderDots()}</p>
                    <h2>{title}</h2>
                </div>
                <p>{price} kr</p>
            </div>
            <div className="cartItem__quantity">
                <button className="increase-button" onClick={handleIncreaseQuantity}>
                    <img src={upArrow} alt="increase-logo" />
                </button>
                <div className="quantity">
                    <p className="quantity__number">{quantity}</p>
                </div>
                <button className="decrease-button" onClick={handleDecreaseQuantity}>
                    <img src={downArrow} alt="decrease-logo" />
                </button>
            </div>
        </div>
    )
}

export default CartItem