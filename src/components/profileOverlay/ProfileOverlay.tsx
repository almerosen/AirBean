import "./ProfileOverlay.scss"
import logo from "../../images/profileOverlay-images/Group 6.svg"
import { useState } from "react"
import useAuthStore from "../../store/useAuthStore"
import SignInForm from "../SignInForm/SignInForm"

const ProfileOverlay = (props) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [gdpr, setGdpr] = useState(false)
    const [signIn, setSignIn] = useState(false)
    const { setUser } = useAuthStore()

    const toggleSignIn = () => {
        setSignIn(prevState => !prevState)
        console.log(signIn)
    }
    // const [formData, setFormData] = useState({
    //     name: "",
    //     epost: "",
    //     gdpr: false,
    // })

    // const handleChange = (event) => {
    //     const { name, value, type, checked } = event.target
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: type === "checkbox" ? checked : value
    //     }))
    // }


    const signUp = async () => {

        // Some basic validation...
        if(!username || !email) {
            alert("Please fill in username and email")
            return
        }
        // validate email 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)) {
            alert("Please enter a valid email")
            return
        }

        const userData = {
            username: username,
            password: email,
        }
        console.log("Sign up data:", userData)

        try {
            const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            })
            console.log(response)

            if (!response.ok) {
                throw new Error (`Failed fetch data - status ${response.status}`)
            } else {
                const data = await response.json()
                console.log("Sign up response:", data)

                // Loggar in direkt efter registrering:
                const responseLogin = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData)
                })
                
                if(!responseLogin.ok) {
                    throw new Error (`Failed fetch data with status ${responseLogin.status}`)
                    } else {
                        const responseData = await responseLogin.json()
                        console.log("Login response:", responseData)

                        if(responseData.success === false) {
                            alert(`${responseData.message}`)
                        } else {
                            sessionStorage.setItem("token", responseData.token)
                            setUser(userData)
                        }    
                    }             
            }
        } catch (error) {
            console.error (error)
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        signUp()
    }


    return (
        <div>
            {signIn ? (
                <SignInForm 
                    toggleSignIn={toggleSignIn} 
                />
                ) : (
                    <div className="overlay">
                        <div className="header-container">
                            <img src={logo} alt="" />
                            <h1>Välkommen till AirBean-familjen!</h1>
                            <p>Genom att skapa ett konto nedan kan du spara och se din orderhistorik.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="">Name</label>
                            <input 
                                type="text"
                                name="name"
                                className="inputfield"
                                placeholder="name"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <label htmlFor="">Epost</label>
                            <input 
                                type="text"
                                name="epost"
                                className="inputfield"
                                placeholder="sixten.kaffelover@zocom.se"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <div className="radio-button-container">
                                <input 
                                    type="radio"
                                    name="gdpr"
                                    className="radio-button"
                                    onChange={(event) => setGdpr(event.target.checked)}

                                />
                                <label htmlFor="">GDPR Ok!</label>
                            </div>
                
                            <div className="overlay__button-container">
                                <button className="overlay__button">Brew me a cup!
                                </button>
                            </div>
                        </form>
                        <div className="login-register-container">
                            <p>Already a registrered user?</p>
                            <button className="login-form-button" onClick={toggleSignIn}>Login</button>
                        </div>
                    </div>
                )
            }        
        </div>)
}

export default ProfileOverlay