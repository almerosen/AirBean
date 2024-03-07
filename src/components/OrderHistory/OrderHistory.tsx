import "./OrderHistory.scss"

const OrderHistory = () => {

    const getOrderHistory = async () => {
        const token = sessionStorage.getItem("token")

        try {
            const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/history", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            if (!response.ok) {
                throw new Error (`Failed fetch data with status ${response.status}`)
            } else {
                const orderHistoryData = await response.json()
                console.log(orderHistoryData)
            }
        } catch (error) {
            console.error(error)
        } 
    }
    getOrderHistory()

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