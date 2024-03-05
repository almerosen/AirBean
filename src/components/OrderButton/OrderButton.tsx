import "./OrderButton.scss"

const OrderButton = (props) => {
    return (
        <button className="order-button">{props.text}</button>
    )
}

export default OrderButton