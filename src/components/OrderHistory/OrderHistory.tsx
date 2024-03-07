import "./OrderHistory.scss"

const OrderHistory = () => {
    return (
        <div className="order">
            <div className="order__order-number-date">
                <p className="order__order-number-date__order-number-text">#AB1123282323</p>
                <p className="order__order-number-date__order-date-text">20/03/06</p>
            </div>
            <div className="order__total-sum">
                <p>total ordersumma</p>
                <p>443 kr</p>
            </div>
        </div>
    )
}

export default OrderHistory