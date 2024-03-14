import "./ProfileOverlay.scss"
import logo from "../../images/profileOverlay-images/Group 6.svg"
import { useState } from "react"
import useAuthStore from "../../store/useAuthStore"
import SignInForm from "../SignInForm/SignInForm"

const ProfileOverlay = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [gdpr, setGdpr] = useState(false)
    const [signIn, setSignIn] = useState(false)
    const { login } = useAuthStore()

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
        // if(!username || !email || !password) {
        //     alert("Please fill in all the fields")
        //     return
        // } Disabled the button instead...
        // validate email 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)) {
            alert("Please enter a valid email")
            return
        }

        const registerData = {
            username: username,
            email: email,
        }

        const userData = {
            username: username,
            password: password,
        }
        console.log("Sign up data:", userData)
        console.log("register data", registerData)

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
                            login(registerData) //sets username and email to global state in zustand
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
                            <label htmlFor="">Namn</label>
                            <input 
                                type="text"
                                name="name"
                                className="inputfield"
                                placeholder="namn"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <label htmlFor="">Lösenord</label>
                            <input 
                                type="text" //password
                                name="password"
                                className="inputfield"
                                placeholder="lösenord"
                                onChange={(event) => setPassword(event.target.value)}
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
                                <button className={`overlay__button ${!username || !password || !email ? "disabled": ""}`}>
                                    Brew me a cup!
                                </button>
                            </div>
                        </form>
                        <div className="login-register-container">
                            <p>Har du redan ett konto?</p>
                            <button className="login-form-button" onClick={toggleSignIn}>Logga in</button>
                        </div>
                    </div>
                )
            }        
        </div>)
}

export default ProfileOverlay