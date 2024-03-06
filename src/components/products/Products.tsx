
import "./Products.scss"
import buttonLogo from "../../images/products-images/addToCartLogo.svg"
import useCartStore from "../../store/cartStore"

export type ProductsProps = {
    id: string
    title: string
    desc: string
    price: number
    // quantity: number
    // handleClick: () => void
}




const Products = (props: ProductsProps) => {

    const { addToCart } = useCartStore()

    const addProductToCart = () => {
        addToCart({
            id: props.id,
            title: props.title,
            // desc: props.desc,
            price: props.price,
            quantity: 0
        })
    }


    return (
        <div className="product">
            <button className="product__add-to-cart-button" onClick={addProductToCart}>
                <img src={buttonLogo} alt="button-logo" />
            </button>
            <div className="product__name">
                <h2>{props.title}</h2>
                <p>{props.desc}</p>
            </div>
            <div className="product__price">
                <h2>{props.price} kr</h2>
            </div>
        </div>
    )
}

export default Products