import { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import Products from "../../components/products/Products"
import { ProductsProps } from "../../components/products/Products"
import Footer from "../../components/Footer/Footer"
import "./Menu.scss"


const Menu = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // const {addToCart} = useCartStore()
    
 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/beans")
                if (!response.ok) {
                    throw new Error (`Failed fetch data with status ${response.status}`)
                } else {
                    const data = await response.json()
                    console.log(data)
                    setProducts(data.menu)
                    setIsLoading(false)
                }
            } catch(error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])


    return (
        <>
            <div className="menu-wrapper">
                <Header />
                <h1 style={{marginBottom: "2rem"}}>Meny</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : ( 
                    <div className="products-wrapper">
                    {products.map((product: ProductsProps) => (
                        <Products 
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            desc={product.desc}
                            price={product.price}
                            // handleClick={() => addToCart(product)}
                        />
                    ))}
                </div>
                )}              
                <Footer />
            </div>            
        </>
    )
}

export default Menu