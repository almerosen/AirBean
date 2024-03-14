
import "./Products.scss"
import buttonLogo from "../../images/products-images/addToCartLogo.svg"
import useCartStore from "../../store/cartStore"
import { render } from "react-dom"
import { useState } from "react"
import { CartItem } from "../../store/cartStore"

export type ProductsProps = {
    id: string
    title: string
    desc: string
    price: number
    // quantity: number
    // handleClick: () => void
}




const Products = (props: ProductsProps) => {

    const [active, setActive] = useState(false)

    const { addToCart } = useCartStore()

    const addProductToCart = () => {
        const productToAdd: CartItem = {
            id: props.id,
            title: props.title,
            price: props.price,
            totalPrice: props.price,
            quantity: 0
        }
        addToCart(productToAdd)
    }

    //For the button active styling...
    const onTouchDown = () => {
        setActive(prevState => !prevState)
    }
    const onTouchUp = () => {
        setActive(prevState => !prevState)
    }


    const renderDots = () => {
        return "." .repeat(24)
    }


    return (
        <div className="product">
            <button 
                className={`product__add-to-cart-button ${active ? "active" : ""}`} 
                onClick={addProductToCart} 
                onTouchStart={onTouchDown}
                onTouchEnd={onTouchUp}
                >
                    <img src={buttonLogo} alt="button-logo" />
            </button>
            <div className="product__name">
                <div className="product__name__title-div">
                    <p>{renderDots()}</p>
                    <h2>{props.title}</h2>
                </div>
                <p>{props.desc}</p>
            </div>
            <div className="product__price">
                <h2>{props.price} kr</h2>
            </div>
        </div>
    )
}

export default Products