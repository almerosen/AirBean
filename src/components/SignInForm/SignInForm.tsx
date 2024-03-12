import "./SignInForm.scss"
import logo from "../../images/profileOverlay-images/Group 6.svg"
import { useState } from "react"
import useAuthStore from "../../store/useAuthStore"
import "./SignInForm.scss"

const SignInForm = (props) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [gdpr, setGdpr] = useState(false)
    const { user, setUser } = useAuthStore()


    const loginUser = async () => {

        const userData = {
            username: username,
            password: email,
        }

        try {
            const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            })
            if (!response.ok) {
                throw new Error (`Failed to login - status ${response.status}`)
            } else {
                const loginResponse = await response.json()
                console.log("Login response:", loginResponse)

                if (loginResponse.success === false) {
                    alert(loginResponse.message)
                    throw new Error(loginResponse.message)
                } else {
                    setUser(userData)
                    sessionStorage.setItem("token", loginResponse.token)
                }
            }
        } catch (error) {
            console.error("Error during login: ", error)
            throw new Error("Failed to login due to an error");
        }
    }


    const handleLogin = async (event) => {
        event.preventDefault()

        const loginData = {
            username: username,
            password: email,
        }
        console.log("Login data:", loginData)

       loginUser()
    }


    return (
        <div className="overlay">
            <div className="header-container">
                <img src={logo} alt="" />
                <h1>Välkommen tillbaka!</h1>
                <p>Här kan du logga in för att spara och se din orderhistorik.</p>
            </div>

            <form onSubmit={handleLogin}>
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
                <p>Create a new account?</p>
                <button className="login-form-button" onClick={props.toggleSignIn}>Register</button>
            </div>
        </div>
    )
}

export default SignInForm