
import "./Products.scss"
import buttonLogo from "../../images/products-images/addToCartLogo.svg"

export type ProductsProps = {
    id: string
    title: string
    desc: string
    price: number
}

const Products = (props: ProductsProps) => {
    return (
        <div className="product">
            <button className="product__add-to-cart-button">
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